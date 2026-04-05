// backend/routes/chatRoutes.js
import express from 'express';
import { getAIResponse } from '../controller/chatController.js';

const router = express.Router();

router.post('/message', getAIResponse);

export default router;