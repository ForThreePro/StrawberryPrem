import { getBotConfig } from '../lib/botconfig.js'

const handler = async (m, { conn, command }) => {
  try {
    const jid = (id) => id?.includes('@')? id : `${id}@s.whatsapp.net`
    let who =
      m.mentionedJid?.[0] ||
      m.msg?.contextInfo?.mentionedJid?.[0] ||
      m.quoted?.sender ||
      null

    if (!who) {
      return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ❌ 𝐈𝐍𝐒𝐓𝐑𝐔𝐂𝐈𝐎𝐍 」─╮
│
│ 🌸 𝗠𝗲𝗻𝗰𝗶𝗼𝗻𝗮 𝗼 𝗰𝗶𝘁𝗮 𝗮𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼
│ 🍓 𝗘𝗷𝗲𝗺𝗽𝗹𝗼 :.${command} @usuario
│
╚━━━━━━━━━━╝
`, m)
    }

    who = jid(who)

    const groupMetadata = await conn.groupMetadata(m.chat)
    const participant = groupMetadata.participants.find(
      p => jid(p.id || p.jid) === who
    )

    const isPromote = command === 'promote'
    const protectedOwners = global.owner.map(
      o => o[0] + '@s.whatsapp.net'
    )
    const targetName = await conn.getName(who)

    if (isPromote) {
      if (participant?.admin) {
        return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⚠️ 𝐀𝐕𝐈𝐒𝐎 」─╮
│
│ 🌸 @${who.split('@')[0]} 𝘆𝗮 𝗲𝘀 𝗮𝗱𝗺𝗶𝗻
│ 🍓 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗮𝘀𝗰𝗲𝗻𝗱𝗲𝗿 𝗱𝗼𝘀 𝘃𝗲𝗰𝗲𝘀
│
╚━━━━━━━━━━╝
`, m, { mentions: [who] })
      }

      await conn.groupParticipantsUpdate(m.chat, [who], 'promote')

      return conn.reply(m.chat, `🍓━━━━━━━━🍓
   👑 𝐀𝐒𝐂𝐄𝐍𝐒𝐎 𝐄𝐉𝐄𝐂𝐔𝐓𝐀𝐃𝐎 👑
🍓━━━━━━━━🍓

╭─「 🌸 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│
│ 🍓 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 : @${who.split('@')[0]}
│ 🌸 𝗡𝘂𝗲𝘃𝗼 𝗥𝗮𝗻𝗴𝗼 : 𝗔𝗗𝗠𝗜𝗡𝗜𝗦𝗧𝗥𝗔𝗗𝗢𝗥𝗔
│ 💖 𝗣𝗼𝗿 : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

🌸 "𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗮 𝗮𝗹 𝗲𝗾𝘂𝗶𝗽𝗼 𝗱𝗲 𝗮𝗱𝗺𝗶𝗻𝘀" 🍓
`, m, { mentions: [who, m.sender] })
    }

    // DEMOTE
    if (protectedOwners.includes(who)) {
      return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⛔ 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 🌸 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗱𝗲𝗴𝗿𝗮𝗱𝗮𝗿
│ 🍓 𝗮𝗹 𝗢𝘄𝗻𝗲𝗿 𝗱𝗲𝗹 𝗕𝗼𝘁
│
╚━━━━━━━━━━╝
`, m)
    }

    if (!participant?.admin) {
      return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⚠️ 𝐀𝐕𝐈𝐒𝐎 」─╮
│
│ 🌸 @${who.split('@')[0]} 𝗻𝗼 𝗲𝘀 𝗮𝗱𝗺𝗶𝗻
│ 🍓 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗱𝗲𝗴𝗿𝗮𝗱𝗮𝗿
│
╚━━━━━━━━━━╝
`, m, { mentions: [who] })
    }

    if (who === groupMetadata.owner) {
      return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⛔ 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 🌸 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗱𝗲𝗴𝗿𝗮𝗱𝗮𝗿
│ 🍓 𝗮𝗹 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 𝗱𝗲𝗹 𝗚𝗿𝘂𝗽𝗼
│
╚━━━━━━━━━━╝
`, m)
    }

    if (who === conn.user.jid) {
      return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ⛔ 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 🌸 𝗡𝗼 𝗽𝘂𝗲𝗱𝗼 𝗱𝗲𝗴𝗿𝗮𝗱𝗮𝗿𝗺𝗲
│ 🍓 𝗮 𝗺𝗶 𝗺𝗶𝘀𝗺𝗮
│
╚━━━━━━━━━━╝
`, m)
    }

    await conn.groupParticipantsUpdate(m.chat, [who], 'demote')

    return conn.reply(m.chat, `🍓━━━━━━━━🍓
   🔻 𝐃𝐄𝐆𝐑𝐀𝐃𝐀𝐂𝐈𝐎𝐍 𝐄𝐉𝐄𝐂𝐔𝐓𝐀𝐃𝐀 🔻
🍓━━━━━━━━🍓

╭─「 🌸 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│
│ 🍓 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 : @${who.split('@')[0]}
│ 🌸 𝗡𝘂𝗲𝘃𝗼 𝗥𝗮𝗻𝗴𝗼 : 𝗠𝗜𝗘𝗠𝗕𝗥𝗢
│ 💖 𝗣𝗼𝗿 : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

🌸 "𝗥𝗲𝗴𝗿𝗲𝘀𝗼 𝗮𝗹 𝗷𝗮𝗿𝗱𝗶𝗻 𝗱𝗲 𝗳𝗿𝗲𝘀𝗮𝘀" 🍓
`, m, { mentions: [who, m.sender] })

  } catch (e) {
    conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ❌ 𝐄𝐑𝐎𝐑 」─╮
│
│ 🌸 𝗗𝗲𝘁𝗮𝗹𝗲 : ${e.message}
│
╚━━━━━━━━━━╝
`, m)
  }
}

handler.help = ['promote', 'demote']
handler.tags = ['grupo']
handler.command = ['promote', 'demote', 'promover', 'degradar']
handler.admin = true
handler.botAdmin = true

export default handler