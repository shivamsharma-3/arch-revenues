const { GoogleGenAI } = require('@google/genai');

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("No GEMINI_API_KEY found");
    return;
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  
  for (const model of models) {
    console.log(`\nTesting model: ${model}`);
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: "Say hello world",
      });
      console.log(`SUCCESS [${model}]:`, response.text);
    } catch (e) {
      console.error(`ERROR [${model}]:`, e.message);
    }
  }
}

test();
