const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply(`🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⚠️ 𝐀𝐕𝐈𝐒𝐎 」─╮
│
│ 🌸 𝗬𝗮 𝗲𝗿𝗲𝘀 𝗮𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝗱𝗼𝗿𝗮
│ 🍓 𝗱𝗲𝗹 𝗷𝗮𝗿𝗱𝗶𝗻
│
╚━━━━━━━━━━╝
`);

  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    await m.react('🍓')
    m.reply(`🍓━━━━━━━━🍓
   👑 𝐀𝐒𝐂𝐄𝐍𝐒𝐎 𝐂𝐎𝐍𝐂𝐄𝐃𝐈𝐃𝐎 👑
🍓━━━━━━━━🍓

╭─「 🌸 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│
│ 🍓 𝗨𝘀𝘂𝗮𝗿𝗶𝗮 : @${m.sender.split('@')[0]}
│ 🌸 𝗡𝘂𝗲𝘃𝗼 𝗥𝗮𝗻𝗴𝗼 : 𝗔𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝗱𝗼𝗿𝗮
│ 💖 𝗣𝗼𝗿 : 𝗘𝗹 𝗝𝗮𝗿𝗱𝗶𝗻
│
╚━━━━━━━━━━╝

🌸 "𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗮 𝗮𝗹 𝗲𝗾𝘂𝗶𝗽𝗼 𝗿𝗲𝗮𝗹" 🍓
`, null, { mentions: [m.sender] });

  } catch (e) {
    console.error(e)
    m.reply(`🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ❌ 𝐄𝐑𝐎𝐑 」─╮
│
│ 🌸 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗱𝗼 𝗱𝗮𝗿 𝗮𝗱𝗺𝗶𝗻
│ 🍓 𝗩𝗲𝗿𝗶𝗳𝗶𝗰𝗮 𝗽𝗲𝗿𝗺𝗶𝘀𝗼𝘀 𝗱𝗲𝗹 𝗯𝗼𝘁
│
╚━━━━━━━━━━╝
`);
  }
};

handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
handler.owner = true;

export default handler