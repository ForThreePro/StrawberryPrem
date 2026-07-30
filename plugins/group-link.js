var handler = async (m, { conn, args }) => {

let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)

conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 🔗 𝐄𝐍𝐋𝐀𝐂𝐄 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎 」─╮
│
│ 🌸 𝗘𝗻𝗹𝗮𝗰𝗲 : ${link}
│ 🍓 𝗘𝘀𝘁𝗮𝗱𝗼 : 𝗔𝗰𝘁𝗶𝘃𝗼
│ 💖 𝗔𝗱𝘃𝗲𝗿𝘁𝗲𝗻𝗰𝗶𝗮 : 𝗖𝗼𝗺𝗽𝗮𝗿𝘁𝗲 𝗰𝗼𝗻 𝗰𝘂𝗶𝗱𝗮𝗱𝗼
│
╚━━━━━━━━━━╝

🌸 "𝗨𝗻𝗮 𝗶𝗻𝘃𝗶𝘁𝗮𝗰𝗶𝗼𝗻 𝗱𝗲𝗹 𝗷𝗮𝗿𝗱𝗶𝗻 𝗱𝗲 𝗳𝗿𝗲𝘀𝗮𝘀" 🍓
`, m, { detectLink: true })

}
handler.help = ['link']
handler.tags = ['group']
handler.command = ['link', 'enlace', 'invitacion']
handler.group = true
handler.botAdmin = true

export default handler