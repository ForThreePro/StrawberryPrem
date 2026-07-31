let handler = async (m, { conn, isAdmin, text }) => {
  if (!isAdmin) return m.reply(`*╭─🍓『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』🍓─╮*
*│* 💕 *SOLO ADMINS PUEDEN USAR ESTO*
*╰────────────────────🌸*`);
  if (!text) return m.reply(`*╭─🍓『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』🍓─╮*
*│* ✨ *ESCRIBE UN TEXTO*
*│*
*│* *Ejemplo*:.setbye @name se despidió de @group
*╰────────────────────🌸*`);

  let chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}
  chat.byeText = text
  await global.db.write()

  m.reply(`*╭─🍓『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』🍓─╮*
*│* 🌷 *DESPEDIDA ACTUALIZADA*
*╰────────────────────🌸*`);
}
handler.help = ['setbye <text>']
handler.tags = ['group']
handler.command = ['setbye']
handler.admin = true
handler.group = true
export default handler