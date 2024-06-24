import {Chessground} from 'chessground';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios'



export default function Viz(){

    const boardRef = useRef(null);
    const [started, setStarted] = useState(false);
    const [fen, setFen] = useState('rnbkqbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBKQBNR');
    const [move , setMove]= useState('');
    const [begin, setBegin] = useState(false);
    const linesQueue = useRef([]);
    const cgBoard = useRef(null);
    const line = useRef(null);
    const pieceToLetter = {'pawn': 'p', 'knight': 'n', 'bishop': 'b', 'rook': 'r', 'queen': 'q', 'king': 'k'}



    const fetchLines = async()=>{

        try{
            const res = await axios.get('http://localhost:3000/viz');
            return res.data;
        }

        catch(err){
            console.log(err);
        }

    }


    const onStart = async ()=>{
        setStarted(true);
        setBegin(false);
        if (linesQueue.current.length === 0 ){

            const newBatch = await fetchLines();
            console.log(newBatch)
            linesQueue.current.push(...newBatch);

            }
            const currentLine = linesQueue.current.shift();
            line.current = currentLine.line[0];
            setFen(currentLine.fen);
            
    }
    
    useEffect  (()=>{

        if(begin && line.current){
            const moves = line.current.split(' ');
            /*
            // when pieces are moved, they are no longer in their original position, and consequently not found in 
            board.state.pieces, here we keep track of the new positions of the moved pieces
            */
            let newPiecePositions = {}; //like {'e2':{role : 'pawn', color: 'white'}}
            let index = 0;
            console.log(cgBoard.current.getFen())
            console.log(line.current)
            const interval = setInterval(()=>{

                if(index < moves.length){
                    
                    
                    const orig = moves[index].slice(0,2);
                    const dest = moves[index].slice(2,4);
                    const pieceObject = newPiecePositions[orig] || cgBoard.current.state.pieces.get(orig);
                    console.log(pieceObject)
                    newPiecePositions[orig] = '';
                    newPiecePositions[dest] = pieceObject;
                    const piece = pieceObject.color === 'white' ? pieceToLetter[pieceObject.role].toUpperCase() : pieceToLetter[pieceObject.role];
                    setMove(piece + dest);
                    index++;

                }
                else{
                    clearInterval(interval);
                }

            }, 3000);

            return ()=> {
                clearInterval(interval);
                setMove('')
            };
        }

    },[begin])

   
        
    


    useEffect( ()=>{

        const config = { fen : fen}
        const board = Chessground(boardRef.current, config);
        cgBoard.current = board;
        
        return ()=> board.destroy()


    }, [fen])

    return (
        <div className='game-container'>
            <div className='board-container' ref={boardRef} />
            { !started && <button className='absolute top-1/2 left-1/2 translate-x-1/2 translatey-1/2 z-10 text-lg ' onClick={onStart} >Start</button>}
            { line.current && <div className='absolute top-1/2 left-1/2 translate-x-1/2 translatey-1/2 z-10' > {move} </div>}
            <button onClick = {onStart} className='bg-slate-400' > Correct </button>
            <button onClick={()=>{setBegin(true)}} className='bg-slate-400' > Begin </button>
        </div>

    )


}