import mongoose from "mongoose";

const lineSchema = new mongoose.Schema({

    fen: {
        type: String,
        required: true
    },
    line: {
        type: String,
        required: true
    },
}

);

const Line = mongoose.model('Line', lineSchema);

export default Line;