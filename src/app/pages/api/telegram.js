import TelegramBot from 'node-telegram-bot-api';
import { promises as fs } from 'fs';
import path from 'path';

// Указываем токен вашего бота
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: false });

// Путь к файлу JSON для хранения данных
const jsonFilePath = path.join(process.cwd(), 'data', 'users.json');

// Чтение данных из JSON
const readUsers = async () => {
    const data = await fs.readFile(jsonFilePath, 'utf8');
    return JSON.parse(data);
};

// Запись данных в JSON
const writeUsers = async (users) => {
    await fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2), 'utf8');
};

const handlePidorCommand = async (chatId) => {
    const users = await readUsers();
    const randomUser = users[Math.floor(Math.random() * users.length)];
    randomUser.quantity += 1;

    // Обновление данных
    await writeUsers(users);

    bot.sendMessage(chatId, `Пидор дня: ${randomUser.user_name}`);
};

const handleTopCommand = async (chatId) => {
    const users = await readUsers();
    const sortedUsers = [...users].sort((a, b) => b.quantity - a.quantity);
    let topText = 'Топ пользователей:\n';
    sortedUsers.forEach((user, index) => {
        topText += `${index + 1}. ${user.user_name} — ${user.quantity} раз(а)\n`;
    });
    bot.sendMessage(chatId, topText);
};

const handleAddCommand = async (message) => {
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

// API-роут для обработки вебхуков
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const message = req.body.message;
        if (message) {
            const chatId = message.chat.id;
            const text = message.text;

            if (text === '/pidor') {
                await handlePidorCommand(chatId);
            } else if (text === '/top') {
                await handleTopCommand(chatId);
            } else if (text === '/add') {
                await handleAddCommand(message);
            }
        }

        res.status(200).send('ok');
    } else {
        res.status(405).send('Method Not Allowed');
    }
}