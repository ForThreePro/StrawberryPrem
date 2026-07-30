let handler = (m) => m;

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner }) {
  if (!m.isGroup || !isBotAdmin) return; // solo grupos y si el bot es admin

  const chat = global.db.data.chats[m.chat];
  if (!chat.reaction) return; // si está desactivado

  if (!m.text) return;

  const emojiResponses = {
    // SALUDOS
    "hola": "👋🍓", "buenas": "👋🌸", "hello": "👋✨",
    "gracias": "🙏💖", "thx": "🙏🍓", "muchas gracias": "🙏🌸",
    "adiós": "👋💖", "chau": "👋🍓", "bye": "👋🌸",
    
    // RISAS
    "jaja": "😂🍓", "xd": "😂🌸", "lol": "😂💖", "aj": "😂✨",
    
    // EMOCIONES
    "triste": "😢🍓", "sad": "😢🌸", "llorar": "😭💖",
    "genial": "😎🍓", "god": "😎🌸", "pro": "😎💖",
    "amor": "❤️🍓", "love": "❤️🌸", "te amo": "❤️💖",
    "ok": "👌🍓", "dale": "👌🌸", "ya": "👌💖",
    "wow": "😮🍓", "wtf": "😮🌸", "que": "😮💖",
    "ayuda": "❓🍓", "help": "❓🌸", "helpme": "❓💖",
    "bien": "😊🍓", "good": "😊🌸", "nice": "😊💖",
    "mal": "😞🍓", "bad": "😞🌸", "triste": "😞💖",
    "feliz": "😁🍓", "happy": "😁🌸", "contenta": "😁💖",
    
    // SI/NO
    "sí": "✅🍓", "si": "✅🌸", "yes": "✅💖",
    "no": "❌🍓", "nop": "❌🌸", "nel": "❌💖",
    
    // COMIDA Y COSAS 🍓
    "comida": "🍕🍓", "hambre": "🍕🌸", "tengo hambre": "🍓💖",
    "fiesta": "🎉🍓", "party": "🎉🌸", "celebrar": "🎉💖",
    "musica": "🎵🍓", "music": "🎵🌸", "cantar": "🎵💖",
    "dinero": "💵🍓", "plata": "💵🌸", "rico": "💵💖",
    "trabajo": "💼🍓",
    "casa": "🏠🍓", "home": "🏠🌸",
    "sol": "☀️🍓", "calor": "☀️🌸",
    "lluvia": "🌧️🍓", "frio": "🌧️🌸",
    "noche": "🌙🍓",
    "estrella": "⭐🍓",
    "fuego": "🔥🍓", "hot": "🔥🌸",
    "agua": "💧🍓",
    "corazón": "💖🍓", "corazon": "💖🌸",
    "beso": "💋🍓",
    "abrazo": "🤗🍓",
    "tiempo": "⏰🍓",
    "café": "☕🍓", "cafe": "☕🌸",
    "idea": "💡🍓",
    "regalo": "🎁🍓",
    "carro": "🚗🍓",
    "viaje": "✈️🍓",
    "teléfono": "📱🍓", "telefono": "📱🌸",
    "computadora": "💻🍓", "pc": "💻🌸",
    "error": "❗🍓",
    "robot": "🤖🍓", "bot": "🤖🌸",
    "flor": "🌸🍓",
    "árbol": "🌳🍓", "arbol": "🌳🌸",
    "montaña": "⛰️🍓", "montana": "⛰️🌸",
    "mar": "🌊🍓", "playa": "🌊🌸",
  };

  const lowerMessage = m.text.toLowerCase();
  let emojiToReact = null;

  // Busca la primera palabra clave que encuentre
  for (const [key, emoji] of Object.entries(emojiResponses)) {
    if (lowerMessage.includes(key)) {
      emojiToReact = emoji;
      break;
    }
  }

  // Si no encontró nada, 30% de probabilidad de reaccionar random con temática fresa
  if (!emojiToReact && Math.random() < 0.3) {
    const allEmojis = ["😀🍓", "😊🌸", "💖✨", "🍓💕", "🌸👑", "✨🍓", "💖🌸", "😌🍓", "🥰🌸", "🤗💖"];
    emojiToReact = allEmojis[Math.floor(Math.random() * allEmojis.length)];
  }

  if (!emojiToReact) return; // si no hay nada que hacer, no hace nada

  try {
    await m.react(emojiToReact);
    console.log(`🍓 [STRAWBERRY REACTION] ${m.chat.split('@')[0]} → ${emojiToReact}`);
  } catch (err) {
    console.error("🍓 Error al reaccionar:", err);
  }

  return true;
};

handler.disabled = false;
export default handler;