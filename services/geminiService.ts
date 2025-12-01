import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not set in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateInsight = async (prompt: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "AI Service Unavailable (Missing Key)";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful CRM assistant. Keep answers concise, professional, and actionable. Focus on sales insights.",
      }
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate insight.";
  }
};

export const generateEmailDraft = async (leadName: string, context: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "AI Service Unavailable";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Draft a professional, short sales follow-up email for ${leadName}. Context: ${context}`,
    });
    return response.text || "No draft generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to draft email.";
  }
};
