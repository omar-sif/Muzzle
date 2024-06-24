import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import memoRoutes from './routes/memo.js';
import lineRoutes from './routes/viz.js';

mongoose.Promise = global.Promise;
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/Muzzle');
        console.log('Connected to Database successfully!!');
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
    }
};
connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
app.use('/', memoRoutes);
app.use('/', lineRoutes);



