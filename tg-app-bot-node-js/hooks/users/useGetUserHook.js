import { promises as fs } from "fs";
import path from "path";
import { writeUsers } from "./useAddUserHook.js";

const jsonFilePath = path.join(process.cwd(), "data", "user.json");

const readUsers = async () => {
  const data = await fs.readFile(jsonFilePath, "utf8");
  return JSON.parse(data);
};

const userExists = async (userId) => {
  const users = await readUsers();
  return users.some((user) => user.user_id === userId);
};

const updateUser = async (userId) => {
  const users = await readUsers();
  const user = users.find((user) => user.user_id === userId);
  if (user) {
    user.quantity += 1;
    await writeUsers(users);
  }
};

const randomUser = async () => {
  const users = await readUsers();

  if (users.length === 0) {
    throw new Error("No users available.");
  }

  const randomIndex = Math.floor(Math.random() * users.length);
  await updateUser(users[randomIndex].user_id);
  return users[randomIndex].user_id;
};

export { readUsers, userExists, updateUser, randomUser };
