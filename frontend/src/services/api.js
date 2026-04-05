import axios from 'axios'
export const fetchBotResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      'https://aichatbot-backend-mtez.onrender.com/api/chat/message',
      { message: userMessage }
    );
    return response.data.reply;
  } catch (error) {
    console.error("FULL ERROR:", error);

    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }

    return "Error connecting to server";
  }
};