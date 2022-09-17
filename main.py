import random
import logging
from aiogram import Bot, Dispatcher, executor, types
from sqlite import SQlitedb

API_TOKEN = 'HIDDEN'

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)
db = SQlitedb('bd.db')

quantity = 1

@dp.message_handler(content_types=['voice'])
async def answer(message):
    mes = ["Даун", "Соси яйца мои", "чурка тупая", "ебло тупое", "кучерявое ебло тупое", "кучерявое ебло",
                        "уебан", "уебан тысячного ранга блять", "попуск" , "попуск ебанный", "Нефор ебаный"]
    await message.reply(random.choice(mes))

@dp.message_handler(lambda message: message.reply_to_message and message.reply_to_message.from_user.id == 5701346051)
async def handle_text_doc(message: types.Message):
    await message.reply("Пошёл нахуй!", parse_mode='html')


@dp.message_handler(commands=['pidor'])
async def pidoras(message: types.Message):
    if not db.user_exists(message.from_user.id):
        db.add_user(message.from_user.id, quantity)
    else:
        db.user_exists(message.from_user.id)

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)