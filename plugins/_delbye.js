let handler = async (m, { isAdmin }) => {
  if (!isAdmin) throw `╭─🍓 *『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗬 𝗕𝗢𝗧 』* 🍓─╮\n│ 😡 *SOLO ADMINS*\n╰─────────────────🍓`;
  let chat = global.db.data.chats[m.chat] || {}
  chat.byeText = null
  global.db.data.chats[m.chat] = chat
  await global.db.write()
  m.reply(`╭─🍓 *『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』* 🍓─╮\n│ 🗑️ *DESPEDIDA ELIMINADA*\n╰─────────────────🍓`);
}
handler.help = ['delbye']
handler.tags = ['group']
handler.command = /^delbye$/i
handler.admin = true
handler.group = true
export default handler