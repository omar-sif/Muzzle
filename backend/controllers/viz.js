import Line from "../models/lines.js";


const getLines = async (req, res) => {

    try {
        const line = await Line.aggregate([
            { $sample: { size: 20 } },
        ])
        res.status(200).json(line);
    } catch (err) {
        res.status(404).json({ message: error.message });
    }

}

export default getLines;

