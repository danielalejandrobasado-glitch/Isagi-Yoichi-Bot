const handler = async (m, {conn}) => {
  m.reply(global.ComprarBot);
};
handler.command ='comprarbot',/^(ComprarBot|Comprar|comprar|ComprarBot)$/i;
export default handler;

global.ComprarBot = `
〔 *ISAGI YOICHI - BOT* 〕

*BOT PARA GRUPO* :
> wa.me/573244642273

*BOT PERZONALIZADO* :
> wa.me/573244642273
`;
