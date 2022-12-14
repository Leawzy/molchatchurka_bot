import random
import logging
from aiogram import Bot, Dispatcher, executor, types
from sqlite import SQlitedb
from db import SQLUsers

API_TOKEN = 'HIDDEN'

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
    if not db.user_exists(abs):
        db.add_user(abs, quantity)
        await message.answer('Загоняем всех пидоров в вольер', parse_mode='html')
        await message.answer('Архипидору не скрыться', parse_mode='html')
        await message.answer('Поппенгаген открыт для всех желающих у…', parse_mode='html')
        await message.answer(f'<a href="tg://user?id={abs}">Ты</a>',
                             parse_mode='html')
    else:
        db.update_user(abs)
        await message.answer('Загоняем всех пидоров в вольер', parse_mode='html')
        await message.answer('Архипидору не скрыться', parse_mode='html')
        await message.answer('Поппенгаген открыт для всех желающих у…', parse_mode='html')
        await message.answer(f'<a href="tg://user?id={abs}">Ты</a>',
                             parse_mode='html')


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
