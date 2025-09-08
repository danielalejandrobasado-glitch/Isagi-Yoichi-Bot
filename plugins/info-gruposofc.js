import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

  const namegrupo = 'Grupo Oficial'
  const gp1 = 'https://chat.whatsapp.com/GPfABUmCuVN2Qu1d1PPcBY?mode=ems_copy_t' // ← tu link real

  const namechannel = 'Canal de la Bot'
  const channel = 'https://whatsapp.com/channel/0029Vb73g1r1NCrTbefbFQ2T' // ← tu canal real

  const namehosting = 'Grupo oficial 2'
  const channelhosting = 'https://chat.whatsapp.com/G3CacsGOOBACv7ssuUoJVj?mode=ems_copy_t' // ← tu canal real

  const dev = '💎 Creador: 𝐃𝕌𝐀ℝ𝐓𝔼'
  const catalogo = 'https://qu.ax/dXOUo.jpg' // o './media/grupos.jpg'
  const emojis = '👨‍💻'

  let grupos = `
╭─⟪ 💎GRUPOS OFICIALES
│
│ 💙 *${namegrupo}*
│ ${gp1}
│
│ 💙 *${namechannel}*
│ ${channel}
│
│ 💙  *${namehosting}*
│ ${channelhosting}   
╰───────────────╯
`

  await conn.sendFile(m.chat, catalogo, 'grupos.jpg', grupos.trim(), m)
  await m.react(emojis)
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler
