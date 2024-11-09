import { randomUser, updateUser } from "../../hooks/users/useGetUserHook.js";

export async function handleGender(bot, message) {
  const chatId = message.chat.id;
  let userId;
  let attempts = 0; // Счетчик попыток

  do {
    userId = await randomUser();
    attempts++;
    if (attempts > 2) { // Ограничиваем количество попыток
      throw new Error("Не удалось найти нового пользователя после 10 попыток");
    }
  } while (userId === null); // Проверяем, что userId не равен null

  const name = await bot.getChatMember(chatId, userId);

  await updateUser(userId);
  await bot.sendMessage(chatId, "Загоняем всех пидоров в вольер", {
    parse_mode: "HTML",
  });
  await bot.sendMessage(chatId, `Архипидору не скрыться`, {
    parse_mode: "HTML",
  });
  await bot.sendMessage(chatId, `Поппенгаген открыт для всех желающих у…`, {
    parse_mode: "HTML",
  });
  await bot.sendMessage(
    chatId,
    `<a href="tg://user?id=${userId}">${name.user.first_name}</a>`,
    { parse_mode: "HTML" },
  );
}
