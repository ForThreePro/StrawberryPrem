let handler = async (m, { conn, isAdmin, text }) => {
  if (!isAdmin) throw `╭─🍓 *『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』* 🍓─╮\n│ 😡 *SOLO ADMINS*\n╰─────────────────🍓`;
  if (!text) throw `╭─🍓 *『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』* 🍓─╮\n│ ⚠️ *FALTA EL TEXTO*\n│\n│ *Ejemplo*:.setwelcome @name bienvenid@ a @group\n│\n│ *Variables*: @name @user @group @desc %users @action @date\n╰─────────────────🍓`;

  let chat = global.db.data.chats[m.chat] || {}
  chat.welcomeText = text
  global.db.data.chats[m.chat] = chat
  await global.db.write()

  m.reply(`╭─🍓 *『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』* 🍓─╮\n│ ✅ *BIENVENIDA GUARDADA*\n╰─────────────────🍓`);
}
handler.help = ['setwelcome <text>']
handler.tags = ['group']
handler.command = /^setwelcome$/i
handler.admin = true
handler.group = true
export default handler