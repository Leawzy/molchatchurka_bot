import random from "random";

export async function handleVoice(bot, message) {
  const chatId = message.chat.id;
  const responses = [
    "Даун",
    "Соси яйца мои",
    "чурка тупая",
    "ебло тупое",
    "кучерявое ебло тупое",
    "кучерявое ебло",
    "уебан",
    "уебан тысячного ранга блять",
    "попуск",
    "попуск ебанный",
    "Нефор ебаный",
  ]; // Ваши ответы
  const randomResponse = random.choice(responses);

  // Отправляем ответ как reply на сообщение пользователя
  await bot.sendMessage(chatId, randomResponse, {
    reply_to_message_id: message.message_id,
  });
}
