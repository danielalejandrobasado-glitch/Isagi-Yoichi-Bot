//código creado por: https://github.com/ittschinitaaa

import fs from 'fs'
import os from 'os'
import { performance } from 'perf_hooks'

let handler = async (m, { conn, usedPrefix }) => {
  
  // Imagen que saldrá en la tarjeta
  let media = 'https://files.catbox.moe/qd9cd2.jpg' // cambia el link por tu foto
  
  // Tiempo activo
  let uptime = process.uptime() * 1000
  let tiempo = clockString(uptime)
  
  // Texto del menú
  let menu = `
¡𝐇𝐨𝐥𝐚 𝐔𝐬𝐮𝐚𝐫𝐢𝐨! 𝐒𝐨𝐲 ⏤͟͞ू⃪𝐘𝐨𝐢𝐜𝐡𝐢 𝐁ot͟𑁯ᰍ

╭━━I N F O-B O-T━━
┃Creador: ⏤͟͟͞͞𝐃𝐮𝐚𝐫𝐭𝐞
┃Tiempo activo: *${tiempo}*
┃Baileys: Multi device
┃Usuario: *${m.pushName}*
╰━━━━━━━━━━━━━

➪ 𝗟𝗜𝗦𝗧𝗔 
       ➪  𝗗𝗘 
           ➪ 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮PRINCIPALES
┃┈➤ #estado
┃┈➤ #botreglas
┃┈➤ #menu
┃┈➤ #uptime
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮NUEVOS
┃┈➤ #artista [nombre]
┃┈➤ #dalle2
┃┈➤ #repeat
┃┈➤ #repite
┃┈➤ #copiame
┃┈➤ #soccer
┃┈➤ #rcjugador
┃┈➤ #rgjugador
┃┈➤ #vtjugador
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮PERSONALIZACIÓN
┃┈➤ #set
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮SUBBOTS
┃┈➤ #setname
┃┈➤ #setbanner
┃┈➤ #code
┃┈➤ #qr
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮BUSCADORES
┃┈➤ #gitthubsearch
┃┈➤ #google [Búsqueda]
┃┈➤ #tiktoksearch
┃┈➤ #pinterest
┃┈➤ #imagen [querry]
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮JUEGOS
┃┈➤ #abrazar
┃┈➤ #acertijo
┃┈➤ #agarrar
┃┈➤ #ahorcado
┃┈➤ #besar
┃┈➤ #acariciar
┃┈➤ #golpear
┃┈➤ #pregunta
┃┈➤ #reto
┃┈➤ #triste
┃┈➤ #reto
┃┈➤ #bot
┃┈➤ #love
┃┈➤ #consejo
┃┈➤ #dance
┃┈➤ #nombreninja
┃┈➤ #meme
┃┈➤ #dormir 
┃┈➤ #rata
┃┈➤ #enamorada
┃┈➤ #gay
┃┈➤ #manco
┃┈➤ #apostar
┃┈➤ #piropo
┃┈➤ #sonrojarse
┃┈➤ #agarrar
╰━━━━━━━━━━━━━━━━━━


.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮WAIFU
┃┈➤ #robarpersonaje
┃┈➤ #obtenidos
┃┈➤ #sacar
┃┈➤ #guardar
┃┈➤ #carrw
┃┈➤ #confirmar
┃┈➤ #character
┃┈➤ #roll
┃┈➤ #top
╰━━━━━━━━━━━━━━━━━━


.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮REGISTROS
┃┈➤ #reg
┃┈➤ #unreg
┃┈➤ #profile
┃┈➤ #usuarios
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮ECONOMIA
┃┈➤ #daily
┃┈➤ #bank
┃┈➤ #robar
┃┈➤ #robarxp
┃┈➤ #rob2
┃┈➤ #levelup
┃┈➤ #lb
┃┈➤ #mine
┃┈➤ #retirar
┃┈➤ #trabajar
┃┈➤ #transferir
┃┈➤ #crimen
┃┈➤ #cofre
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮DESCARGAS
┃┈➤ #fb
┃┈➤ #play
┃┈➤ #playvid
┃┈➤ #mediafire
┃┈➤ #apkmod
┃┈➤ #ytmp3doc
┃┈➤ #ytmp4doc
┃┈➤ #ig
┃┈➤ #gitclone
┃┈➤ #tiktok
┃┈➤ #spotify
┃┈➤ #tw
┃┈➤ #ytmp4 
┃┈➤ #imagen [querry]
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮GRUPOS
┃┈➤ #group abrir 
┃┈➤ #group cerrar 
┃┈➤ #delete
┃┈➤ #setppgroup
┃┈➤ #encuesta
┃┈➤ #rentar
┃┈➤ #kick
┃┈➤ #promote
┃┈➤ #demote
┃┈➤ #tagall 
┃┈➤ #tag
┃┈➤ #invite 
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮STICKERS
┃┈➤ #wm [autor]
┃┈➤ #s
┃┈➤ #qc
┃┈➤ #toimg
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮DATABASE
┃┈➤ #delvn
┃┈➤ #demsg
┃┈➤ #delimg
┃┈➤ #delsticker
┃┈➤ #infobot
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮EXPERIENCIA
┃┈➤ #buy
┃┈➤ #buyall
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮CONFIGURACIÓN
┃┈➤ #enable
┃┈➤ #disable
┃┈➤ #on
┃┈➤ #off
╰━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮ANIME
┃┈➤ #toanime
┃┈➤ #tts
┃┈➤ #remini
┃┈➤ #enhance
┃┈➤ #hd
┃┈➤ #nuevafotochannel
┃┈➤ #nosilenciarcanal
┃┈➤ #silenciarcanal
┃┈➤ #seguircanal
┃┈➤ #inspect
┃┈➤ #infobot
┃┈➤ #readvo
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮INFORMACIÓN
┃┈➤ #creador
┃┈➤ #owner
┃┈➤ #reportar
┃┈➤ #ping
┃┈➤ #links
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮CREADOR
┃┈➤ #addprem
┃┈➤ #copia
┃┈➤ #broadcastgroup
┃┈➤ #bcgb
┃┈➤ #bcgb2
┃┈➤ #broadcast
┃┈➤ #bc
┃┈➤ #cheat
┃┈➤ #delprem
┃┈➤ #dsowner
┃┈➤ #fixmsgespera
┃┈➤ #get
┃┈➤ #prefix
┃┈➤ #reiniciar 
┃┈➤ #saveplugin 
┃┈➤ #update
┃┈➤ #resetpersonajes
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮DESARROLLADORES
┃┈➤ #autoadmin
┃┈➤ #banuser
┃┈➤ #unbanuser
┃┈➤ #banchat
┃┈➤ #unbanchat
┃┈➤ #ip
┃┈➤ #join
╰━━━━━━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮A - I
┃┈➤ #dalle
┃┈➤ #simi
┃┈➤ #ai
┃┈➤ #tovideo
┃┈➤ #togifaud
╰━━━━━━━━━━━━━━━━━━


> © ⍴᥆ᥕᥱrᥱძ ᑲᥡ ⏤͟͟͞͞ძᥙᥲr𝗍ᥱ
`

  // Enviar tarjeta con imagen y texto del menú
  await conn.sendMessage(m.chat, {
    text: menu,
    contextInfo: {
      externalAdReply: {
        title:`⏤͟͞ू⃪𝐁𝕃𝐔𝔼 𝐋𝕆𝐂𝕂 𝐂𝕃𝐔𝔹 𑁯🩵ᰍ`,
        body: '⏤͟͟͞͞𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐃𝐮𝐚𝐫𝐭𝐞 ☆',
        thumbnailUrl: media,
        sourceUrl: 'https://github.com/ittschinitaaa', // pon tu enlace
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handler.command = ['menu',`help`]
export default handler

// Función para mostrar horas/min/seg
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

/*import os from 'title
var handler = async (m, { conn }) => {
    try {
        // Tiempo activo
        const uptime = process.uptime()
        const horas = Math.floor(uptime / 3600)
        const minutos = Math.floor((uptime % 3600) / 60)
        const segundos = Math.floor(uptime % 60)
        const tiempoActivo = `${horas}h ${minutos}m ${se:gundos}s`

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
