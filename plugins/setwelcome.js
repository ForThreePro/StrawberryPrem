let handler = async (m, { conn, isAdmin, text }) => {
  if (!isAdmin) return m.reply(`*╭─🍓『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』🍓─╮*
*│* 💕 *SOLO ADMINS PUEDEN USAR ESTO*
*╰────────────────────🌸*`);
  if (!text) return m.reply(`*╭─🍓『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』🍓─╮*
*│* ✨ *ESCRIBE UN TEXTO LINDO*
*│*
*│* *Ejemplo*:.setwelcome Bienvenida @name a @group
*│*
*│* *Variables*: @name @user @group @desc %users @action @date
*╰────────────────────🌸*`);

  let chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}
  chat.welcomeText = text
  await global.db.write()

  m.reply(`*╭─🍓『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』🍓─╮*
*│* 🌷 *BIENVENIDA ACTUALIZADA*
*│* *Ahora todo se ve más cute*
*╰────────────────────🌸*`);
}
handler.help = ['setwelcome <text>']
handler.tags = ['group']
handler.command = ['setwelcome']
handler.admin = true
handler.group = true
export default handler