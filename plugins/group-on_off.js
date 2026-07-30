let handler = async (m, { conn, args, command, isOwner }) => {
  const setting = args[0]?.toLowerCase();
  const chatData = global.db.data.chats[m.chat];
  const botSettings = global.db.data.settings[conn.user.jid];

  const on = '🍓';
  const off = '🌸';

  // AGARRAR FOTO Y NOMBRE DEL GRUPO
  let pp;
  let groupName = await conn.getName(m.chat);
  try {
    pp = await conn.profilePictureUrl(m.chat, 'image');
  } catch {
    pp = 'https://i.imgur.com/KhY9KkB.png'; // default fresita
  }

  const configList = `
🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⚙️ 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈𝐎𝐍 」─╮
│
│ ${chatData.welcome? on : off} 🌸 𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐚
│ ${chatData.antiLink? on : off} 🍓 𝐀𝐧𝐭𝐢𝐋𝐢𝐧𝐤
│ ${chatData.economy? on : off} 💖 𝐄𝐜𝐨𝐧𝐨𝐦𝐢𝐚
│ ${chatData.gacha? on : off} 🎁 𝐆𝐚𝐜𝐡𝐚
│ ${chatData.adminonly? on : off} 👑 𝐌𝐨𝐝𝐨 𝐀𝐝𝐦𝐢𝐧
│ ${chatData.reaction? on : off} 🌷 𝐑𝐞𝐚𝐜𝐢𝐨𝐧𝐞𝐬
│ ${chatData.nsfw? on : off} 🔞 𝐍𝐒𝐅𝐖
│ ${chatData.alerts? on : off} 🔔 𝐀𝐥𝐞𝐫𝐭𝐚𝐬
│ ${chatData.notprefix? on : off} ✏️ 𝐒𝐢𝐧 𝐏𝐫𝐞𝐟𝐢𝐣𝐨
│ ${botSettings?.jadibotmd? on : off} 🤖 𝐒𝐮𝐛𝐁𝐨𝐭𝐬
│
├─「 📝 𝐔𝐒𝐎 」─
│.${command} welcome on/off
│.${command} antilink on/off
╚━━━━━━━━━━╝
`.trim();

  if (!setting) {
    return conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: `🍓 *${groupName}* 🍓\n${configList}`,
      mentions: [m.sender]
    }, { quoted: m });
  }

  const status = command === 'on';
  const reply = (name) => conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: `
🍓━━━━━━━━🍓
   ✅ 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐃𝐎 ✅
🍓━━━━━━━━🍓

╭─「 🌸 𝐂𝐀𝐌𝐁𝐈𝐎 」─╮
│
│ 🍓 𝗙𝘂𝗻𝗰𝗶𝗼𝗻 : ${name}
│ 🌸 𝗘𝘀𝘁𝗮𝗱𝗼 : ${status? '🍓 ACTIVADA' : '🌸 DESACTIVADA'}
│
╚━━━━━━━━━━╝

💖 "𝗔𝗷𝘂𝘀𝘁𝗲 𝗴𝘂𝗮𝗿𝗱𝗮𝗱𝗼 𝗲𝗻 𝗲𝗹 𝗷𝗮𝗿𝗱𝗶𝗻"
`.trim(),
    mentions: [m.sender]
  }, { quoted: m });

  switch (setting) {
    case 'antilink': case 'antilinks': case 'antienlaces':
      chatData.antiLink = status; reply('Anti Enlaces'); break;

    case 'rpg': case 'economia':
      chatData.rpg = status; chatData.economy = status; reply('Economia'); break;

    case 'gacha':
      chatData.gacha = status; reply('Gacha'); break;

    case 'modoadmin': case 'adminonly': case 'onlyadmin':
      chatData.adminonly = status; reply('Modo Admin'); break;

    case 'nsfw':
      chatData.nsfw = status; reply('NSFW'); break;

    case 'bienvenida': case 'welcome':
      chatData.welcome = status; reply('Bienvenida'); break;

    case 'reaccion': case 'reaction':
      chatData.reaction = status; reply('Reacciones'); break;

    case 'alerts': case 'alertas':
      chatData.alerts = status; reply('Alertas'); break;

    case 'notprefix': case 'noprefix': case 'sinprefijo':
      chatData.notprefix = status; reply('Sin Prefijo'); break;

    case 'serbot': case 'jadibot': case 'subbots':
      if (!isOwner) return m.reply(`🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⛔ 𝐄𝐑𝐎𝐑 」─╮
│
│ 🌸 𝗦𝗼𝗹𝗼 𝗲𝗹 𝗢𝘄𝗻𝗲𝗿
│ 🍓 𝗽𝘂𝗲𝗱𝗲 𝘂𝘀𝗮𝗿 𝗲𝘀𝘁𝗼
│
╚━━━━━━━━━━╝
`);
      if (botSettings) { botSettings.jadibotmd = status; reply('SubBots'); }
      break;

    default:
      return conn.sendMessage(m.chat, {
        image: { url: pp },
        caption: `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⚠️ 𝐄𝐑𝐎𝐑 」─╮
│
│ 🌸 𝗢𝗽𝗰𝗶𝗼𝗻 𝗻𝗼 𝘃𝗮𝗹𝗶𝗱𝗮
│
╚━━━━━━━━━━╝

${configList}`,
        mentions: [m.sender]
      }, { quoted: m });
  }
};

handler.help = ['on', 'off'];
handler.tags = ['grupo'];
handler.command = ['on', 'off', 'activar', 'desactivar'];
handler.admin = true;
handler.botAdmin = false;
export default handler