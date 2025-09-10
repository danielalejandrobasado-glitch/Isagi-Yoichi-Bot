//* Código creado por Félix, no quites créditos *//

import fs from 'fs';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';
import { promises } from 'fs';
import { join } from 'path';

// Creamos un objeto global para almacenar el banner y el nombre por sesión
global.bannerUrls = {}; // Almacenará las URLs de los banners por sesión
global.botNames = {};   // Almacenará los nombres personalizados por sesión

let handler = async (m, { conn, usedPrefix, text, command }) => {
  try {
    // Inicializamos el banner y el nombre por sesión si no existen
    if (!global.bannerUrls[conn.user.jid]) {
      global.bannerUrls[conn.user.jid] = 'https://qu.ax/XkPVZ.jpg'; // URL inicial de la imagen del menú
    }
    if (!global.botNames[conn.user.jid]) {
      global.botNames[conn.user.jid] = 'Makima'; // Nombre inicial del bot
    }

    // Verificar si el usuario es el socket activo
    const isSocketActive = conn.user.jid === m.sender;

    // Comando para cambiar el banner (solo permitido para el socket activo)
    if (command === 'setbanner') {
      if (!isSocketActive) {
        return await m.reply('「🩵」Este comando solo puede ser usado por el socket.', m);
      }
      if (!text) {
        return await m.reply('✘ Por favor, proporciona un enlace válido para la nueva imagen del banner.', m);
      }
      global.bannerUrls[conn.user.jid] = text.trim(); // Actualiza el banner solo para esta sesión
      return await m.reply('「🩵」El banner fue actualizado con éxito...', m);
    }

    // Comando para cambiar el nombre del bot (solo permitido para el socket activo)
    if (command === 'setname') {
      if (!isSocketActive) {
        return await m.reply('「🩵」Este comando solo puede ser usado por el socket.', m);
      }
      if (!text) {
        return await m.reply('「🩵」¿Qué nombre deseas agregar al socket?', m);
      }
      global.botNames[conn.user.jid] = text.trim(); // Actualiza el nombre solo para esta sesión
      return await m.reply('「🩵」El nombre fue actualizado con éxito...', m);
    }

    // Comandos para el menú y "CARGANDO COMANDOS" (pueden ser usados por cualquier usuario)
    if (command === 'menu' || command === 'help' || command === 'menú') {
      // Variables para el contexto del canal
      const dev = 'Félix Manuel';
      const redes = 'https://dash.kurayamihost.dpdns.org/home';
      const channelRD = { id: "120363418804796632@newsletter", name: "Kurayami Host" };
      let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
      let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/mqtxvp.jpg');

      // Mensaje de "CARGANDO COMANDOS..." con contexto de canal y respondiendo al mensaje
      /*await conn.sendMessage(m.chat, {
        text: 'ꪹ͜🕑͡ 𝗖𝗔𝗥𝗚𝗔𝗡𝗗𝗢 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦...𓏲✧੭',
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            newsletterName: channelRD.name,
            serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
            title: 'Animación de carga',
            body: dev,
            thumbnailUrl: perfil,
            sourceUrl: redes,
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        }
      }, { quoted: m });*/

      // Datos usuario y menú
      let { exp, chocolates, level, role } = global.db.data.users[m.sender];
      let { min, xp, max } = xpRange(level, global.multiplier);
      let nombre = await conn.getName(m.sender);
      let _uptime = process.uptime() * 1000;
      let _muptime;
      if (process.send) {
        process.send('uptime');
        _muptime = await new Promise(resolve => {
          process.once('message', resolve);
          setTimeout(resolve, 1000);
        }) * 1000;
      }
      let muptime = clockString(_muptime);
      let uptime = clockString(_uptime);
      let totalreg = Object.keys(global.db.data.users).length;
      let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
      const emojis = '🩵';
      const error = '❌';

      let botname = global.botNames[conn.user.jid];
      
      let botStatus = (conn.user.jid === global.conn.user.jid) ? '(OficialBot)' : '(Sub-Bot)';
      if (conn.isBotPrem) {
        botStatus += ' (Premium)';
      }

      let menu = `¡Hola! ${taguser} soy ${botname} ${botStatus}
      
╭━━I N F O-B O-T━━
┃Creador: DuarteXV 
┃Tiempo activo: ${uptime}
┃Baileys: Multi device
┃Moneda actual: ${moneda}
┃Registros: ${totalreg}
╰━━━━━━━━━━━━━

╭━━INFO USUARIO━╮
┃Nombre: ${nombre}
┃Rango: ${role}
┃Nivel: ${level}
╰━━━━━━━━━━━━━

➪ 𝗟𝗜𝗦𝗧𝗔 
       ➪  𝗗𝗘 
           ➪ 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦


.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮SISTEMA
┃ ┈➤ #formarpareja5
┃ ┈➤ #afk [alasan]
┃ ┈➤ #runtime
┃ ┈➤ #blocklist
┃ ┈➤ #owner
┃ ┈➤ #menu
┃ ┈➤ #menú
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮GRUPOS
┃ ┈➤ #desbanearbot
┃ ┈➤ #banearbot
┃ ┈➤ #enable <opción>
┃ ┈➤ #disable <opción>
┃ ┈➤ #staff
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮SUB BOTS
┃ ┈➤ #qr
┃ ┈➤ #code
┃ ┈➤ #setname [nombre]
┃ ┈➤ #setbanner [link]
┃ ┈➤ #setprimary [@Bot]
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮AI
┃ ┈➤ #gemini
┃ ┈➤ #chatgpt <texto>
┃ ┈➤ #ia <texto>
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮ANIME
┃ ┈➤ #animelink
┃ ┈➤ #infoanime
┃ ┈➤ #topwaifus [página]
┃ ┈➤ #wvideo <nombre del personaje>
┃ ┈➤ #wimage <nombre del personaje>
┃ ┈➤ #charinfo <nombre del personaje>
┃ ┈➤ #winfo <nombre del personaje>
┃ ┈➤ #waifuinfo <nombre del personaje>
┃ ┈➤ #alisa
┃ ┈➤ #aihoshino
┃ ┈➤ #remcham
┃ ┈➤ #akira
┃ ┈➤ #akiyama
┃ ┈➤ #anna
┃ ┈➤ #asuna
┃ ┈➤ #ayuzawa
┃ ┈➤ #boruto
┃ ┈➤ #chiho
┃ ┈➤ #chitoge
┃ ┈➤ #deidara
┃ ┈➤ #erza
┃ ┈➤ #elaina
┃ ┈➤ #eba
┃ ┈➤ #emilia
┃ ┈➤ #hestia
┃ ┈➤ #hinata
┃ ┈➤ #inori
┃ ┈➤ #isuzu
┃ ┈➤ #itachi
┃ ┈➤ #itori
┃ ┈➤ #kaga
┃ ┈➤ #kagura
┃ ┈➤ #kaori
┃ ┈➤ #keneki
┃ ┈➤ #kotori
┃ ┈➤ #kurumitokisaki
┃ ┈➤ #madara
┃ ┈➤ #mikasa
┃ ┈➤ #miku
┃ ┈➤ #minato
┃ ┈➤ #naruto
┃ ┈➤ #nezuko
┃ ┈➤ #sagiri
┃ ┈➤ #sasuke
┃ ┈➤ #sakura
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮AUDIO
┃ ┈➤ #bass [vn]
┃ ┈➤ #blown [vn]
┃ ┈➤ #deep [vn]
┃ ┈➤ #earrape [vn]
┃ ┈➤ #fast [vn]
┃ ┈➤ #fat [vn]
┃ ┈➤ #nightcore [vn]
┃ ┈➤ #reverse [vn]
┃ ┈➤ #robot [vn]
┃ ┈➤ #slow [vn]
┃ ┈➤ #smooth [vn]
┃ ┈➤ #tupai [vn]
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮BUSCADOR
┃ ┈➤ #pornhubsearch
┃ ┈➤ #githubsearch
┃ ┈➤ #google <búsqueda>
┃ ┈➤ #mercadolibre <búsqueda>
┃ ┈➤ #npmjs
┃ ┈➤ #tweetposts
┃ ┈➤ #tiktoksearch <txt>
┃ ┈➤ #xnxxsearch <query>
┃ ┈➤ #imagen <query>
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮IMG
┃ ┈➤ #pinterest <término>
┃ ┈➤ #waifu
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮TRANSFORMADOR
┃ ┈➤ #tovideo
┃ ┈➤ #togifaud
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮STICKER
┃ ┈➤ #toimg (reply)
┃ ┈➤ #qc
┃ ┈➤ #take *<nombre>|<autor>*
┃ ┈➤ #sticker <imagen|video|url>
┃ ┈➤ #stiker <imagen|video|url>
┃ ┈➤ #s <imagen|video|url>
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮TOOLS
┃ ┈➤ #tts <lang> <teks>
┃ ┈➤ #fake
┃ ┈➤ #hd
┃ ┈➤ #ssweb
┃ ┈➤ #ss
┃ ┈➤ #trad
┃ ┈➤ #spamwa <number>|<mesage>|<no of messages>
┃ ┈➤ #IPdoxx
┃ ┈➤ #nuevafotochannel
┃ ┈➤ #nosilenciarcanal
┃ ┈➤ #silenciarcanal
┃ ┈➤ #noseguircanal
┃ ┈➤ #seguircanal
┃ ┈➤ #avisoschannel
┃ ┈➤ #resiviravisos
┃ ┈➤ #inspect
┃ ┈➤ #inspeccionar
┃ ┈➤ #eliminarfotochannel
┃ ┈➤ #reactioneschannel
┃ ┈➤ #reaccioneschannel
┃ ┈➤ #nuevonombrecanal
┃ ┈➤ #nuevadescchannel
┃ ┈➤ #tourl
┃ ┈➤ #tourl2
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮DESCARGAS
┃ ┈➤ #hentai
┃ ┈➤ #mediafire
┃ ┈➤ #ytmp4 <url>
┃ ┈➤ #facebook
┃ ┈➤ #fb
┃ ┈➤ #gitclone *<url git>*
┃ ┈➤ #instagram
┃ ┈➤ #ig
┃ ┈➤ #apkmod
┃ ┈➤ #spotify *<nombre>*
┃ ┈➤ #imagen <query>
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮DOWNLOADER
┃ ┈➤ #undefined
┃ ┈➤ #musica *<búsqueda>*
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮YTMP3
┃ ┈➤ #ytmp3
┃ ┈➤ #ytmp3doc
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮DL
┃ ┈➤ #tiktok
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮FUN
┃ ┈➤ #acertijo
┃ ┈➤ #gay <@tag> | <nombre>
┃ ┈➤ #lesbiana <@tag> | <nombre>
┃ ┈➤ #pajero <@tag> | <nombre>
┃ ┈➤ #pajera <@tag> | <nombre>
┃ ┈➤ #puto <@tag> | <nombre>
┃ ┈➤ #puta <@tag> | <nombre>
┃ ┈➤ #manco <@tag> | <nombre>
┃ ┈➤ #manca <@tag> | <nombre>
┃ ┈➤ #rata <@tag> | <nombre>
┃ ┈➤ #prostituta <@tag> | <nombre>
┃ ┈➤ #prostituto <@tag> | <nombre>
┃ ┈➤ #apostar *<cantidad>*
┃ ┈➤ #consejo
┃ ┈➤ #dance *<@user>*
┃ ┈➤ #doxear
┃ ┈➤ #formarpareja5
┃ ┈➤ #enamorada @tag
┃ ┈➤ #math
┃ ┈➤ #meme
┃ ┈➤ #personalidad
┃ ┈➤ #piropo
┃ ┈➤ #pokedex *<pokemon>*
┃ ┈➤ #ppt
┃ ┈➤ #pregunta
┃ ┈➤ #reto
┃ ┈➤ #ruleta *<cantidad> <color>*
┃ ┈➤ #ship
┃ ┈➤ #love
┃ ┈➤ #simi
┃ ┈➤ #bot
┃ ┈➤ #top *<texto>*
┃ ┈➤ #zodiac *2002 02 25*
┃ ┈➤ #amistad
┃ ┈➤ #facto
┃ ┈➤ #memev
┃ ┈➤ #pajeame
┃ ┈➤ #formartrio @usuario1 @usuario2
┃ ┈➤ #verdad
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮EMOX
┃ ┈➤ #agarrarnalgas @tag
┃ ┈➤ #anal/culiar @tag
┃ ┈➤ #angry/enojado @tag
┃ ┈➤ #bath/bañarse @tag
┃ ┈➤ #blowjob/mamada @tag
┃ ┈➤ #blush/sonrojarse @tag
┃ ┈➤ #chuparpata @tag
┃ ┈➤ #cry/llorar @tag
┃ ┈➤ #cuddle/acurrucarse @tag
┃ ┈➤ #drunk/borracho @tag
┃ ┈➤ #grabboobs/agarrartetas @tag
┃ ┈➤ #hello/hola @tag
┃ ┈➤ #hug/abrazar @tag
┃ ┈➤ #kill/matar @tag
┃ ┈➤ #kiss/besar @tag
┃ ┈➤ #kiss2/besar2 @tag
┃ ┈➤ #love2/enamorada @tag
┃ ┈➤ #patt/acariciar @tag
┃ ┈➤ #penetrar @user
┃ ┈➤ #punch/golpear @tag
┃ ┈➤ #sad/triste @tag
┃ ┈➤ #scared/asustada @tag
┃ ┈➤ #seduce/seducir @tag
┃ ┈➤ #sexo/sex @tag
┃ ┈➤ #sleep/dormir @tag
┃ ┈➤ #violar/perra @tag
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮NSFWS
┃ ┈➤ #follar @tag
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮GRUPO
┃ ┈➤ #add
┃ ┈➤ #group open / close
┃ ┈➤ #grupo abrir / cerrar
┃ ┈➤ #delete
┃ ┈➤ #demote
┃ ┈➤ #encuesta <text|text2>
┃ ┈➤ #undefined
┃ ┈➤ #hidetag
┃ ┈➤ #infogrupo
┃ ┈➤ #invite *<numero>*
┃ ┈➤ #link
┃ ┈➤ #listadv
┃ ┈➤ #promote
┃ ┈➤ #revoke
┃ ┈➤ #tagall *<mesaje>*
┃ ┈➤ #invocar *<mesaje>*
┃ ┈➤ #kick
┃ ┈➤ #rentar
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮INFO
┃ ┈➤ #reglas
┃ ┈➤ #ds
┃ ┈➤ #fixmsgespera
┃ ┈➤ #ping
┃ ┈➤ #sistema
┃ ┈➤ #speed
┃ ┈➤ #speedtest
┃ ┈➤ #status
┃ ┈➤ #grupos
┃ ┈➤ #script
┃ ┈➤ #reportar
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮OWNER
┃ ┈➤ #expired *<días>*
┃ ┈➤ #addprem [@user] <days>
┃ ┈➤ #autoadmin
┃ ┈➤ #copia
┃ ┈➤ #banuser <@tag> <razón>
┃ ┈➤ #broadcast
┃ ┈➤ #bc
┃ ┈➤ #broadcastgroup
┃ ┈➤ #bcgc
┃ ┈➤ #bcgc2
┃ ┈➤ #bcg
┃ ┈➤ #cheat
┃ ┈➤ #cleartmp
┃ ┈➤ #delprem <@user>
┃ ┈➤ #dsowner
┃ ┈➤ #>
┃ ┈➤ #=>
┃ ┈➤ #$
┃ ┈➤ #fetch
┃ ┈➤ #get
┃ ┈➤ #ip <alamat ip>
┃ ┈➤ #join <link>
┃ ┈➤ #grupocrear <nombre>
┃ ┈➤ #nuevabiobot <teks>
┃ ┈➤ #nuevafotobot *<imagen>*
┃ ┈➤ #nuevonombrebot <teks>
┃ ┈➤ #resetpersonajes
┃ ┈➤ #undefined
┃ ┈➤ #restart
┃ ┈➤ #unbanuser <@tag>
┃ ┈➤ #update
┃ ┈➤ #actualizar
┃ ┈➤ #enable <opción>
┃ ┈➤ #disable <opción>
┃ ┈➤ #añadirmonedas @usuario cantidad
┃ ┈➤ #groups
┃ ┈➤ #grouplist
┃ ┈➤ #reunion
┃ ┈➤ #meeting
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮FIX
┃ ┈➤ #dsowner
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮RPG
┃ ┈➤ #duelo @usuario <apuesta> [tuPersonaje] [personajeRival]
┃ ┈➤ #sacrificar <nombre>
┃ ┈➤ #cazar
┃ ┈➤ #daily
┃ ┈➤ #claim
┃ ┈➤ #cambiarexp <cantidad>
┃ ┈➤ #explorar
┃ ┈➤ #invocacion
┃ ┈➤ #levelup
┃ ┈➤ #listarpersonajes
┃ ┈➤ #logros
┃ ┈➤ #minar
┃ ┈➤ #miestatus
┃ ┈➤ #mimonedas
┃ ┈➤ #miexp
┃ ┈➤ #mispersonajes
┃ ┈➤ #mispjs
┃ ┈➤ #inventario
┃ ┈➤ #comprarpersonaje <nombre>
┃ ┈➤ #reinado
┃ ┈➤ #reinado reset
┃ ┈➤ #rob2
┃ ┈➤ #rob
┃ ┈➤ #toppersonajes
┃ ┈➤ #trabajar
┃ ┈➤ #work
┃ ┈➤ #invasionzombie
┃ ┈➤ #menurpg
┃ ┈➤ #tenertodo
┃ ┈➤ #lb [página]
┃ ┈➤ #bank
┃ ┈➤ #banco
┃ ┈➤ #cajamisteriosa
┃ ┈➤ #transferirmonedas *@user cantidad*
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮ECON
┃ ┈➤ #cambiarexp <cantidad>
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮ECONOMÍA
┃ ┈➤ #listarpersonajes
┃ ┈➤ #miestatus
┃ ┈➤ #mimonedas
┃ ┈➤ #miexp
┃ ┈➤ #mispersonajes
┃ ┈➤ #mispjs
┃ ┈➤ #inventario
┃ ┈➤ #trabajar
┃ ┈➤ #work
┃ ┈➤ #cajamisteriosa
┃ ┈➤ #transferirmonedas *@user cantidad*
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮RANKING
┃ ┈➤ #reinado
┃ ┈➤ #reinado reset
┃ ┈➤ #toppersonajes
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮SEARCH
┃ ┈➤ #ytsearch *<texto>*
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮GACHA
┃ ┈➤ #claim
┃ ┈➤ #ver
┃ ┈➤ #rw
┃ ┈➤ #rollwaifu
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮GRUPOS
┃ ┈➤ #rentar2 *<link>*
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮JADIBOT
┃ ┈➤ #bots
┃ ┈➤ #token
┃ ┈➤ #gettoken
┃ ┈➤ #serbottoken
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮RG
┃ ┈➤ #profile
┃ ┈➤ #unreg
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮PREMIUM
┃ ┈➤ #comprarpremium <cantidad> <unidad>
╰━━━━━━━━━━━━━

.       ╭ֹ┈ ⵿❀⵿ ┈╮ ㅤ
 ╭ֹ┈ ⵿❀⵿ ┈╮JUEGOS
┃ ┈➤ #cajamisteriosa
╰━━━━━━━━━━━━━


> © ⍴᥆ᥕᥱrᥱძ ᑲᥡ Félix Manuel`.trim(); // El resto del menú permanece igual

      // Enviar el menú con el banner y nombre específico para esta sesión y respondiendo al mensaje
      await conn.sendMessage(m.chat, {
        image: { url: global.bannerUrls[conn.user.jid] },
        caption: menu,
        contextInfo: {
          mentionedJid: [m.sender],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            newsletterName: channelRD.name,
            serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
            title: 'Deymoon Club',
            body: dev,
            thumbnailUrl: perfil,
            sourceUrl: redes,
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        }
      }, { quoted: m });

      await m.react(emojis);
    }

  } catch (e) {
    await m.reply(`✘ Ocurrió un error cuando la lista de comandos se iba a enviar.\n\n${e}`, m);
    await m.react(e);
  }
};

handler.help = ['menu', 'setbanner', 'setname'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú', 'asistenciabot', 'comandosbot', 'listadecomandos', 'menucompleto', 'setbanner', 'setname'];
handler.register = true;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

export default handler;
