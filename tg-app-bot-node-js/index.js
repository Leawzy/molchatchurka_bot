import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { handleVoice } from "./components/shared/voiceHandler.js";
import { handleReplies } from "./components/shared/replyHandler.js";
import { handleGender } from "./components/shared/genderHandler.js";
import { handleTop } from "./components/shared/topHandler.js";

dotenv.config();

const API_TOKEN = process.env.API_TOKEN;
const bot = new TelegramBot(API_TOKEN, { polling: true });

bot.on("polling_error", (error) => {
  console.error("Polling error:", error);
});

// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, "Welcome to the bot!");
// });

bot.on("message", async (msg) => {
  if (msg.voice) {
    await handleVoice(bot, msg);
  } else if (msg.reply_to_message) {
    await handleReplies(bot, msg);
  }
  // } else {
  //   await handleCommands(bot, msg);
  // }
});

bot.onText(/\/pidor/, async (msg) => {
  await handleGender(bot, msg);
});

bot.onText(/\/top/, async (msg) => {
  await handleTop(bot, msg);
});
