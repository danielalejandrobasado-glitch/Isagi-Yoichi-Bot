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
  ['923256941884']
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.owner_lid = [
  [' 243349189566583', '🩵 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 🩵 (LID)', true],
  ['149963665342644', 'Número 2 (LID)', true]
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['573244642273'] 
global.prems = []

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.8'
global.vs = '2.0.0'
global.languaje = 'Español'
global.nameqr = 'Isagi Bot'
global.sessions = 'Session'
global.jadi = 'JadiBot'
global.makiJadibts = true

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.packsticker = `⏤͟͞ू⃪  ̸̷͢Yoichi 𝐁𝐨𝐭𑁯ᰍ\n`
global.packname = `⏤͟͞ू⃪  ̸̷͢Yoichi 𝐁𝐨𝐭𑁯ᰍ`
global.author = `socket:\n✐ Yoichi isagi\n\nStickers Desarrollados en Duarte`;
global.wm = '⏤͟͞ू⃪  ̸̷͢𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐃𝐮𝐚𝐫𝐭𝐞';
global.titulowm = '⏤͟͞ू⃪Yoichi 𝐁ot͟𑁯ᰍ';
global.igfg = 'DuarteXV'
global.botname = 'Isagi Yoichi 𝐁𝐨𝐭 𝐌𝐃'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ ძᥙᥲr𝗍ᥱ'
global.textbot = '⏤͟͟͞͞𝐃𝐮𝐚𝐫𝐭𝐞'
global.gt = '͟͞𝐃uarte';
global.namechannel = 'Isagi Yoichi bot'

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.moneda = 'Blue-lock-points'

//• ﹒⌗﹒𝑳𝑰𝑵𝑲𝑺 𝑮𝑹𝑼𝑷𝑶𝑺/𝑪𝑨𝑵𝑨𝑳𝑬𝑺 𝑶𝑭𝑰𝑪𝑰𝑨𝑳𝑬𝑺.ৎ🩵˚₊‧ 
global.gp4 = 'https://chat.whatsapp.com/GPfABUmCuVN2Qu1d1PPcBY?mode=ems_copy_t' //Grupo Oficial De Makima 
global.gp1 = 'https://chat.whatsapp.com/G3CacsGOOBACv7ssuUoJVj?mode=ems_copy_t' //Grupo 2
global.gp2 = 'https://chat.whatsapp.com/G3CacsGOOBACv7ssuUoJVj?mode=ems_copy_t'//
global.channel = 'https://whatsapp.com/channel/0029Vb73g1r1NCrTbefbFQ2T' //Canal Oficial
global.channel2 = 'https://whatsapp.com/channel/0029Vb73g1r1NCrTbefbFQ2T' //Canal test 
global.yt = 'https://dash.kurayamihost.dpdns.org/home' //Canal De Youtube
global.md = 'https://github.com/danielalejandrobasado-glitch/Isagi-Yoichi-Bot.git' //Github Oficial
global.correo = 'danielalejandrobasado@gmail.com'
global.cn ='https://whatsapp.com/channel/0029Vb73g1r1NCrTbefbFQ2T'

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363420979328566@newsletter',
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
