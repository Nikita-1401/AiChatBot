import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const FALLBACK_RESPONSE = "I'm sorry, I am specifically trained to assist with Ars Kreedashala sports services. I cannot answer queries unrelated to our academy or products.";

export const getAIResponse = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Empty message" });
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // --- STEP 1: SEMANTIC GUARDRAIL ---
    // Instead of simple keywords, we ask the AI to categorize the intent.
    const guardrailPrompt = `
      Task: Determine if the following user query is related to Ars Kreedashala (a sports academy/infrastructure company).
      Allowed topics: Sports coaching, academy registration, sports infrastructure, Ranchi sports, athletic training, Ars Kreedashala services.
      Forbidden topics: Politics, General Knowledge, Math, Science, Other companies, Celebrities.

      Query: "${message}"

      If the query is related to Ars Kreedashala or sports training, respond with "ALLOWED".
      Otherwise, respond with "BLOCKED".
      Response (One word only):`;

    const guardResult = await model.generateContent(guardrailPrompt);
    const decision = guardResult.response.text().trim().toUpperCase();

    if (decision.includes("BLOCKED")) {
      return res.status(200).json({ reply: FALLBACK_RESPONSE });
    }

    // --- STEP 2: GENERATE RESPONSE ---
    const strictPrompt = `
      System: You are the Ars Kreedashala AI. You are a strict corporate assistant.
      Context: Ars Kreedashala is a sports academy in Ranchi providing infrastructure and coaching.
      
      Instructions:
      1. Answer the user's question ONLY using the context of sports and Ars Kreedashala.
      2. If you find yourself answering something unrelated to sports or the company, stop and use the fallback.
      3. Use a professional, sports-oriented tone.

      User Question: ${message}
      Answer:`;

    const result = await model.generateContent(strictPrompt);
    const response = await result.response;
    let text = response.text().trim();
  
    const checkOffTopic = ["president", "prime minister", "capital", "math", "history"].some(word => 
      text.toLowerCase().includes(word)
    );

    if (checkOffTopic) {
      return res.status(200).json({ reply: FALLBACK_RESPONSE });
    }

    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error("❌ BACKEND ERROR:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};