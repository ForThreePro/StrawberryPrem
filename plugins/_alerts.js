let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import fs from 'fs'
import path from 'path'
import { getBotConfig } from '../lib/botconfig.js'

const lidCache = new Map()
let handler = m => m

handler.before = async function (m, { conn }) {
    if (!m.messageStubType ||!m.isGroup) return

    let chat = global.db.data.chats[m.chat]
    let userss = m.messageStubParameters?.[0]
    if (!userss) return

    const realSenderRaw = await resolveLidToRealJid(m?.sender, conn, m?.chat)
    const realSender = realSenderRaw?.includes('@')? realSenderRaw : null

    const userTag = `@${userss.split('@')[0]}`
    const adminTag = realSender? `@${realSender.split('@')[0]}` : 'SYSTEM'

    const mentions = [userss]
    if (realSender) mentions.push(realSender)

    const context = {
        contextInfo: {
            mentionedJid: mentions,
            isForwarded: true,
            forwardingScore: 999
        }
    }

    // 1. FOTO DEL USER > 2. FOTO DEL GRUPO > 3. DEFAULT
    let banner;
    try {
        banner = await conn.profilePictureUrl(userss, 'image')
    } catch {
        try {
            banner = await conn.profilePictureUrl(m.chat, 'image')
        } catch {
            banner = 'https://files.evogb.win/ksYsKo.jpg'
        }
    }

    // DISEÑO STRAWBERRY PROMOTE 🍓
    const admingp = `
🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 👑 𝐀𝐒𝐂𝐄𝐍𝐒𝐎 𝐃𝐄 𝐑𝐀𝐍𝐆𝐎 」─╮
│
│ 🍓 𝗣𝗿𝗶𝗻𝗰𝗲𝘀𝗮 : ${userTag}
│ 🌸 𝗘𝘀𝘁𝗮𝗱𝗼 : ✅ 𝐀𝐝𝐦𝐢𝐧 𝐀𝐬𝐢𝐠𝐧𝐚𝐝𝐨
│ 💖 𝗢𝘁𝗼𝗿𝗴𝗮𝗱𝗼 𝗽𝗼𝗿 : ${adminTag}
│
╠──「 ✨ 𝐏𝐄𝐑𝐌𝐈𝐒𝐎𝐒 𝐑𝐄𝐀𝐋𝐄𝐒 」──╣
│ [✓] Expulsar y Promover
│ [✓] Editar Info del Grupo
│ [✓] Cambiar Configuración
│ [✓] Enviar Anuncios
╚━━━━━━━━━━╝

🌸 𝙻𝚊 𝚍𝚞𝚕𝚣𝚞𝚛𝚊 𝚌𝚘𝚗 𝚊𝚌𝚝𝚒𝚝𝚞𝚍 𝚕𝚕𝚎𝚐𝚘 🌸
`.trim()

    // DISEÑO STRAWBERRY DEMOTE 🍓
    const noadmingp = `
🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 🔒 𝐃𝐄𝐒𝐂𝐄𝐍𝐒𝐎 𝐃𝐄 𝐑𝐀𝐍𝐆𝐎 」─╮
│
│ 🍓 𝗣𝗿𝗶𝗻𝗰𝗲𝘀𝗮 : ${userTag}
│ 🌸 𝗘𝘀𝘁𝗮𝗱𝗼 : ❌ 𝐑𝐚𝐧𝐠𝐨 𝐑𝐞𝐯𝐨𝐜𝐚𝐝𝐨
│ 💖 𝗥𝗲𝘃𝗼𝗰𝗮𝗱𝗼 𝗽𝗼𝗿 : ${adminTag}
│
╠──「 🥺 𝐀𝐂𝐄𝐒𝐎 𝐋𝐈𝐌𝐈𝐓𝐀𝐃𝐎 」──╣
│ [✗] Sin permisos de admin
│ [✗] Comandos de admin bloqueados
│ [✗] Modo miembro normal
╚━━━━━━━━━━╝

🌸 𝚂𝚒𝚗 𝚌𝚘𝚛𝚘𝚗𝚊, 𝚙𝚎𝚛𝚘 𝚜𝚒𝚐𝚞𝚎𝚜 𝚜𝚒𝚎𝚗𝚍𝚘 𝚎𝚜𝚙𝚎𝚌𝚒𝚊𝚕 🌸
`.trim()

    // LIMPIAR SESSION SI KICKEAN BOT
    if (chat.detect && m.messageStubType == 2) {
        const uniqid = (m.isGroup? m.chat : m.sender).split('@')[0]
        const sessionPath = `./sessions/`
        try {
            for (const file of await fs.readdir(sessionPath)) {
                if (file.includes(uniqid)) {
                    await fs.unlink(path.join(sessionPath, file))
                }
            }
        } catch {}
    }

    // PROMOTE
    if (chat.alerts && m.messageStubType == 29) {
        await conn.sendMessage(m.chat, {
            image: { url: banner },
            caption: admingp,
      ...context
        }, { quoted: null })
        return
    }

    // DEMOTE
    if (chat.alerts && m.messageStubType == 30) {
        await conn.sendMessage(m.chat, {
            image: { url: banner },
            caption: noadmingp,
      ...context
        }, { quoted: null })
        return
    }

    if (m.messageStubType == 2) return
}

export default handler

async function resolveLidToRealJid(lid, conn, groupChatId, maxRetries = 3, retryDelay = 60000) {
    const inputJid = lid?.toString?.() || ''
    if (!inputJid.endsWith("@lid") ||!groupChatId?.endsWith("@g.us")) {
        return inputJid.includes("@")? inputJid : `${inputJid}@s.whatsapp.net`
    }

    if (lidCache.has(inputJid)) {
        return lidCache.get(inputJid)
    }

    const lidToFind = inputJid.split("@")[0]
    let attempts = 0

    while (attempts < maxRetries) {
        try {
            const metadata = await conn?.groupMetadata(groupChatId)
            if (!metadata?.participants) throw new Error()

            for (const participant of metadata.participants) {
                try {
                    if (!participant?.jid) continue
                    const contactDetails = await conn?.onWhatsApp(participant.jid)
                    if (!contactDetails?.[0]?.lid) continue

                    const possibleLid = contactDetails[0].lid.split("@")[0]
                    if (possibleLid === lidToFind) {
                        lidCache.set(inputJid, participant.jid)
                        return participant.jid
                    }
                } catch {}
            }
            lidCache.set(inputJid, inputJid)
            return inputJid
        } catch {
            if (++attempts >= maxRetries) {
                lidCache.set(inputJid, inputJid)
                return inputJid
            }
            await new Promise(r => setTimeout(r, retryDelay))
        }
    }
    return inputJid
}