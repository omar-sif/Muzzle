

function Piece({ id}){


    return (
        <div className="piece" id={id} style={{margin:'auto'}}> </div>
    )
};

export default function SparePieces({handleClick, color}){

    const whitePieces = {'wp' :"♙", 'wn' :"♘", 'wb' :"♗", 'wr' :"♖", 'wq' :"♕", 'wk' :"♔"};
    const blackPieces = {'bp' :"♟", 'bn' :"♞", 'bb' :"♝", 'br' :"♜", 'bq' :"♛", 'bk' :"♚"};
    const pieces = color === 'white'? whitePieces : blackPieces;
                   
    return(
        <div onClick={handleClick} className="spare-pieces" style={{display:"flex", flexDirection:'row', width:'100%'}}>
            {Object.keys(pieces).map((piece, index)=> <Piece key={index} id={piece} />)}
        </div>
        
    )

};