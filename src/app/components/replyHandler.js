module.exports = async function handleReply(ctx) {
    const targetUserId = 5701346051;

    if (ctx.message.reply_to_message && ctx.message.reply_to_message.from.id === targetUserId) {
        ctx.reply('Текст', { parse_mode: 'HTML' });
    }
};