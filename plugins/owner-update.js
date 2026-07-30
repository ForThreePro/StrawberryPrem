import { execSync } from 'child_process'

var handler = async (m, { conn, text }) => {

try {

const stdout = execSync('git pull' + (m.fromMe && text ? ' + text : ''));
let messager = stdout.toString()

if (messager.includes('Already up to date')) messager = '🍓━━━━━━━━🍓\n   ✅ 𝐘𝐀 𝐄𝐒𝐓𝐎𝐘 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐃𝐀 ✅\n🍓━━━━━━━━🍓\n\n🌸 𝗘𝘀𝘁𝗼𝘆 𝗲𝗻 𝗹𝗮 𝘂𝗹𝘁𝗶𝗺𝗮 𝘃𝗲𝗿𝘀𝗶𝗼𝗻 𝗱𝗲𝗹 𝗷𝗮𝗿𝗱𝗶𝗻 🍓'

if (messager.includes('Updating')) messager = '🍓━━━━━━━━🍓\n   ⏳ 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐍𝐃𝐎 ⏳\n🍓━━━━━━━━🍓\n\n🌸 𝗣𝗿𝗼𝗰𝗲𝘀𝗮𝗻𝗱𝗼... 𝗲𝘀𝗽𝗲𝗿𝗮 𝘂𝗻 𝗺𝗼𝗺𝗲𝗻𝘁𝗼\n' + stdout.toString()
conn.reply(m.chat, messager, m)

} catch { 
try {

const status = execSync('git status --porcelain')

if (status.length > 0) {
const conflictedFiles = status.toString().split('\n').filter(line => line.trim() !== '').map(line => {
if (line.includes('.npm/') || line.includes('.cache/') || line.includes('tmp/') || line.includes("lib/datos.json") || line.includes('database.json') || line.includes('sessions/') || line.includes('npm-debug.log')) {
return null
}
return '*→ ' + line.slice(3) + '*'}).filter(Boolean)
if (conflictedFiles.length > 0) {
const errorMessage = `🍓━━━━━━━━🍓\n   ❌ 𝐍𝐎 𝐒𝐄 𝐏𝐔𝐄𝐃𝐄 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐑 ❌\n🍓━━━━━━━━🍓\n\n🌸 𝗛𝗮𝘆 𝗰𝗼𝗻𝗳𝗹𝗶𝗰𝘁𝗼𝘀 𝗲𝗻 𝗲𝗹 𝗷𝗮𝗿𝗱𝗶𝗻`
await conn.reply(m.chat, errorMessage, m)
}
}
} catch (error) {
console.error(error)
let errorMessage2 = '🍓━━━━━━━━🍓\n   ❌ 𝐄𝐑𝐎𝐑 𝐈𝐍𝐄𝐒𝐏𝐄𝐑𝐀𝐃𝐎 ❌\n🍓━━━━━━━━🍓\n\n🌸 𝗢𝗰𝘂𝗿𝗶𝗼 𝘂𝗻 𝗲𝗿𝗼𝗿'
if (error.message) {
errorMessage2 += '\n🍓 𝗠𝗲𝗻𝘀𝗮𝗷𝗲: ' + error.message;
}
await conn.reply(m.chat, errorMessage2, m)
}
}

}

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update', 'actualizar', 'up']
handler.owner = true

export default handler