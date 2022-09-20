import sqlite3


class SQlitedb:
    def __init__(self, database_file):
        self.connection = sqlite3.connect(database_file)
        self.cursor = self.connection.cursor()

    def user_exists(self, user_id):
        with self.connection:
            result = self.cursor.execute("SELECT * FROM `users` WHERE `user_id` = ?", (user_id,)).fetchall()
            return bool(len(result))

    def add_user(self, user_id, quantity):
        with self.connection:
            return self.cursor.execute("INSERT INTO `users` (`user_id`, `quantity`) VALUES (?,?)", (user_id, quantity))

    def update_user(self, user_id):
        with self.connection:
            return self.cursor.execute("UPDATE users SET quantity = quantity + 1 WHERE user_id = ?", (user_id,))

    def close(self):
        self.connection.close()
