const TelegramBot = require("node-telegram-bot-api");
// require("dotenv").config();

const API_TOKEN = "5701346051:AAGc8mZdfPpB3HtYczSMBmVad070TBWJkYs";
const bot = new TelegramBot(API_TOKEN, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Welcome to the bot!");
});

// bot.on("message", async (msg) => {
//   if (msg.voice) {
//     await handleVoice(bot, msg);
//   } else if (msg.reply_to_message) {
//     await handleReplies(bot, msg);
//   } else {
//     await handleCommands(bot, msg);
//   }
// });
