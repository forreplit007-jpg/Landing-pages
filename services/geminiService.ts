import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "Clove", the friendly virtual receptionist for Rainbow Clove Dental Clinic. 
Your goal is to be warm, comforting, and helpful. 
The clinic's philosophy is making dental care "comfortable and pain-free".
We are located at 123 Anywhere St., Any City, ST 12345.
Our phone number is (123) 456-7890.
We offer: Teeth Cleaning, Whitening, General Checkups, Root Canals (pain-free!), and Orthodontics.
Opening hours: Mon-Fri 9am-6pm, Sat 10am-2pm.

If a user wants to book an appointment, ask for their name, preferred date and time, and any specific concerns (like sensitivity or pain), then tell them a staff member will call to confirm.
Keep responses concise (under 50 words) and conversational.
`;

let client: GoogleGenAI | null = null;

export const getGeminiClient = () => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const streamChatResponse = async (
  history: { role: 'user' | 'model'; text: string }[],
  userMessage: string,
  onChunk: (text: string) => void
) => {
  try {
    const ai = getGeminiClient();
    
    // Best practice with this SDK: Create a chat session.
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const resultStream = await chat.sendMessageStream({ message: userMessage });

    for await (const chunk of resultStream) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

export const generateBookingConfirmation = async (
  name: string,
  service: string,
  date: string,
  time: string,
  concerns: string
) => {
  try {
    const ai = getGeminiClient();
    const prompt = `
      You are the receptionist at Rainbow Clove Dental.
      A patient named ${name} has just requested to book a ${service} on ${date} at ${time}.
      They mentioned these concerns: "${concerns || 'None'}".
      Write a short, warm, comforting confirmation message (max 30 words).
      If they mentioned concerns (like pain or anxiety), briefly reassure them.
      Do not mention calling them, just confirm the request is received.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Confirmation Generation Error:", error);
    return "Thank you! Your appointment request has been received.";
  }
};