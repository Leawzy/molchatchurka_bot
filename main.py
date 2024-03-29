import re
import random
import logging
from aiogram import Bot, Dispatcher, executor, types
from aiogram.dispatcher import FSMContext
from aiogram.utils import markdown as md
from aiogram import filters

from sqlite import SQlitedb
from db import SQLUsers

API_TOKEN = 'YOUR TOKEN HERE'

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)
db = SQlitedb('bd.db')
dbu = SQLUsers('bd.db')
quantity = 1


@dp.message_handler(content_types=['voice'])
async def answer(message):
    mes = ["Даун", "Соси яйца мои", "чурка тупая", "ебло тупое", "кучерявое ебло тупое", "кучерявое ебло",
           "уебан", "уебан тысячного ранга блять", "попуск", "попуск ебанный", "Нефор ебаный"]
    await message.reply(random.choice(mes))


@dp.message_handler(lambda message: message.reply_to_message and message.reply_to_message.from_user.id == 5701346051)
async def handle_text_doc(message: types.Message):
    await message.reply("Пошёл нахуй!", parse_mode='html')


@dp.message_handler(commands=['pidor'])
async def pidoras(message: types.Message):
    abs = dbu.user_random()
    lol = message.chat.id
    name = await bot.get_chat_member(lol, abs)
    usname = name['user']['first_name']
    if not db.user_exists(abs):
        db.add_user(abs, quantity)
        await message.answer('Загоняем всех пидоров в вольер', parse_mode='html')
        await message.answer('Архипидору не скрыться', parse_mode='html')
        await message.answer('Поппенгаген открыт для всех желающих у…', parse_mode='html')
        await message.answer(f'<a href="tg://user?id={abs}">{usname}</a>',
                             parse_mode='html')
    else:
        db.update_user(abs)
        await message.answer('Загоняем всех пидоров в вольер', parse_mode='html')
        await message.answer('Архипидору не скрыться', parse_mode='html')
        await message.answer('Поппенгаген открыт для всех желающих у…', parse_mode='html')
        await message.answer(f'<a href="tg://user?id={abs}">{usname}</a>',
                             parse_mode='html')


@dp.message_handler(commands=['top'])
async def top(message: types.Message):
    top = dbu.user_list_id()
    top2 = dbu.user_list_quantity()
    username = []
    userquantity = []
    lol = message.chat.id

    for a in top:
        for b in a:
            username.append(b)

    for c in top2:
        for d in c:
            userquantity.append(d)

    # Сортируем списки username и userquantity по убыванию количества сообщений
    sorted_data = sorted(zip(userquantity, username), reverse=True)
    userquantity, username = zip(*sorted_data)

    text = "Топ пользователей:\n"
    for a in range(len(username)):
        name = await bot.get_chat_member(lol, username[a])
        usname = name['user']['first_name']
        text += f"{a + 1}. {usname} - {userquantity[a]} раз(а)\n"

    await message.answer(text)


# # Функция для начисления монеток за сообщения
# async def give_coin(message: types.Message, state: FSMContext):
#     user_id = message.from_user.id
#
#     # Проверяем, есть ли пользователь в таблице с монетками
#     user = dbu.execute("SELECT * FROM coins WHERE user_id = ?", (user_id,)).fetchone()
#     if not user:
#         # Если пользователя нет, то добавляем его в таблицу
#         dbu.execute("INSERT INTO coins (user_id) VALUES (?)", (user_id,))
#         dbu.commit()
#
#     # Увеличиваем количество монеток пользователя на 1
#     dbu.execute("UPDATE coins SET coins = coins + 1 WHERE user_id = ?", (user_id,))
#     dbu.commit()
#
#     # Отправляем сообщение пользователю о получении монетки
#     # await message.reply("Вы получили монетку за сообщение!", parse_mode=ParseMode.HTML)


@dp.message_handler(content_types=types.ContentType.TEXT)
async def on_text(message: types.Message):
    # Проверка текста сообщения
    if re.search(r'@all', message.text, re.IGNORECASE):
        # Отправка ответного сообщения
        users = [398768670, 520017594, 456575867, 636028497]
        chat_id = message.chat.id
        text = "Пингую пидоров:\n"
        for user_id in users:
            user = await bot.get_chat_member(chat_id, user_id)
            username = user['user']['first_name']
            text += f'<a href="tg://user?id={user_id}">{username}</a>\n'
        await bot.send_message(chat_id=message.chat.id, text=text, parse_mode='html')


@dp.message_handler(commands=['add'])
async def get_text_messages(message: types.Message):
    if not dbu.user_exists(message.from_user.id):
        dbu.add_user(message.from_user.id)


@dp.message_handler(commands=['users'])
async def get_users(message: types.Message):
    abs = dbu.user_random()
    await message.answer(f'Ты чепуха: {abs}')
    await message.answer(f'<a href="tg://user?id={abs}">@{abs}</a>',
                         parse_mode='html')


if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)
