const { getRandomMessage } = require('/src/app/components/randomMessages');

module.exports = async function handleVoiceMessage(ctx) {
    const mes = []; // Заполни массив своими фразами
    const randomReply = getRandomMessage(mes);
    if (randomReply) {
        ctx.reply(randomReply);
    }
};