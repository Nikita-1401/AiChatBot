import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

// Initialize the SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIResponse = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Empty message" });
    }

    // Use your specific model
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // Generate content
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text(); 

    // Return the response in the 'reply' field
    res.status(200).json({ reply: text });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Model failed to respond. Check API quota/key." });
  }
};