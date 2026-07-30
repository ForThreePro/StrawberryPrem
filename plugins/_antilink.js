let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
let linkRegex1 = /whatsapp.com\/channel\/([0-9A-Za-z]{20,24})/i;

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants }) {
    if (!m.isGroup) return 
    if (isAdmin || isOwner || m.fromMe || isROwner) return

    let chat = global.db.data.chats[m.chat];
    const user = `@${m.sender.split`@`[0]}`;
    const groupAdmins = participants.filter(p => p.admin);

    const isGroupLink = linkRegex.exec(m.text) || linkRegex1.exec(m.text);

    if (chat.antiLink && isGroupLink && !isAdmin) {
        // SI EL LINK ES DEL MISMO GRUPO NO HACE NADA
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat).catch(() => "")}`;
            if (m.text.includes(linkThisGroup)) return !0;
        }

        // AVISO STRAWBERRY 🍓
        await conn.sendMessage(m.chat, { 
            text: `
🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 🚨 𝐀𝐋𝐄𝐑𝐓𝐀 𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊 」─╮
│
│ 🍓 𝗗𝗲𝘁𝗲𝗰𝘁𝗮𝗱𝗼 : Enlace Prohibido
│ 🌸 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 : ${user}
│ 💖 𝗔𝗰𝗰𝗶𝗼𝗻 : ⚠️ Eliminando Mensaje...
│
╚━━━━━━━━━━╝

🌸 𝙻𝚘𝚜 𝚎𝚗𝚕𝚊𝚌𝚎𝚜 𝚎𝚡𝚝𝚎𝚛𝚗𝚘𝚜 𝚗𝚘 𝚎𝚜𝚝𝚊𝚗 𝚙𝚎𝚛𝚖𝚒𝚝𝚒𝚍𝚘𝚜 🌸
`.trim(), 
            mentions: [m.sender] 
        }, { quoted: m });

        // SI NO ES ADMIN EL BOT
        if (!isBotAdmin) {
            return conn.sendMessage(m.chat, { 
                text: `
🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 🥺 𝐍𝐄𝐂𝐄𝐒𝐈𝐓𝐎 𝐀𝐘𝐔𝐃𝐀 」─╮
│
│ No tengo permisos para eliminar 💔
│ Por favor denme Admin para proteger
│ al grupo de enlaces
│
╚━━━━━━━━━━╝

🌸 𝙰𝚢𝚞𝚍𝚎𝚗𝚖𝚎 𝚊 𝚌𝚞𝚒𝚍𝚊𝚛 𝚎𝚕 𝚐𝚛𝚞𝚙𝚘 🌸
`.trim(), 
                mentions: groupAdmins.map(v => v.id) 
            }, { quoted: m });
        }

        // ELIMINAR Y KICK
        if (isBotAdmin) {
            await conn.sendMessage(m.chat, { delete: m.key });
            await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        }
    }
    return !0;
}