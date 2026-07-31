let handler = async (m, { conn, isAdmin, text }) => {
  if (!isAdmin) throw `╭─🍓 *『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』* 🍓─╮\n│ 😡 *SOLO ADMINS*\n╰─────────────────🍓`;
  if (!text) throw `╭─🍓 *『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗬 𝗕𝗢𝗧 』* 🍓─╮\n│ ⚠️ *FALTA EL TEXTO*\n│\n│ *Ejemplo*:.setbye @name se fue de @group\n│\n│ *Variables*: @name @user @group %users @action @date\n╰─────────────────🍓`;

  let chat = global.db.data.chats[m.chat] || {}
  chat.byeText = text
  global.db.data.chats[m.chat] = chat
  await global.db.write()

  m.reply(`╭─🍓 *『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』* 🍓─╮\n│ ✅ *DESPEDIDA GUARDADA*\n╰─────────────────🍓`);
}
handler.help = ['setbye <text>']
handler.tags = ['group']
handler.command = /^setbye$/i
handler.admin = true
handler.group = true
export default handler