


function Piece({piece, id}){


    return (
        <div className="piece" id={id} style={{margin:'auto'}}>{piece}</div>
    )
};

export default function SparePieces({handleClick}){

    const pieces = {'wp' :"♙", 'wN' :"♘", 'wB' :"♗", 'wR' :"♖", 'wQ' :"♕", 'wK' :"♔",
                   'bp' :"♟", 'bN' :"♞", 'bB' :"♝", 'bR' :"♜", 'bQ' :"♛", 'bK' :"♚"}
    return(
        <div onClick={handleClick} className="spare-pieces" style={{display:"flex", flexDirection:'row', width:'100%'}}>
            {Object.keys(pieces).map((piece, index)=> <Piece key={index} id={piece} piece={pieces[piece]}/>)}
        </div>
    )

};