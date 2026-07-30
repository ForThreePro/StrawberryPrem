import { WAMessageStubType } from '@whiskeysockets/baileys';

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType ||!m.isGroup) return true;

    const chat = global.db.data.chats[m.chat];
    if (!chat.welcome) return true;

    const target = m.messageStubParameters?.[0];
    if (!target) return true;

    const userData = global.db.data.users[target] || {};
    const targetName = userData.name || await conn.getName(target) || `@${target.split('@')[0]}`;

    const actor = m.participant || m.key.participant || m.messageStubParameters?.[1] || null;

    let memberCount = participants.length;
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) memberCount++;
    if ([WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_PARTICIPANT_LEAVE].includes(m.messageStubType)) memberCount--;

    const actionText = {
        [WAMessageStubType.GROUP_PARTICIPANT_ADD]:
            actor? `𝗜𝗻𝘃𝗶𝘁𝗮𝗱𝗼 𝗽𝗼𝗿 @${actor.split('@')[0]} 🍓` : '𝗡𝘂𝗲𝘃𝗮 𝗽𝗿𝗶𝗻𝗰𝗲𝘀𝗮 𝗲𝗻 𝗲𝗹 𝗷𝗮𝗿𝗱𝗶𝗻',

        [WAMessageStubType.GROUP_PARTICIPANT_REMOVE]:
            actor? `𝗘𝘅𝗽𝘂𝗹𝘀𝗮𝗱𝗼 𝗽𝗼𝗿 @${actor.split('@')[0]} 🌸` : '𝗙𝘂𝗲 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗱𝗼',

        [WAMessageStubType.GROUP_PARTICIPANT_LEAVE]:
            '𝗦𝗮𝗹𝗶𝗼 𝗱𝗲𝗹 𝗷𝗮𝗿𝗱𝗶𝗻 🥺'
    };

    const format = (text) => {
        return text
       .replace('@user', `@${target.split('@')[0]}`)
       .replace('@name', targetName)
       .replace('@group', groupMetadata.subject)
       .replace('@desc', groupMetadata.desc?.toString() || '𝗦𝗶𝗻 𝗱𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶𝗼𝗻')
       .replace('%users', memberCount)
       .replace('@action', actionText[m.messageStubType] || '')
       .replace('@date', new Date().toLocaleString('es-PE'));
    };

    // DETECTAR SI TIENE FOTO O NO
    let ppUrl;
    try {
        ppUrl = await conn.profilePictureUrl(target, 'image');
    } catch {
        // Si no tiene foto, usa banner de fresas
        ppUrl = 'https://i.imgur.com/8vH3QzK.jpg'
    }

    const welcome = format(`
🍓━━━━━━━━🍓
   ✨ 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐀 ✨
🍓━━━━━━━━🍓

🆔 𝗡𝗼𝗺𝗯𝗿𝗲 : @name
👥 𝗚𝗿𝘂𝗽𝗼 : @group

📡 𝗘𝘀𝘁𝗮𝗱𝗼 : @action

╭─「 🍓 𝐈𝐍𝐅𝐎 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎 」─╮
│ 📜 𝗗𝗲𝘀𝗰 : @desc
│ 👥 𝗠𝗶𝗲𝗺𝗯𝗿𝗼𝘀 : %users
│ 💖 𝗥𝗲𝗰𝘂𝗲𝗿𝗱𝗮 : 𝗟𝗲 𝗿𝗲𝗴𝗹𝗮𝘀 𝗽𝗼𝗿𝗳𝗮
╰───────────────────────╯

🌸 "𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗮 𝗮𝗹 𝗷𝗮𝗿𝗱𝗶𝗻 𝗱𝗲 𝗳𝗿𝗲𝘀𝗮𝘀" 🍓
`.trim());

    const bye = format(`
🍓━━━━━━━━🍓
   🔻 𝐇𝐀𝐒𝐓𝐀 𝐋𝐔𝐄𝐆𝐎 🔻
🍓━━━━━━━━🍓

🆔 𝗡𝗼𝗺𝗯𝗿𝗲 : @name
👥 𝗚𝗿𝘂𝗽𝗼 : @group

📡 𝗘𝘀𝘁𝗮𝗱𝗼 : @action

╭─「 🌸 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│ 👥 𝗠𝗶𝗲𝗺𝗯𝗿𝗼𝘀 𝗮𝗰𝘁𝘂𝗮𝗹𝗲𝘀 : %users
│ 🕐 𝗦𝗮𝗹𝗶𝗱𝗮 : @date
╰────────────────╯

🌸 "𝗨𝗻𝗮 𝗳𝗹𝗼𝗿 𝗺𝗲𝗻𝗼𝘀 𝗲𝗻 𝗲𝗹 𝗷𝗮𝗿𝗱𝗶𝗻" 🍓
`.trim());

    const mentions = [target];
    if (actor) mentions.push(actor);

    const context = {
        contextInfo: {
            mentionedJid: mentions,
            isForwarded: true
        }
    };

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        await conn.sendMessage(m.chat, {
            image: { url: ppUrl },
            caption: welcome,
       ...context
        });
    }

    if ([WAMessageStubType.GROUP_PARTICIPANT_LEAVE, WAMessageStubType.GROUP_PARTICIPANT_REMOVE].includes(m.messageStubType)) {
        await conn.sendMessage(m.chat, {
            image: { url: ppUrl },
            caption: bye,
       ...context
        });
    }
}