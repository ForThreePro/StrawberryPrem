let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ❌ 𝐈𝐍𝐒𝐓𝐑𝐔𝐂𝐈𝐎𝐍 」─╮
│
│ 🌸 𝗖𝗶𝘁𝗮 𝗲𝗹 𝗺𝗲𝗻𝘀𝗮𝗷𝗲 𝗾𝘂𝗲
│ 🍓 𝗱𝗲𝘀𝗲𝗮𝘀 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿
│
╚━━━━━━━━━━╝

💖 𝗘𝗷𝗲𝗺𝗽𝗹𝗼 : .${command} + 𝗿𝗲𝘀𝗽𝗼𝗻𝗱𝗲𝗿 𝗺𝗲𝗻𝘀𝗮𝗷𝗲
`, m)

try {
    // Caso 1: Mensaje de otro usuario
    let key = m.quoted.vM.key
    await conn.sendMessage(m.chat, { delete: key })
    await conn.sendMessage(m.chat, { react: { text: '🗑️🍓', key: m.key } })

} catch (e) {
    // Caso 2: Fallback si falla
    try {
        let delet = m.quoted.vM.key
        await conn.sendMessage(m.chat, { delete: delet })
        await conn.sendMessage(m.chat, { react: { text: '✅🌸', key: m.key } })
    } catch {
        return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ❌ 𝐄𝐑𝐎𝐑 」─╮
│
│ 🌸 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗱𝗼 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿
│ 🍓 𝗲𝗹 𝗺𝗲𝗻𝘀𝗮𝗷𝗲
│
╚━━━━━━━━━━╝

💖 𝗩𝗲𝗿𝗶𝗳𝗶𝗰𝗮 𝗾𝘂𝗲 𝘀𝗲𝗮 𝗿𝗲𝗰𝗶𝗲𝗻𝘁𝗲
`, m)
    }
}}

handler.help = ['delete']
handler.tags = ['grupo']
handler.command = ['del','delete','d','borrar']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler