import { GoogleGenerativeAI } from "@google/generative-ai";

// 🚀 API Key de Gemini ya integrada
const API_KEY = "AIzaSyD4mJ10-0gg0z8p9YkiVm_yzjLksnVPiv4"; 

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("⚽ Dime qué quieres que te responda como Isagi Yoichi.");

  try {
    const prompt = `Responde como Isagi Yoichi de Blue Lock.
    Sé estratégico, intenso, piensa en el 'egoísmo' del campo y habla como un futbolista obsesionado con anotar goles.
    Usuario: ${text}`;

    const result = await model.generateContent(prompt);
    const reply = result.response.candidates[0]?.content?.parts[0]?.text || "No pude pensar la jugada...";

    await m.reply(`⚽ *Isagi Yoichi*: ${reply}`);
  } catch (e) {
    console.error(e);
    await m.reply("❌ Error al conectar con la IA de Isagi.");
  }
};

handler.command = /^isagi$/i;
handler.help = ["isagi <texto>"];
handler.tags = ["ai"];

export default handler;