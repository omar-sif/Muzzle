import getPositions from '../controllers/memo.js';
import express from 'express';
const router = express.Router();

router.get('/', getPositions);

export default router;