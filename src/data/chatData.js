export const translations = {
  English: {
    hello: "Hello, do you have fresh tomatoes?",
    reply1: "Yes, we have fresh tomatoes in stock.",
    thanks: "Great! I will come and pick them up now.",
    reply2: "Looking forward to seeing you!"
  },
  Japanese: {
    hello: "こんにちは、新鮮なトマトはありますか？",
    reply1: "はい、新鮮なトマトの在庫があります。",
    thanks: "素晴らしい！今から取りに行きます。",
    reply2: "お待ちしております！"
  },
  Tamil: {
    hello: "வணக்கம், உங்களிடம் புதிய தக்காளி உள்ளதா?",
    reply1: "ஆம், எங்களிடம் புதிய தக்காளி உள்ளது.",
    thanks: "நன்று! நான் இப்போது வந்து வாங்கிக்கொள்கிறேன்.",
    reply2: "நிச்சயமாக, வாருங்கள்!"
  },
  Spanish: {
    hello: "Hola, ¿tienes tomates frescos?",
    reply1: "Sí, tenemos tomates frescos en stock.",
    thanks: "¡Genial! Iré a recogerlos ahora.",
    reply2: "¡Esperamos verte!"
  },
  Hindi: {
    hello: "नमस्ते, क्या आपके पास ताज़े टमाटर हैं?",
    reply1: "हाँ, हमारे पास ताज़े टमाटर स्टॉक में हैं।",
    thanks: "बढ़िया! मैं अभी आकर ले लूंगा।",
    reply2: "हम आपका इंतजार कर रहे हैं!"
  }
};

export const chatHistory = [
  {
    id: 1,
    sender: 'customer',
    messageKey: 'hello',
    timestamp: '10:00 AM'
  },
  {
    id: 2,
    sender: 'owner',
    messageKey: 'reply1',
    timestamp: '10:02 AM'
  },
  {
    id: 3,
    sender: 'customer',
    messageKey: 'thanks',
    timestamp: '10:05 AM'
  },
  {
    id: 4,
    sender: 'owner',
    messageKey: 'reply2',
    timestamp: '10:06 AM'
  }
];
