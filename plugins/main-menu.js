let handler = async (m, { conn, usedPrefix, text, command }) => {
  try {
    // Banner y nombre por sesión
    if (!global.bannerUrls[conn.user.jid]) global.bannerUrls[conn.user.jid] = 'https://qu.ax/XkPVZ.jpg';
    if (!global.botNames[conn.user.jid]) global.botNames[conn.user.jid] = 'Makima';

    const isSocketActive = conn.user.jid === m.sender;

    // Comando para cambiar banner
    if (command === 'setbanner') {
      if (!isSocketActive) return m.reply('「🩵」Este comando solo puede ser usado por el socket.', m);
      if (!text) return m.reply('✘ Por favor, proporciona un enlace válido para la nueva imagen del banner.', m);
      global.bannerUrls[conn.user.jid] = text.trim();
      return m.reply('「🩵」El banner fue actualizado con éxito...', m);
    }

    // Comando para cambiar nombre
    if (command === 'setname') {
      if (!isSocketActive) return m.reply('「🩵」Este comando solo puede ser usado por el socket.', m);
      if (!text) return m.reply('「🩵」¿Qué nombre deseas agregar al socket?', m);
      global.botNames[conn.user.jid] = text.trim();
      return m.reply('「🩵」El nombre fue actualizado con éxito...', m);
    }

    // Comando menú
    if (['menu', 'help', 'menú'].includes(command)) {
      // Validar JID del mensaje
      const chatJid = typeof m.chat === 'string' ? m.chat : (m.sender || conn.user.jid);

      // Perfil seguro
      let who = Array.isArray(m.mentionedJid) && m.mentionedJid[0] ? m.mentionedJid[0] : (m.fromMe ? conn.user.jid : m.sender);
      who = typeof who === 'string' ? who : conn.user.jid;
      let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/mqtxvp.jpg');

      // Info de usuario seguro
      const userData = global.db?.data?.users?.[m.sender] || {};
      let { exp = 0, chocolates = 0, level = 0, role = 'Novato' } = userData;
      let { min, xp, max } = xpRange(level, global.multiplier || 1);
      let nombre = await conn.getName(m.sender).catch(_ => 'Usuario');

      // Tiempos de uptime
      let _uptime = process.uptime() * 1000;
      let _muptime;
      if (process.send) {
        process.send('uptime');
        _muptime = await new Promise(resolve => {
          process.once('message', resolve);
          setTimeout(resolve, 1000);
        }) * 1000;
      }
      let uptime = clockString(_uptime);
      let muptime = clockString(_muptime);

      // Total de registros seguro
      let totalreg = global.db?.data?.users ? Object.keys(global.db.data.users).length : 0;
      let taguser = typeof m.sender === 'string' ? '@' + m.sender.split("@s.whatsapp.net")[0] : '@usuario';
      const emojis = '🩵';
      const error = '❌';

      let botname = global.botNames[conn.user.jid];

      // Menú
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


> © ⍴᥆ᥕᥱrᥱძ ᑲᥡ Félix Manuel`; // resto del menú

      // Enviar menú seguro
      if (chatJid) {
        await conn.sendMessage(chatJid, {
          image: { url: global.bannerUrls[conn.user.jid] },
          caption: menu,
          contextInfo: {
            mentionedJid: [m.sender].filter(Boolean),
            isForwarded: true,
            forwardingScore: 999,
            externalAdReply: {
              title: '𝐌A͜͡𝑲𝑖𝐌ꪖ  𝐁o͟T͎ 𝙼𝙳',
              body: 'Félix Manuel',
              thumbnailUrl: perfil,
              sourceUrl: 'https://github.com/Andresv27728/2.0',
              mediaType: 1,
              renderLargerThumbnail: false,
            },
          }
        }, { quoted: m });
        await m.react(emojis);
      } else {
        await m.reply('❌ No se pudo obtener el chat JID.', m);
      }
    }

  } catch (e) {
    await m.reply(`✘ Ocurrió un error al enviar el menú.\n\n${e}`, m);
    await m.react('❌');
  }
};
