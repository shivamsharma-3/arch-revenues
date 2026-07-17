const { GoogleGenAI } = require('@google/genai');

async function test() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("No GEMINI_API_KEY found");
    return;
  }
  
  const ai = new GoogleGenAI({ apiKey });
  const chat = ai.chats.create({
    model: "gemini-3.5-flash", // Using the one in the codebase to see if it errors
    config: {
      temperature: 0.4,
      maxOutputTokens: 500,
      systemInstruction: "You are a helpful assistant. Be brief.",
    }
  });

  try {
    const response = await chat.sendMessageStream({ message: "What is your pricing?" });
    let full = "";
    for await (const chunk of response) {
      console.log("CHUNK:", chunk.text);
      full += chunk.text;
    }
    console.log("DONE:", full);
  } catch (e) {
    console.error("STREAM ERROR:", e);
  }
}

test();
