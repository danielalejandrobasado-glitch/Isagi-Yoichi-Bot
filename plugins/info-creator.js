let handler = async (m, { conn }) => {
  // Reacciona con 💎
  if (conn.sendMessage) {
    await conn.sendMessage(m.chat, { react: { text: '💎', key: m.key }});
  }

  // Datos de los contactos
  let numberCreator = '573244642273' // Número de la creadora
  let nombreCreator = '💎 C R E A D O R 💎'
  let canal = 'https://wa.me/573244642273'

  let numberBot = '212649023476' // Número del bot
  let nombreBot = 'BOT OFICIAL'

  let numberManuel = '18293142989'
  let nombreManuel = 'SOPORTE KURAYAMI HOSTING'

  // vCards individuales
  let vcardCreator = `BEGIN:VCARD
VERSION:3.0
N:${nombreCreator}
FN:${nombreCreator}
TEL;waid=${numberCreator}:${numberCreator}
END:VCARD`

  let vcardBot = `BEGIN:VCARD
VERSION:3.0
N:${nombreBot}
FN:${nombreBot}
TEL;waid=${numberBot}:${numberBot}
END:VCARD`

  let vcardManuel = `BEGIN:VCARD
VERSION:3.0
N:${nombreManuel}
FN:${nombreManuel}
TEL;waid=${numberManuel}:${numberManuel}
END:VCARD`

  // Envía el canal como texto
  await conn.sendMessage(m.chat, { text: `💙 AQUI ESTA EL NUMERO DE MI CREADOR Y MÁS CONTACTOS` }, { quoted: m })

  // Envía la tarjeta de contacto con los tres contactos
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: 'Contactos Importantes',
      contacts: [
        { vcard: vcardCreator },
        { vcard: vcardBot },
        { vcard: vcardManuel }
      ]
    }
  }, { quoted: m })
}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler
