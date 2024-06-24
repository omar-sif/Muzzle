import Position from "../models/positions.js";


const getPositions = async (req, res) => {
    try {
        const position = await Position.aggregate([{ $sample: { size: 1 } }]);
        res.status(200).json(position);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default getPositions;