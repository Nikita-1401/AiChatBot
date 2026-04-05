// frontend/src/services/api.js
import axios from 'axios';

export const fetchBotResponse = async (userMessage) => {
  const response = await axios.post('http://localhost:5000/api/chat/message', { message: userMessage });
  return response.data.reply;
};