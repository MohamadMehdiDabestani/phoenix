const TelegramBot = require("node-telegram-bot-api");
const token = "5153591193:AAHeWKvCRVvZbvenaGyyae93ChWPzOeKZAM";
const bot = new TelegramBot(token, { polling: true });
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
    console.log(msg);
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message");
});
