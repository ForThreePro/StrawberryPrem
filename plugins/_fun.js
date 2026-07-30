let handler = async (m, { conn, command, text }) => {
    if(!m.isGroup) return m.reply('🍓 Este comando solo funciona en grupos 🌸')

    let metadata = await conn.groupMetadata(m.chat)
    let users = metadata.participants.map(u => u.id)
    let porcentaje = Math.floor(Math.random() * 101)

    const BOX_TOP = `🍓━━━━━━━━🍓\n ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨\n🍓━━━━━━━━🍓`
    const BOX_BOT = `╚━━━━━━━━━━╝\n🌸 𝙲𝚑𝚒𝚜𝚖𝚎 𝚜𝚊𝚗𝚘 𝚢 𝚍𝚞𝚕𝚌𝚎 🍓`

    const frasesDuo = ["Somos el duo más fresa 🍓😎","Juntas somos un peligro dulce ⚠️","El duo que derrite corazones 💖","Duo de chisme nivel princesa ☕","Azúcar y canela pura 🧁","El mejor duo del server 👑🍓"]
    const frasesBro = ['"Oe amiga pásame 5 soles"','"Ya pe no seas mala"','"Después te pago juro por la fresa"','"Invítame un frappé"']
    const frasesPerro = ['Te dice "amor" y a 3 más también 🥺','Huele a infidelidad','Te deja en visto con corazón roto','Sube historias sin ti 💔']

    // RANDOM SIN REPETIR
    function getRandomUsers(cantidad) {
        let shuffled = [...users].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, cantidad)
    }

    function jidToTag(jid) {
        return '@' + jid.split('@')[0]
    }

    function findUserByName(name) {
        name = name.toLowerCase().replace('@','')
        return users.find(u => {
            let num = u.split('@')[0].toLowerCase()
            return num.includes(name)
        })
    }

    let txt = ''
    let mentions = []

    // SOLO PARA COMANDOS DE 1 PERSONA
    let target = m.mentionedJid[0] || m.quoted?.sender
    if(!target && text &&!['2p2','3p3','duo'].includes(command.toLowerCase())) {
        let possibleName = text.split(' ')[0]
        target = findUserByName(possibleName)
    }

    if(!target &&!['2p2','3p3','duo'].includes(command.toLowerCase()))
        return m.reply(`🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ❌ 𝐄𝐑𝐎𝐑 」─╮
│
│ 🌸 𝗨𝗦𝗢 :.${command} @tag
│ 💖 𝗘𝗝𝗘𝗠𝗣𝗟𝗢 :.${command} @Juanita
│ 🍓 𝗔𝗟𝗧 : 𝗥𝗲𝘀𝗽𝗼𝗻𝗱𝗲 +.${command}
│
╚━━━━━━━━━━╝

🌸 𝙼𝚎𝚗𝚌𝚒𝚘𝚗𝚊 𝚊𝚕𝚐𝚞𝚒𝚎𝚗 🍓`)

    let cmd = command.toLowerCase().replace(' ','') // quita espacios

    switch(cmd) {
        // ========== FLIRT ==========
        case 'miamor':
            mentions = [target]
            txt = `${BOX_TOP}
╭─「 💖 𝐀𝐌𝐎𝐑 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐎 」─╮
│
│ 🍓 𝗧𝗮𝗿𝗴𝗲𝘁 : ${jidToTag(target)}
│ 🌸 𝗡𝗶𝘃𝗲𝗹 : ${porcentaje}%
│ 💖 𝗗𝗶𝗮𝗴𝗻𝗼𝘀𝘁𝗶𝗰𝗼 : ${porcentaje > 70? '𝗔𝗹𝗺𝗮𝘀 𝗚𝗲𝗺𝗲𝗹𝗮𝘀 🍓' : porcentaje > 40? '𝗛𝗮𝘆 𝗤𝘂𝗶𝗺𝗶𝗰𝗮 💕' : '𝗙𝗿𝗶𝗼 𝗖𝗼𝗺𝗼 𝗛𝗶𝗲𝗹𝗼 🥶'}
${BOX_BOT}`
            break

        case 'mibebito':
            mentions = [target]
            txt = `${BOX_TOP}
╭─「 😏 𝐅𝐈𝐔 𝐅𝐈𝐔 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐎 」─╮
│
│ 🍓 𝗧𝗮𝗿𝗴𝗲𝘁 : ${jidToTag(target)} 💖
│ 🌸 𝗡𝗶𝘃𝗲𝗹 : ${porcentaje}%
│ 💖 𝗘𝘀𝘁𝗮𝗱𝗼 : 𝗠𝗲 𝗱𝗮𝘀 𝗰𝗼𝗿𝗮𝘇𝗼𝗻𝗶𝘁𝗼𝘀
${BOX_BOT}`
            break

        case 'bratz':
            mentions = [target]
            txt = `${BOX_TOP}
╭─「 👑 𝐁𝐑𝐀𝐓𝐙 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐀 」─╮
│
│ 🍓 𝗧𝗮𝗿𝗴𝗲𝘁 : ${jidToTag(target)}
│ 🌸 𝗡𝗶𝘃𝗲𝗹 : ${porcentaje}%
│ 💖 𝗘𝘀𝘁𝗶𝗹𝗼 : 𝗗𝗶𝘃𝗮 𝗹𝗲𝘃𝗲𝗹 100
${BOX_BOT}`
            break

        case 'bellaka':
            mentions = [target]
            txt = `${BOX_TOP}
╭─「 💅 𝐁𝐄𝐋𝐋𝐀𝐊𝐀 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐀 」─╮
│
│ 🍓 𝗧𝗮𝗿𝗴𝗲𝘁 : ${jidToTag(target)}
│ 🌸 𝗣𝗲𝗿𝗲𝗼 : ${porcentaje}%
│ 💖 𝗩𝗶𝗯𝗲𝘀 : 𝗣𝗲𝗿𝗲𝗮 𝗱𝗲 𝗰𝗼𝗿𝗮𝘇𝗼𝗻
${BOX_BOT}`
            break

        // ========== TROLO ==========
        case 'brother':
            mentions = [target]
            txt = `${BOX_TOP}
╭─「 🤭 𝐅𝐑𝐀𝐒𝐄 𝐏𝐈𝐓𝐔𝐂𝐀 」─╮
│
│ 🍓 𝗧𝗮𝗿𝗴𝗲𝘁 : ${jidToTag(target)}
│ 🌸 𝗙𝗿𝗮𝘀𝗲 : ${frasesBro[Math.floor(Math.random()*4)]}
${BOX_BOT}`
            break

        case 'perroinfiel':
            mentions = [target]
            txt = `${BOX_TOP}
╭─「 💔 𝐏𝐄𝐑𝐑𝐎 𝐈𝐍𝐅𝐈𝐄𝐋 」─╮
│
│ 🍓 𝗧𝗮𝗿𝗴𝗲𝘁 : ${jidToTag(target)}
│ 🌸 𝗘𝘃𝗶𝗱𝗲𝗻𝗰𝗶𝗮 : ${frasesPerro[Math.floor(Math.random()*4)]}
│ 💖 𝗡𝗶𝘃𝗲𝗹 : ${porcentaje}%
${BOX_BOT}`
            break

        case 'mentiroso': case 'mentiras':
            mentions = [target]
            txt = `${BOX_TOP}
╭─「 🤥 𝐌𝐄𝐍𝐓𝐈𝐑𝐎𝐒𝐎 」─╮
│
│ 🍓 𝗧𝗮𝗿𝗴𝗲𝘁 : ${jidToTag(target)}
│ 🌸 𝗙𝗿𝗮𝘀𝗲 : "𝗧𝗲 𝗹𝗼 𝗷𝘂𝗿𝗼 𝗽𝗼𝗿 𝗺𝗶 𝗳𝗿𝗲𝘀𝗮"
│ 💖 𝗡𝗶𝘃𝗲𝗹 : ${porcentaje}%
${BOX_BOT}`
            break

        // ========== GRUPALES RANDOM ==========
        case '2p2': // 4 PERSONAS = 2 PAREJAS
            if(users.length < 4) return m.reply('🍓 Mínimo 4 personas en el grupo 🌸')
            let cuatro = getRandomUsers(4)
            mentions = cuatro
            txt = `${BOX_TOP}
╭─「 💕 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 2𝐏2 」─╮
│
│ 🍓 𝗣𝗮𝗿𝗲𝗷𝗮 1 : ${jidToTag(cuatro[0])} ❤️ ${jidToTag(cuatro[1])}
│ 🌸 𝗣𝗮𝗿𝗲𝗷𝗮 2 : ${jidToTag(cuatro[2])} ❤️ ${jidToTag(cuatro[3])}
│
│ 💖 𝗖𝗼𝗺𝗽𝗮𝘁𝗶𝗯𝗶𝗹𝗶𝗱𝗮𝗱 : ${porcentaje}%
${BOX_BOT}`
            break

        case '3p3': // 6 PERSONAS = 3 PAREJAS
            if(users.length < 6) return m.reply('🍓 Mínimo 6 personas en el grupo 🌸')
            let seis = getRandomUsers(6)
            mentions = seis
            txt = `${BOX_TOP}
╭─「 💕 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 3𝐏3 」─╮
│
│ 🍓 𝗣𝗮𝗿𝗲𝗷𝗮 1 : ${jidToTag(seis[0])} ❤️ ${jidToTag(seis[1])}
│ 🌸 𝗣𝗮𝗿𝗲𝗷𝗮 2 : ${jidToTag(seis[2])} ❤️ ${jidToTag(seis[3])}
│ 💖 𝗣𝗮𝗿𝗲𝗷𝗮 3 : ${jidToTag(seis[4])} ❤️ ${jidToTag(seis[5])}
│
│ ✨ 𝗖𝗼𝗺𝗽𝗮𝘁𝗶𝗯𝗶𝗹𝗶𝗱𝗮𝗱 : ${porcentaje}%
${BOX_BOT}`
            break

        case 'duo': // 2 PERSONAS = 1 PAREJA
            if(users.length < 2) return m.reply('🍓 Mínimo 2 personas en el grupo 🌸')
            let dos = getRandomUsers(2)
            mentions = dos
            let frase = frasesDuo[Math.floor(Math.random() * frasesDuo.length)]
            txt = `${BOX_TOP}
╭─「 👑 𝐃𝐔𝐎 𝐑𝐀𝐍𝐃𝐎𝐌 」─╮
│
│ 🍓 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 1 : ${jidToTag(dos[0])}
│ 🌸 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 2 : ${jidToTag(dos[1])}
│
│ 💖 𝗥𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼 : ${frase}
│ ✨ 𝗖𝗼𝗺𝗽𝗮𝘁𝗶𝗯𝗶𝗹𝗶𝗱𝗮𝗱 : ${porcentaje}%
${BOX_BOT}`
            break

        default:
            return
    }

    if(txt) await conn.sendMessage(m.chat, {
        text: txt,
        mentions: mentions // SOLO ETIQUETA A LOS QUE SALIERON
    }, { quoted: m })
}

handler.help = ['miamor','mibebito','bratz','bellaka','brother','perroinfiel','mentiroso','2p2','3p3','duo']
handler.tags = ['joda']
handler.command = /^(miamor|mi amor|mibebito|bratz|bellaka|brother|perroinfiel|perro infiel|mentiroso|mentiras|2p2|3p3|duo)$/i
handler.group = true
export default handler