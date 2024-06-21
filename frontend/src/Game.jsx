
import {Chessground} from 'chessground'
import { useEffect, useRef, useState } from 'react';
import SparePieces from './SparePieces';
import './assets/chessground.base.css'
import './assets/chessground.brown.css'
import './assets/chessground.cburnett.css'
import './App.css';
import axios from 'axios';

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
            board.stop();
            const piece = e.target.id;
            const cursorImage = e.target.style.backgroundImage;
            console.log(cursorImage)
            const cgPiece = {role: role[piece.toLowerCase().split("")[1]], color: color[piece[0]==='w'?0:1]};
            board.dragNewPiece(cgPiece, e, true);
            draggedPiece.current = cgPiece;
            document.body.style.cursor = cursorImage;
            document.querySelector('cg-board').style.cursor = cursorImage; // Change cursor to pointer for the chessboard

        }
        else{
            console.log('board not ready')
        }
    }

    const handleDrop = (e)=>{

        if(board && draggedPiece.current!== null){
            const square = board.getKeyAtDomPos([e.clientX, e.clientY]);
            board.setPieces(new Map([...board.state.pieces, [square, draggedPiece.current]]));
            board.dragNewPiece(draggedPiece.current, e ,true)
        }

        }

    // Shuffles the board by removing random pieces
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

    // Validates the answer, new fen is fetched after every validation
    const validateBoard= ()=>{
        const answer = board.getFen();
        
        if (answer === fen){
            console.log('Correct')
            
        }
        else{
            console.log('incorrect');
        }
        fetchFen();
    }

    // Fetches a new fen from the backend
    const fetchFen = async ()=>{
        try{
            const response = await axios.get('http://localhost:3000/');
            const newFen = await response.data[0].fen;
            console.log(newFen) 
            setFen(newFen);
        }catch(err){
            console.log(err)
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
    }, [fen])

    return (
        <div className='game-container' >
            <div className='spare-pieces-container top'>
            <SparePieces handleClick={handleClick} color={'white'}/>
            </div>
            <div className='board-container' ref={boardRef} onClick={handleDrop} />
            <div className='spare-pieces-container bottom'>
            <SparePieces handleClick={handleClick} color={'black'} />
            </div>
            <div className='buttons-container'>
                <button onClick={()=>{board.set({fen: 'start'})}}  >Reset</button>
                <button onClick={shuffleBoard}  >Shuffle</button>
                <button onClick={validateBoard} >Validate</button>
            </div>
        </div>
    )


}
