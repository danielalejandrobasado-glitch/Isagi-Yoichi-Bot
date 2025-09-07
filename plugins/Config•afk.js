export function before(m) {
const user = global.db.data.users[m.sender];
if (user.afk > -1) {
conn.reply(m.chat, `🩵 Dejastes De Estar Inactivo\n${user.afkReason ? 'Motivo De La Inactividad: ' + user.afkReason : ''}\n\n*Tiempo Inactivo: ${(new Date - user.afk).toTimeString()}*`, m, fake)
user.afk = -1;
user.afkReason = '';
}
const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
for (const jid of jids) {
const user = global.db.data.users[jid];
if (!user) {
continue;
}
const afkTime = user.afk;
if (!afkTime || afkTime < 0) {
continue;
}
const reason = user.afkReason || '';
conn.reply(m.chat, `🩵 *El Egoista Esta Inactivo No Lo Etiquetes*`, m, fake)
}
return true;
}
