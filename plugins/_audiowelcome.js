import fs from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
const execAsync = promisify(exec)

let handler = async (m, { isAdmin }) => {
  if (!isAdmin) throw `╭─🍓 *『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』* 🍓─╮\n│ 😡 *SOLO ADMINS*\n╰─────────────────🍓`;
  if (!m.quoted) throw `╭─🍓 *『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗬 𝗕𝗢𝗧 』* 🍓─╮\n│ ⚠️ *RESPONDE A UN AUDIO*\n╰─────────────────🍓`;

  let q = m.quoted
  let mime = (q.msg || q).mimetype || ''
  if (!/audio/.test(mime)) throw `╭─🍓 *『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 』* 🍓─╮\n│ ⚠️ *ESO NO ES UN AUDIO*\n╰─────────────────🍓`;

  let chat = global.db.data.chats[m.chat] || {}
  let buffer = await q.download()
  let tempFile = join('./temp', `${m.chat}_temp_${Date.now()}.ogg`)
  let fileName = join('./temp', `${m.chat}_welcome_${Date.now()}.mp3`)
  if (!fs.existsSync('./temp')) fs.mkdirSync('./temp')
  fs.writeFileSync(tempFile, buffer)

  await execAsync(`ffmpeg -y -i "${tempFile}" -vn -ar 44100 -ac 2 -b:a 128k -c:a libmp3lame -id3v2_version 3 "${fileName}"`)
  fs.unlinkSync(tempFile)

  chat.welcomeAudio = fileName
  global.db.data.chats[m.chat] = chat
  await global.db.write()

  m.reply(`╭─🍓 *『 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗬 𝗕𝗢𝗧 』* 🍓─╮\n│ 🎵 *AUDIO MP3 GUARDADO*\n│ *Ya no se silenciará*\n╰─────────────────🍓`);
}
handler.help = ['audiowelcome']
handler.tags = ['group']
handler.command = /^audiowelcome$/i
handler.admin = true
handler.group = true
export default handler