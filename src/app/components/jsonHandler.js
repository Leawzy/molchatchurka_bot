import { promises as fs } from 'fs';
import path from 'path';

// Путь к файлу JSON для хранения данных
const jsonFilePath = path.join(process.cwd(), 'data', 'users.json');

export const readUsers = async () => {
    const data = await fs.readFile(jsonFilePath, 'utf8');
    return JSON.parse(data);
};

export const writeUsers = async (users) => {
    await fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2), 'utf8');
};