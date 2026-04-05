// frontend/src/services/api.js
import axios from 'axios';

export const fetchBotResponse = async (userMessage) => {
  const response = await axios.post('https://aichatbot-backend-mtez.onrender.com/api/chat/message', { message: userMessage });
  return response.data.reply;
};