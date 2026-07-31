import { WAMessageStubType } from '@whiskeysockets/baileys';
import fs from 'fs'

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType ||!m.isGroup) return true;
    let chat = global.db.data.chats[m.chat];
    if (!chat?.welcome) return true;
    let target = m.messageStubParameters?.[0];
    if (!target) return true;

    let userData = global.db.data.users[target] || {};
    let targetName = userData.name || await conn.getName(target) || `@${target.split('@')[0]}`;
    let actor = m.participant || m.messageStubParameters?.[1] || null;

    let memberCount = participants.length;
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) memberCount++;
    if ([WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_PARTICIPANT_LEAVE].includes(m.messageStubType)) memberCount--;

    const EMOJIS = ['🍓','🔥','⚡','💥','🌟','👑']
    const e1 = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]

    const actionText = {
        [WAMessageStubType.GROUP_PARTICIPANT_ADD]: actor? `*Reclutado por* @${actor.split('@')[0]}` : '*Ingreso al grupo*',
        [WAMessageStubType.GROUP_PARTICIPANT_REMOVE]: actor? `*Eliminado por* @${actor.split('@')[0]}` : '*Expulsado del grupo*',
        [WAMessageStubType.GROUP_PARTICIPANT_LEAVE]: '*Abandonó el grupo*'
    };

    const format = (text) => text
     .replace(/@user/g, `@${target.split('@')[0]}`)
     .replace(/@name/g, targetName)
     .replace(/@group/g, groupMetadata.subject)
     .replace(/@desc/g, groupMetadata.desc?.toString() || '*Sin descripción*')
     .replace(/%users/g, memberCount)
     .replace(/@action/g, actionText[m.messageStubType] || '')
     .replace(/@date/g, new Date().toLocaleString('es-PE'));

    let ppUrl;
    try { ppUrl = await conn.profilePictureUrl(target, 'image'); }
    catch { ppUrl = 'https://i.imgur.com/2zG3V.jpg' }

    const defaultWelcome = `*${e1} NUEVO MIEMBRO ${e1}*\n\n*Nombre*: @name\n*Grupo*: @group\n*Estado*: @action\n*Miembros*: %users\n*Fecha*: @date`;
    const defaultBye = `*${e1} MIEMBRO QUE SE FUE ${e1}*\n\n*Nombre*: @name\n*Grupo*: @group\n*Estado*: @action\n*Miembros*: %users\n*Fecha*: @date`;

    const welcome = format(chat.welcomeText || defaultWelcome);
    const bye = format(chat.byeText || defaultBye);
    const mentions = [target];
    if (actor) mentions.push(actor);
    const context = { contextInfo: { mentionedJid: mentions } };

    // ENVIA MP3 MANUAL - ESTO EVITA EL SILENCIO
    const sendAudio = async (audioPath) => {
        if (!fs.existsSync(audioPath)) return
        try {
            let audioBuffer = fs.readFileSync(audioPath)
            await conn.sendMessage(m.chat, {
                audio: audioBuffer,
                mimetype: 'audio/mpeg',
                ptt: false,
                fileName: 'StrawBerry.mp3'
            })
        } catch(e) { console.log(e) }
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        await conn.sendMessage(m.chat, { image: { url: ppUrl }, caption: welcome,...context });
        if (chat.welcomeAudio) await sendAudio(chat.welcomeAudio)
    }
    if ([WAMessageStubType.GROUP_PARTICIPANT_LEAVE, WAMessageStubType.GROUP_PARTICIPANT_REMOVE].includes(m.messageStubType)) {
        await conn.sendMessage(m.chat, { image: { url: ppUrl }, caption: bye,...context });
        if (chat.byeAudio) await sendAudio(chat.byeAudio)
    }
}
export default {}