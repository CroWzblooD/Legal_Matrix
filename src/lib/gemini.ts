import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API////
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export const getLegalSuggestions = async (query: string) => {
  if (!query) return { suggestions: [] };

  try {
    // Use gemini-1.0-pro instead of gemini-pro
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    
    const prompt = `As an Indian legal assistant, suggest relevant legal cases for the search query: "${query}". 
    Format the response as JSON with exactly 5 suggestions:
    {
      "suggestions": [
        {
          "title": "Case name",
          "year": "Year",
          "court": "Court names",
          "brief": "One line description"
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      return JSON.parse(text);
    } catch {
      return { suggestions: [] };
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    return { suggestions: [] };
  }
}; 