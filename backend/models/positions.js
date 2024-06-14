import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
    fen: {
        type: String,
        required: true
    },
    nPieces: {
        type: Number,
        required: false
    },
})


const Position = mongoose.model('Fen', positionSchema);

export default Position;