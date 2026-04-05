import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Route Imports (You'll create this file next)
import chatRoutes from './routes/chatRoutes.js'; 

// 2. Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Routes
app.use('/api/chat', chatRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.send('AI Chatbot Server is running...');
});

// 5. Start Server
app.listen(PORT, () => {
  console.log(` Server running in ESM mode at http://localhost:${PORT}`);
});