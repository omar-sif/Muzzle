
import {Chessground} from 'chessground'
import { useEffect, useRef, useState } from 'react';
import SparePieces from './SparePieces';
import './assets/chessground.base.css'
import './assets/chessground.brown.css'
import './assets/chessground.cburnett.css'

export default function Game() {

    const boardRef = useRef(null);
    const [board, setBoard] = useState(null);
    const [fen , setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    const draggedPiece = useRef(null);

    const role = {'k':'king', 'q':'queen', 'r':'rook', 'b':'bishop', 'n':'knight', 'p':'pawn'}
    const color = ['white', 'black'];

    Array.prototype.shuffle = function() {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
        return this;
    };
    
    const handleClick = (e)=>{
        if(board){
            const piece = e.target.id;
            const cgPiece = {role: role[piece.toLowerCase().split("")[1]], color: color[piece[0]==='w'?0:1]};
            board.dragNewPiece(cgPiece, e, true);
            draggedPiece.current = cgPiece;
        }
        else{
            console.log('board not ready')
        }
    }

    const handleDrop = (e)=>{

        if(board){
            const square = board.getKeyAtDomPos([e.clientX, e.clientY]);
            board.setPieces(new Map([...board.state.pieces, [square, draggedPiece.current]]));
        }

        }

    const shuffleBoard = ()=>{
        const pieces = board.state.pieces;
        let pieceMap = new Map();
        const squares = [... pieces.keys()].shuffle().slice(0,5);
        
        squares.forEach((square)=>{
            board.state.pieces.delete(square);
        })
        board.setPieces(pieceMap);
    
        // setFen(board.getfen())
    }

    const validateBoard= ()=>{
        const answer = board.getFen();
        if (answer === fen){
            console.log('Correct')
        }
        else{
            console.log('incorrect');
        }
    }

    useEffect(()=>{
        const config = {
            fen:fen,
            animation:{
                enabled: true,
                duration: 200
            },
            
        };
        const board = Chessground(boardRef.current, config);
        setBoard(board);

        return ()=> board.destroy()
    }, [])

    return (
        <div className='game-container' style={{width:'400px', height:'400px'}}>
            <SparePieces handleClick={handleClick}/>
            <div style={{width:'80%', height:'80%'}} ref={boardRef} onClick={handleDrop} />
            <button onClick={(e)=>{board.set({fen: 'start'})}} style={{backgroundColor:'gray'}} >Reset</button>
            <button onClick={shuffleBoard} style={{backgroundColor:'gray'}} >Shuffle</button>
            <button onClick={validateBoard} >Validate</button>
        </div>
    )


}