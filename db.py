import sqlite3
import random


class SQLUsers:
    def __init__(self, database_file):
        self.connection = sqlite3.connect(database_file)
        self.cursor = self.connection.cursor()

    def add_user(self, user_id):
        with self.connection:
            return self.cursor.execute("INSERT INTO `usersbot` (`user_id`) VALUES (?)", (user_id,))

    def user_exists(self, user_id):
        with self.connection:
            result = self.cursor.execute("SELECT * FROM `usersbot` WHERE `user_id` = ?", (user_id,)).fetchall()
            return bool(len(result))

    def user_random(self):
        with self.connection:
            result = self.cursor.execute("SELECT `user_id` FROM `usersbot`").fetchall()
            abs = random.choice(result)
            return abs[0]

    def close(self):
        self.connection.close()
