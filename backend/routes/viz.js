import getLines from "../controllers/viz.js";
import express from 'express';

const router = express.Router();

router.get('/viz', getLines);

export default router;