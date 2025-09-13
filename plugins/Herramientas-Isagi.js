import { GoogleGenerativeAI } from "@google/generative-ai";

// Tu API Key de Gemini
const genAI = new GoogleGenerativeAI("AIzaSyD4mJ10-0gg0z8p9YkiVm_yzjLksnVPiv4");

export default {
  command: ["isagi"],
  description: "Habla con la IA de Isagi Yoichi",
  async run(m, { text, sock }) {
    try {
      if (!text) {
        return sock.sendMessage(
          m.chat,
          { text: "⚽ Escribe algo para hablar con Isagi Yoichi." },
          { quoted: m }
        );
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(text);
      const response = await result.response.text();

      await sock.sendMessage(
        m.chat,
        { text: `⚽ *Isagi Yoichi*: ${response}` },
        { quoted: m }
      );
    } catch (err) {
      console.error(err);
      await sock.sendMessage(
        m.chat,
        { text: "❌ Error al conectar con la IA." },
        { quoted: m }
      );
    }
  },
};