import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: false });

export default bot;

const handleVoiceMessage = require('/src/app/components/voiceHandler');
const handleReply = require('/src/app/components/replyHandler');

bot.on('message', async (ctx) => {
    const { message } = ctx;

    if (message.voice) {
        await handleVoiceMessage(ctx);
    }

    if (message.reply_to_message && message.reply_to_message.from.id === 5701346051) {
        await handleReply(ctx);
    }
});