import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const FALLBACK_RESPONSE = "I'm sorry, I am specifically trained to assist with Ars Kreedashala sports services. I cannot answer queries unrelated to our academy or products.";
const MODEL_FALLBACKS = ["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-1.5-flash"];
let cachedModelName = null;

const fetchSupportedModelNames = async () => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
  );
  if (!response.ok) {
    throw new Error(`List models failed with status ${response.status}`);
  }

  const data = await response.json();
  const models = data?.models || [];

  return models
    .filter((model) => Array.isArray(model?.supportedGenerationMethods) && model.supportedGenerationMethods.includes("generateContent"))
    .map((model) => (model.name || "").replace(/^models\//, ""))
    .filter(Boolean);
};

const generateWithAvailableModel = async (prompt) => {
  let lastError;
  const discoveredModels = await fetchSupportedModelNames();
  const prioritizedModels = [
    ...(cachedModelName ? [cachedModelName] : []),
    ...MODEL_FALLBACKS,
    ...discoveredModels,
  ];
  const uniqueModels = [...new Set(prioritizedModels)];

  for (const modelName of uniqueModels) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      cachedModelName = modelName;
      return result;
    } catch (error) {
      lastError = error;
      console.warn(`Model ${modelName} failed:`, error?.message || error);
    }
  }

  throw lastError || new Error("No available Gemini model could generate content.");
};

export const getAIResponse = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) return res.status(400).json({ error: "Empty message" });
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY in environment." });
    }

    const strictPrompt = `
      You are the official AI of Ars Kreedashala.
      
      RULES:
      1. Only answer questions about Ars Kreedashala sports academy, coaching, products, and infrastructure.
      2. For off-topic questions (politics, general knowledge, etc.), say ONLY: "${FALLBACK_RESPONSE}"
      3. DO NOT use any Markdown, bolding, or asterisks (*). Provide raw text only.

      User Question: ${message}
      Answer:
    `;

    const result = await generateWithAvailableModel(strictPrompt);
    const text = result.response.text();

    // Enforce plain text output even if the model adds markdown.
    const cleanText = text
      .replace(/\*/g, "")
      .replace(/[`#_~]/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();

    return res.status(200).json({ reply: cleanText });

  } catch (error) {
    // Check your TERMINAL for this output
    console.error("❌ CRASH DETECTED:", error.message);

    return res.status(500).json({
      reply: "I am having trouble connecting to the AI engine. Please ensure the API key is valid." 
    });
  }
};