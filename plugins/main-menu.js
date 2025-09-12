import fs from 'fs'
import os from 'os'
import { performance } from 'perf_hooks'

let handler = async (m, { conn, usedPrefix }) => {
  
  // Imagen que saldrá en la tarjeta
  let media = 'https://telegra.ph/file/25da44f8dc38b4f08f3c2.jpg' // cambia el link por tu foto
  
  // Tiempo activo
  let uptime = process.uptime() * 1000
  let tiempo = clockString(uptime)
  
  // Texto del menú
  let menu = `
🥯 Hola soy 🌸 *${conn.user.name}* 
*(Principal)*

⏳ Tiempo activo: *${tiempo}*
👤 Usuario: *${m.pushName}*

╭━━━『 📖 MENÚ 』
│ 🍭 *Información*
│ • ${usedPrefix}ping
│ • ${usedPrefix}owner
│ • ${usedPrefix}estado
│
│ 👥 *Grupos*
│ • ${usedPrefix}kick @user
│ • ${usedPrefix}promote @user
│ • ${usedPrefix}demote @user
│ • ${usedPrefix}infogrupo
│
│ 🛠️ *Herramientas*
│ • ${usedPrefix}sticker
│ • ${usedPrefix}toimg
│ • ${usedPrefix}tourl
│
│ 💖 *Diversión*
│ • ${usedPrefix}frase
│ • ${usedPrefix}gay @user
│ • ${usedPrefix}ship @user
╰━━━━━━━━━━━━━━━
`

  // Enviar tarjeta con imagen y texto del menú
  await conn.sendMessage(m.chat, {
    text: menu,
    contextInfo: {
      externalAdReply: {
        title: `🌸 ${conn.user.name}`,
        body: '✨ Usa los comandos a tu gusto',
        thumbnailUrl: media,
        sourceUrl: 'https://github.com/miaoficial02', // pon tu enlace
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handler.command = ['menu']
export default handler

// Función para mostrar horas/min/seg
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

/*import os from 'os'

var handler = async (m, { conn }) => {
    try {
        // Tiempo activo
        const uptime = process.uptime()
        const horas = Math.floor(uptime / 3600)
        const minutos = Math.floor((uptime % 3600) / 60)
        const segundos = Math.floor(uptime % 60)
        const tiempoActivo = `${horas}h ${minutos}m ${segundos}s`

        // Nombre del bot
        const nombreBot = conn.user?.name || "MiBot"

        // Tipo de bot
        const tipoBot = global.subbot && global.subbot === true ? "Sub-Bot" : "Principal"

        // Menú de comandos
        let menu = `
╭───〔 🤖 ${nombreBot} 〕
│ ⏱ Tiempo activo: ${tiempoActivo}
│ 💻 Tipo: ${tipoBot}
╰─────────────────

📂 *Categorías de Comandos*

╭─❒ General
│ • #menu
│ • #ping
│ • #owner
│ • #botinfo
╰─────────────


`

        conn.reply(m.chat, menu, m)
    } catch (e) {
        console.error(e)
        conn.reply(m.chat, "⚠️ Error al mostrar el menú", m)
    }
}

handler.help = ['menu', 'help', 'comandos']
handler.tags = ['general']
handler.command = ['menu','help','comandos']
handler.register = true

export default handler
*/
