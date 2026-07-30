var handler = async (m, { conn, participants, usedPrefix, command }) => {
  let texto = await m.mentionedJid;
  let user = texto.length > 0? texto[0] : (m.quoted? await m.quoted.sender : false);

  if (!user) {
    return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ❌ 𝐈𝐍𝐒𝐓𝐑𝐔𝐂𝐈𝐎𝐍 」─╮
│
│ 🌸 𝗠𝗲𝗻𝗰𝗶𝗼𝗻𝗮 𝗼 𝗰𝗶𝘁𝗮 𝗮𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼
│ 🍓 𝗘𝗷𝗲𝗺𝗽𝗹𝗼 :.${command} @usuario
│
╚━━━━━━━━━━╝
`, m);
  }

  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = globalThis.owner[0][0] + '@s.whatsapp.net';
  const protectedOwners = global.owner.map(o => o[0] + '@s.whatsapp.net');
  const targetName = globalThis.db.data.users[user]?.name || await conn.getName(user)

  if (user === m.sender) {
    return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⛔ 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 🌸 𝗡𝗼 𝗽𝘂𝗲𝗱𝗲𝘀 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿𝘁𝗲
│ 🍓 𝗮 𝘁𝗶 𝗺𝗶𝘀𝗺𝗮
│
╚━━━━━━━━━━╝
`, m);
  }

  if (user === conn.user.jid) {
    return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⛔ 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 🌸 𝗡𝗼 𝗽𝘂𝗲𝗱𝗼 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿𝗺𝗲
│ 🍓 𝗮 𝗺𝗶 𝗺𝗶𝘀𝗺𝗮
│
╚━━━━━━━━━━╝
`, m);
  }

  if (user === ownerGroup) {
    return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⛔ 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 🌸 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿
│ 🍓 𝗮𝗹 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 𝗱𝗲𝗹 𝗚𝗿𝘂𝗽𝗼
│
╚━━━━━━━━━━╝
`, m);
  }

  if (user === ownerBot || protectedOwners.includes(user)) {
    return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⛔ 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 🌸 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿
│ 🍓 𝗮𝗹 𝗢𝘄𝗻𝗲𝗿 𝗱𝗲𝗹 𝗕𝗼𝘁
│
╚━━━━━━━━━━╝
`, m);
  }

  const participant = groupInfo.participants.find(p => p.jid === user);

  if (!participant) {
    return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⚠️ 𝐀𝐕𝐈𝐒𝐎 」─╮
│
│ 🌸 ${targetName} 𝘆𝗮 𝗻𝗼 𝗲𝘀𝘁𝗮
│ 🍓 𝗲𝗻 𝗲𝗹 𝗴𝗿𝘂𝗽𝗼
│
╚━━━━━━━━━━╝
`, m);
  }

  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

  await conn.reply(m.chat, `🍓━━━━━━━━🍓
   🔻 𝐄𝐗𝐏𝐔𝐋𝐒𝐈𝐎𝐍 𝐄𝐉𝐄𝐂𝐔𝐓𝐀𝐃𝐀 🔻
🍓━━━━━━━━🍓

╭─「 🌸 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│
│ 🍓 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 : ${targetName}
│ 🌸 𝗔𝗰𝗶𝗼𝗻 : 𝗘𝗫𝗣𝗨𝗟𝗦𝗔𝗗𝗔
│ 💖 𝗣𝗼𝗿 : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

🌸 "𝗨𝗻𝗮 𝗳𝗹𝗼𝗿 𝗺𝗲𝗻𝗼𝘀 𝗲𝗻 𝗲𝗹 𝗷𝗮𝗿𝗱𝗶𝗻" 🍓
`, m, { mentions: [m.sender] });
};

handler.help = ['kick'];
handler.tags = ['group'];
handler.command = ['kick','echar','sacar'];
handler.admin = true;
handler.botAdmin = true;

export default handler;