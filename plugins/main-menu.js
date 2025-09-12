import os from 'os'

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
