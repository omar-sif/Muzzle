
import {Chessground} from 'chessground'
import { useEffect, useRef, useState } from 'react';
import SparePieces from './SparePieces';
import './assets/chessground.base.css'
import './assets/chessground.brown.css'
import './assets/chessground.cburnett.css'

export default function Game() {

    const boardRef = useRef(null);
    const [board, setBoard] = useState(null);

    const role = {'k':'king', 'q':'queen', 'r':'rook', 'b':'bishop', 'n':'knight', 'p':'pawn'}
    const color = ['white', 'black'];
    const handleClick = (e)=>{
        if(board){
            const piece = e.target.id;
            const cgPiece = {role: role[piece.toLowerCase().split("")[1]], color: color[piece[0]==='w'?0:1]};
            board.dragNewPiece(cgPiece, e);
            console.log('piece clicked', cgPiece)
        }
        else{
            console.log('board not ready')
        }
    }

    useEffect(()=>{
        const config = {
            trustAllEvents: true,
            events:{
            dropNewPiece: (piece, key)=> console.log('dropped', piece, key),
        }}
        const board = Chessground(boardRef.current, config);
        setBoard(board);

        return ()=> board.destroy()
    }, [])

    return (
        <div className='game-container' style={{width:'400px', height:'400px'}}>
            <SparePieces handleClick={handleClick}/>
            <div style={{width:'80%', height:'80%'}}ref={boardRef}/>
        </div>
    )


}