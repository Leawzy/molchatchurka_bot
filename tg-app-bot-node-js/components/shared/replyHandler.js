export async function handleReplies(bot, message) {
  const chatId = message.chat.id;
  if (message.reply_to_message.from.id === 5701346051) {
    await bot.sendMessage(chatId, "Пошёл нахуй!", {
      parse_mode: "HTML",
      reply_to_message_id: message.message_id,
    });
  }
}
