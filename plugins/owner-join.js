import { getBotConfig } from '../lib/botconfig.js'

let linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner }) => {
  const botname = getBotConfig(conn, 'botname')

    if (!text) return m.reply(`🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ❌ 𝐈𝐍𝐒𝐓𝐑𝐔𝐂𝐈𝐎𝐍 」─╮
│
│ 🌸 𝗗𝗲𝗯𝗲𝘀 𝗲𝗻𝘃𝗶𝗮𝗿 𝘂𝗻𝗮 𝗶𝗻𝘃𝗶𝘁𝗮𝗰𝗶𝗼𝗻
│ 🍓 𝗽𝗮𝗿𝗮 𝗾𝘂𝗲 *${botname}* 𝘀𝗲 𝘂𝗻𝗮
│ 💖 𝗮𝗹 𝗷𝗮𝗿𝗱𝗶𝗻
│
╚━━━━━━━━━━╝
`);

    let [_, code] = text.match(linkRegex) || [];

    if (!code) return m.reply(`🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ❌ 𝐕𝐀𝐋𝐈𝐃𝐀𝐂𝐈𝐎𝐍 」─╮
│
│ 🌸 𝗘𝗻𝗹𝗮𝗰𝗲 𝗱𝗲 𝗶𝗻𝘃𝗶𝘁𝗮𝗰𝗶𝗼𝗻
│ 🍓 𝗻𝗼 𝘃𝗮𝗹𝗶𝗱𝗼
│
╚━━━━━━━━━━╝
`);

    if (isOwner) {
        await conn.groupAcceptInvite(code)
            .then(res => m.reply(`🍓━━━━━━━━🍓
   ✅ 𝐀𝐂𝐄𝐒𝐎 𝐂𝐎𝐍𝐂𝐄𝐃𝐈𝐃𝐎 ✅
🍓━━━━━━━━🍓

╭─「 🌸 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│
│ 🍓 𝗠𝗲 𝗵𝗲 𝘂𝗻𝗶𝗱𝗼 𝗲𝘅𝗶𝘁𝗼𝘀𝗮𝗺𝗲𝗻𝘁𝗲
│ 🌸 𝗮𝗹 𝗷𝗮𝗿𝗱𝗶𝗻
│
╚━━━━━━━━━━╝

💖 "𝗡𝘂𝗲𝘃𝗮 𝗳𝗹𝗼𝗿 𝗲𝗻 𝗲𝗹 𝗷𝗮𝗿𝗱𝗶𝗻" 🍓
`))
            .catch(err => m.reply(`🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ❌ 𝐄𝐑𝐎𝐑 」─╮
│
│ 🌸 𝗘𝗿𝗼𝗿 𝗮𝗹 𝘂𝗻𝗶𝗿𝗺𝗲
│ 🍓 𝗮𝗹 𝗷𝗮𝗿𝗱𝗶𝗻
│
╚━━━━━━━━━━╝
`));
    } else {
        let message = `🍓━━━━━━━━🍓
   📨 𝐒𝐎𝐋𝐈𝐂𝐈𝐓𝐔𝐃 𝐃𝐄 𝐈𝐍𝐆𝐑𝐄𝐒𝐎 📨
🍓━━━━━━━━🍓

╭─「 🌸 𝐃𝐄𝐓𝐀𝐋𝐄 」─╮
│
│ 🍓 𝗘𝗻𝗹𝗮𝗰𝗲 : ${text}
│ 💖 𝗣𝗼𝗿 : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝
`;
        await conn.sendMessage(`${global.owner[0][0]}` + '@s.whatsapp.net', { text: message, mentions: [m.sender] }, { quoted: m });
        m.reply(`🍓━━━━━━━━🍓
   📤 𝐒𝐎𝐋𝐈𝐂𝐈𝐓𝐔𝐃 𝐄𝐍𝐕𝐈𝐀𝐃𝐀 📤
🍓━━━━━━━━🍓

╭─「 🌸 𝐄𝐒𝐓𝐀𝐃𝐎 」─╮
│
│ 🍓 𝗘𝗹 𝗹𝗶𝗻𝗸 𝗱𝗲𝗹 𝗷𝗮𝗿𝗱𝗶𝗻
│ 🌸 𝗵𝗮 𝘀𝗶𝗱𝗼 𝗲𝗻𝘃𝗶𝗮𝗱𝗼
│
╚━━━━━━━━━━╝
`, null, { mentions: [m.sender] });
    }
};

handler.help = ['invite'];
handler.tags = ['owner'];
handler.command = ['invite', 'join', 'unirse'];

export default handler;