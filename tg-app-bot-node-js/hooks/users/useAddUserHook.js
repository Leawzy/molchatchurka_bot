import { promises as fs } from "fs";
import path from "path";

const jsonFilePath = path.join(process.cwd(), "data", "user.json");

const writeUsers = async (users) => {
  await fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2), "utf8");
};

const addUser = async (userId, quantity) => {
  const users = await readUsers();
  if (!users.some((user) => user.user_id === userId)) {
    users.push({
      id: users.length + 1,
      user_name: "", // Имя пользователя обновляется при получении
      user_id: userId,
      quantity: quantity,
    });
    await writeUsers(users);
  }
};

export { addUser, writeUsers };
