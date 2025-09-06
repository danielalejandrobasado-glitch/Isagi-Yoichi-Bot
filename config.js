import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

//Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 527222519827

//*──ׄ✰─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.owner = [
  ['573244642273', '🩵 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 🩵', true],
  ['50672110920', 'Félix ofc', true],
  ['18290523631', 'Numero de antes', true],
  ['17869238054']
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.owner_lid = [
  [' 243349189566583', '🩵 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 🩵 (LID)', true],
  ['149963665342644', 'Número 2 (LID)', true]
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['5215211111111'] 
global.prems = []

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.8'
global.vs = '2.0.0'
global.languaje = 'Español'
global.nameqr = 'Makima Bot'
global.sessions = 'Session'
global.jadi = 'JadiBot'
global.makiJadibts = true

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.packsticker = `⏤͟͞ू⃪  ̸̷͢Makima 𝐁𝐨𝐭𑁯ᰍ\n`
global.packname = `⏤͟͞ू⃪  ̸̷͢Makima 𝐁𝐨𝐭𑁯ᰍ`
global.author = `socket:\n✐ MakimaBot\n\nStickers Desarrollados en Deymoon Club`;
global.wm = '⏤͟͞ू⃪  ̸̷͢𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 Deymoon Club';
global.titulowm = '⏤͟͞ू⃪Makima 𝐁𖹭t͟𑁯ᰍ';
global.igfg = 'Deymoon Club'
global.botname = 'Makima 𝐁𝐨𝐭 𝐌𝐃'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ Deymoon Club'
global.textbot = 'Mak𝐢 : DEYMOON CLUB'
global.gt = '͟͞𝐃𝐞𝐧𝐣𝐢';
global.namechannel = 'Mak𝐢 𝐂𝐡a͟𝐧n͟e͟𝐥𑁯'

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.moneda = '¥'

//• ↳ ◜𝑳𝑰𝑵𝑲𝑺  𝑫𝑬𝒀𝑴𝑶𝑶𝑵 𝑪𝑳𝑼𝑩◞ • 🩵
global.gp4 = 'https://chat.whatsapp.com/ETZduk7trjG9xgTXVCRHYK?mode=ac_t' //Grupo Oficial De Makima 
global.gp1 = 'https://chat.whatsapp.com/ETZduk7trjG9xgTXVCRHYK?mode=ac_t' //Grupo 2
global.gp2 = 'https://chat.whatsapp.com/ETZduk7trjG9xgTXVCRHYK?mode=ac_t'//
global.channel = 'https://whatsapp.com/channel/0029VbAa5sNCsU9Hlzsn651S' //Canal Oficial
global.channel2 = 'https://whatsapp.com/channel/0029VbAa5sNCsU9Hlzsn651S' //Canal test 
global.yt = 'https://dash.kurayamihost.dpdns.org/home' //Canal De Youtube
global.md = 'https://dash.kurayamihost.dpdns.org/home' //Github Oficial
global.correo = 'https://dash.kurayamihost.dpdns.org/home'
global.cn ='https://whatsapp.com/channel/0029VbAa5sNCsU9Hlzsn651S';

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363402362088282@newsletter',
}
global.multiplier = 70

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
