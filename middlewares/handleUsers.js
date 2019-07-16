const { telegram } = require('../helpers');
const db = require('../database');


module.exports = async (ctx, next) => {
    const member = await telegram.getChatMember(ctx.chat.id, ctx.from.id);
    if (ctx.message.sticker && !(member.status === 'administrator' || member.status === 'creator')) {
        const user = await db.User.getData(ctx);
        if (user.stickers.includes(ctx.message.sticker.file_id)) {
            telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
        }
    }
    return next()
};