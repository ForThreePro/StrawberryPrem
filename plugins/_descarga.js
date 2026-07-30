import axios from 'axios'
import fetch from "node-fetch"
import yts from 'yt-search'

let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 🍓 𝐌𝐎𝐃𝐔𝐋𝐎 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒 」─╮
│
│ 🌸 𝗘𝘀𝘁𝗮𝗱𝗼 : 𝐎𝐧𝐥𝐢𝐧𝐞
│ 💖 𝗠𝗼𝗱𝗼 : Dulce y Rápido
│
╠──「 🎵 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 」──╣
│ 🍓 ${usedPrefix}play nombre → Audio
│ 🍓 ${usedPrefix}play2 nombre → Video
│ 🍓 ${usedPrefix}ytmp3 link → Audio Directo
│ 🍓 ${usedPrefix}ytmp4 link → Video 720p
│
╠──「 🌸 𝐒𝐎𝐂𝐈𝐀𝐋 」──╣
│ 💖 ${usedPrefix}spotify nombre → Audio
│ 💖 ${usedPrefix}tiktok link → Video
│ 💖 ${usedPrefix}tiktoksearch txt → Buscar
│ 💖 ${usedPrefix}ig link → Instagram
│ 💖 ${usedPrefix}fb link → Facebook
│ 💖 ${usedPrefix}mediafire link → Archivo
│
╚━━━━━━━━━━╝

🌸 𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊 𝚌𝚘𝚗 𝚊𝚖𝚘𝚛 𝚢 𝚏𝚛𝚎𝚜𝚊𝚜 🍓
`, m)

    await m.react('⏳')
    const keyEvo = Buffer.from('ZWt1c2Fz', 'base64').toString('utf-8').split('').reverse().join('')
    const keySasuke = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')

    try {
        // ===== PLAY / PLAY2 YOUTUBE BUSQUEDA =====
        if (/^(play|play2)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let isVideo = command === 'play2'
            let apiUrl = isVideo
           ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐘𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ${isVideo? '🎬' : '🎵'} 𝐃𝐀𝐓𝐎𝐒 」─╮
│
│ 🍓 𝗧𝗶𝘁𝘂𝗹𝗼 : ${vid.title}
│ 🌸 𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻 : ${vid.timestamp}
│ 💖 𝗔𝘂𝘁𝗼𝗿 : ${vid.author.name}
│ ✨ 𝗩𝗶𝘀𝘁𝗮𝘀 : ${vid.views.toLocaleString()}
│ 🍓 𝗙𝗼𝗿𝗺𝗮𝘁𝗼 : ${isVideo? 'MP4 720p' : 'MP3 320kbps'}
│
╚━━━━━━━━━━╝

🌸 𝙴𝚡𝚝𝚛𝚊𝚢𝚎𝚗𝚍𝚘 𝚝𝚞 𝚏𝚛𝚎𝚜𝚊 𝚍𝚎 𝚖𝚞𝚜𝚒𝚌𝚊 🍓`

            await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== YTMP3 / YTMP4 DIRECTO =====
        if (/^(ytmp3|ytmp4)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('⏳')

            let isVideo = command === 'ytmp4'
            let apiUrl = isVideo
            ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐘𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ${isVideo? '🎬' : '🎵'} 𝐃𝐈𝐑𝐄𝐂𝐓𝐎 」─╮
│
│ 🍓 𝗧𝗶𝘁𝘂𝗹𝗼 : ${vid.title}
│ 🌸 𝗙𝗼𝗿𝗺𝗮𝘁𝗼 : ${isVideo? 'MP4 720p' : 'MP3'}
│ 💖 𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻 : ${vid.timestamp}
│ ✨ 𝗩𝗶𝘀𝘁𝗮𝘀 : ${vid.views.toLocaleString()}
│
╚━━━━━━━━━━╝

🌸 𝚃𝚞 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊 𝚎𝚜𝚝𝚊 𝚕𝚒𝚜𝚝𝚊 🍓`

            await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== SPOTIFY =====
        if (/^(spotify)$/i.test(command)) {
            let searchRes = await fetch(`https://api.evogb.org/search/spotify?query=${encodeURIComponent(text)}&key=${keySasuke}`)
            let searchData = await searchRes.json()
            if (!searchData.status ||!searchData.result[0]) throw 'SP_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let song = searchData.result[0]
            let dlRes = await fetch(`https://api.evogb.org/dl/spotify?url=${encodeURIComponent(song.link)}&key=${keySasuke}`)
            let dlData = await dlRes.json()
            if (!dlData.status) throw 'SP_DL_ERROR'

            let cap = `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐒𝐏𝐎𝐓𝐈𝐅𝐘 ✨
🍓━━━━━━━━🍓

╭─「 🎵 𝐂𝐀𝐍𝐂𝐈𝐎𝐍 」─╮
│
│ 🍓 𝗧𝗶𝘁𝘂𝗹𝗼 : ${dlData.data.name}
│ 🌸 𝗔𝗿𝘁𝗶𝘀𝘁𝗮 : ${dlData.data.artist}
│ 💖 𝗔𝗹𝗯𝘂𝗺 : ${dlData.data.album}
│ ✨ 𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻 : ${dlData.data.duration}
│ 🍓 𝗔𝗻𝗼 : ${dlData.data.year}
│
╚━━━━━━━━━━╝

🌸 𝙼𝚞𝚜𝚒𝚌𝚊 𝚌𝚘𝚗 𝚜𝚊𝚋𝚘𝚛 𝚊 𝚏𝚛𝚎𝚜𝚊 🍓`

            await conn.sendMessage(m.chat, { image: { url: dlData.data.image }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, { audio: { url: dlData.data.url }, mimetype: 'audio/mpeg', fileName: `${dlData.data.name}.mp3` }, { quoted: m })
            return await m.react('✅')
        }

        // ===== TIKTOK =====
        if (/^(tiktok|tiktoksearch)$/i.test(command)) {
            if (command === 'tiktoksearch') {
                let res = await (await fetch(`https://api.evogb.org/search/tiktok?query=${text}&key=${keySasuke}`)).json()
                let video = res.data[0]
                if (!video) throw 'TT_NOT_FOUND'

                let caption = `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐓𝐓 ✨
🍓━━━━━━━━🍓

╭─「 📱 𝐕𝐈𝐃𝐄𝐎 」─╮
│
│ 🍓 𝗧𝗶𝘁𝘂𝗹𝗼 : ${video.title}
│ 🌸 𝗔𝘂𝘁𝗼𝗿 : ${video.author.nickname}
│ 💖 𝗩𝗶𝘀𝘁𝗮𝘀 : ${video.play_count.toLocaleString()}
│ ✨ 𝗟𝗶𝗸𝗲𝘀 : ${video.digg_count.toLocaleString()}
│
╚━━━━━━━━━━╝

🌸 𝚅𝚒𝚍𝚎𝚘 𝚎𝚗𝚌𝚘𝚗𝚝𝚛𝚊𝚍𝚘 🍓`
                await conn.sendFile(m.chat, video.dl, 'tiktok.mp4', caption, m)
            } else {
                let res = await (await fetch(`https://api.evogb.org/dl/tiktok?url=${text}&key=${keySasuke}`)).json()
                let data = res.data
                if (!data) throw 'TT_DL_ERROR'

                let caption = `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐓𝐓 ✨
🍓━━━━━━━━🍓

╭─「 📱 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 」─╮
│
│ 🍓 𝗧𝗶𝘁𝘂𝗹𝗼 : ${data.title}
│ 🌸 𝗔𝘂𝘁𝗼𝗿 : ${data.author.nickname}
│
╚━━━━━━━━━━╝

🌸 𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊 𝚌𝚘𝚖𝚙𝚕𝚎𝚝𝚊 🍓`
                await conn.sendFile(m.chat, Array.isArray(data.dl)? data.dl[0] : data.dl, 'tiktok.mp4', caption, m)
            }
            return await m.react('✅')
        }

        // ===== INSTAGRAM =====
        if (/^(ig|instagram)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/instagram?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'IG_ERROR'
            let media = data.data[0]
            let type = media.type === 'video'? '🎬 𝐕𝐈𝐃𝐄𝐎' : '🖼️ 𝐈𝐌𝐀𝐆𝐄𝐍'

            let cap = `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐈𝐆 ✨
🍓━━━━━━━━🍓

╭─「 📸 𝐂𝐎𝐍𝐓𝐄𝐍𝐈𝐃𝐎 」─╮
│
│ 🍓 𝗧𝗶𝗽𝗼 : ${type}
│ 🌸 𝗘𝘀𝘁𝗮𝗱𝗼 : 𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨
│
╚━━━━━━━━━━╝

🌸 𝚃𝚞 𝚌𝚘𝚗𝚝𝚎𝚗𝚒𝚍𝚘 𝚕𝚒𝚜𝚝𝚘 🍓`

            await conn.sendMessage(m.chat, {
                [media.type === 'video'? 'video' : 'image']: { url: media.url },
                mimetype: media.type === 'video'? 'video/mp4' : 'image/jpeg',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== FACEBOOK =====
        if (/^(fb|facebook)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/facebook?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'FB_ERROR'
            let video = data.resultados[0]

            let cap = `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐅𝐁 ✨
🍓━━━━━━━━🍓

╭─「 📘 𝐅𝐀𝐂𝐄𝐁𝐎𝐊 」─╮
│
│ 🍓 𝗖𝗮𝗹𝗶𝗱𝗮𝗱 : ${video.calidad || '𝗛𝗗'}
│ 🌸 𝗘𝘀𝘁𝗮𝗱𝗼 : 𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨
│
╚━━━━━━━━━━╝

🌸 𝚅𝚒𝚍𝚎𝚘 𝚎𝚡𝚝𝚛𝚊𝚒𝚍𝚘 🍓`

            await conn.sendMessage(m.chat, {
                video: { url: video.url },
                mimetype: 'video/mp4',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== MEDIAFIRE =====
        if (/^(mediafire|mf|mediafiredl)$/i.test(command)) {
            let response = await fetch(`https://api.evogb.org/dl/mediafire?url=${encodeURIComponent(text)}&key=${keySasuke}`)
            let result = await response.json()
            if (!result.status ||!result.data) throw 'MF_ERROR'

            let { name, size, date, dl } = result.data
            let caption = `🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐅𝐈𝐋𝐄 ✨
🍓━━━━━━━━🍓

╭─「 📦 𝐀𝐑𝐂𝐇𝐈𝐕𝐎 」─╮
│
│ 🍓 𝗡𝗼𝗺𝗯𝗿𝗲 : ${name}
│ 🌸 𝗧𝗮𝗺𝗮𝗻𝗼 : ${size}
│ 💖 𝗙𝗲𝗰𝗵𝗮 : ${date}
│
╚━━━━━━━━━━╝

🌸 𝙰𝚛𝚌𝚑𝚒𝚟𝚘 𝚎𝚡𝚝𝚛𝚊𝚒𝚍𝚘 🍓`

            await conn.sendFile(m.chat, dl, name, caption, m)
            return await m.react('✅')
        }

    } catch (e) {
        console.error(e)
        await m.react('❌')
        let msgs = {
            YT_NOT_FOUND: '🍓 𝙽𝚘 𝚎𝚗𝚌𝚘𝚗𝚝𝚛𝚎 𝚎𝚕 𝚟𝚒𝚍𝚎𝚘 🌸',
            YT_DL_ERROR: '🍓 𝙴𝚛𝚘𝚛 𝚎𝚗 𝚈𝚘𝚞𝚝𝚞𝚋𝚎 🌸',
            SP_NOT_FOUND: `🍓 𝙽𝚘 𝚑𝚊𝚢 𝚛𝚎𝚜𝚞𝚕𝚝𝚊𝚍𝚘𝚜: ${text} 🌸`,
            SP_DL_ERROR: '🍓 𝙴𝚛𝚛𝚘𝚛 𝚎𝚗 𝚂𝚙𝚘𝚝𝚒𝚏𝚢 🌸',
            TT_NOT_FOUND: '🍓 𝙽𝚘 𝚑𝚊𝚢 𝚛𝚎𝚜𝚞𝚕𝚝𝚊𝚍𝚘𝚜 𝚃𝚃 🌸',
            TT_DL_ERROR: '🍓 𝙴𝚛𝚛𝚘𝚛 𝚎𝚗 𝚃𝚒𝚔𝚝𝚘𝚔 🌸',
            IG_ERROR: '🍓 𝙴𝚛𝚘𝚛 𝚎𝚗 𝙸𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖 🌸',
            FB_ERROR: '🍓 𝙴𝚛𝚘𝚛 𝚎𝚗 𝙵𝚊𝚌𝚎𝚋𝚘𝚔 🌸',
            MF_ERROR: '🍓 𝙰𝚛𝚌𝚑𝚒𝚟𝚘 𝚗𝚘 𝚎𝚗𝚌𝚘𝚗𝚝𝚛𝚊𝚍𝚘 🌸'
        }
        m.reply(`🍓━━━━━━━━🍓
   ✨ 𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 ✨
🍓━━━━━━━━🍓

╭─「 ❌ 𝐄𝐑𝐎𝐑 」─╮
│
│ 🌸 𝗗𝗲𝘁𝗮𝗹𝗲 : ${msgs[e] || '🍓 𝙴𝚛𝚛𝚘𝚛 𝚒𝚗𝚎𝚜𝚙𝚎𝚛𝚊𝚍𝚘 🌸'}
│ 💖 𝗔𝗰𝗰𝗶𝗼𝗻 : 𝚅𝚎𝚛𝚒𝚏𝚒𝚌𝚊 𝚎𝚕 𝚎𝚗𝚕𝚊𝚌𝚎
│
╚━━━━━━━━━━╝

🌸 𝚅𝚞𝚎𝚕𝚟𝚎 𝚊 𝚒𝚗𝚝𝚎𝚗𝚝𝚊𝚛 🍓`)
    }
}

handler.help = ['play', 'play2', 'ytmp3', 'ytmp4', 'spotify', 'tiktok', 'tiktoksearch', 'ig', 'fb', 'mediafire']
handler.tags = ['downloader']
handler.command = /^(play|play2|ytmp3|ytmp4|spotify|tiktok|tiktoksearch|ig|instagram|fb|facebook|mediafire|mf|mediafiredl)$/i

export default handler