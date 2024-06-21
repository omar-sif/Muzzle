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
            let index = 0;
            const interval = setInterval(()=>{

                if(index < moves.length){
                    
                    setMove(moves[index]);
                    index++;

                }
                else{
                    clearInterval(interval);
                }

            }, 1500);

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