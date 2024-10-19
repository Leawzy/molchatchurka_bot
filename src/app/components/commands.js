import bot from './bot';
import { readUsers, writeUsers } from '/src/app/components/jsonHandler';

export const handlePidorCommand = async (chatId) => {
    const users = await readUsers();
    const randomUser = users[Math.floor(Math.random() * users.length)];
    randomUser.quantity += 1;

    // Обновление данных
    await writeUsers(users);

    bot.sendMessage(chatId, `Пидор дня: ${randomUser.user_name}`);
};

export const handleTopCommand = async (chatId) => {
    const users = await readUsers();
    const sortedUsers = [...users].sort((a, b) => b.quantity - a.quantity);
    let topText = 'Топ пользователей:\n';
    sortedUsers.forEach((user, index) => {
        topText += `${index + 1}. ${user.user_name} — ${user.quantity} раз(а)\n`;
    });
    bot.sendMessage(chatId, topText);
};

export const handleAddCommand = async (message) => {
    const users = await readUsers();
    const userId = message.from.id;
    const userName = message.from.first_name;

    if (!users.some(user => user.user_id === userId)) {
        users.push({ id: users.length + 1, user_name: userName, user_id: userId, quantity: 0 });
        await writeUsers(users);
        bot.sendMessage(message.chat.id, `${userName} добавлен в базу.`);
    } else {
        bot.sendMessage(message.chat.id, `${userName}, ты уже есть в базе.`);
    }
};