import {
  randomUser,
  readUsers,
  updateUser,
} from "../../hooks/users/useGetUserHook.js";

export async function handleTop(bot, message) {
  const chatId = message.chat.id;
  const users = await readUsers();
  const sortedUsers = users.sort((a, b) => b.quantity - a.quantity);

  let responseText = "Топ пользователей:\n";
  for (let i = 0; i < sortedUsers.length; i++) {
    const user = sortedUsers[i];
    const name = await bot.getChatMember(chatId, user.user_id);
    responseText += `${i + 1}. ${name.user.first_name} - ${user.quantity} раз(а)\n`;
  }

  await bot.sendMessage(chatId, responseText, { parse_mode: "HTML" });
}
