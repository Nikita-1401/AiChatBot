import axios from 'axios';

const DEFAULT_API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');
const CHAT_ENDPOINT = `${API_BASE_URL}/api/chat/message`;

const sanitizeReply = (text) => {
  if (typeof text !== 'string') return '';
  return text
    .replace(/\*/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
};

export const fetchBotResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      CHAT_ENDPOINT,
      { message: userMessage },
      { timeout: 20000 }
    );

    const reply = sanitizeReply(response?.data?.reply);
    if (!reply) {
      return 'I could not generate a response right now. Please try again.';
    }
    return reply;
  } catch (error) {
    console.error('FULL ERROR:', error);

    if (error.response) {
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }

    return 'Error connecting to server';
  }
};