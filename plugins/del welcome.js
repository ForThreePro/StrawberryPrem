let handler = async (m, { conn, isAdmin }) => {
  if (!isAdmin) return m.reply(`*╭─🍓『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』🍓─╮*
*│* 💕 *SOLO ADMINS*
*╰────────────────────🌸*`);

  let chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}
  chat.welcomeText = null
  await global.db.write()

  m.reply(`*╭─🍓『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』🍓─╮*
*│* 🗑️ *BIENVENIDA ELIMINADA*
*│* *Volví al estilo fresita por defecto*
*╰────────────────────🌸*`);
}
handler.help = ['delwelcome']
handler.tags = ['group']
handler.command = ['delwelcome']
handler.admin = true
handler.group = true
export default handler