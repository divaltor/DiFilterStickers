const db = require('../database');

module.exports = async (ctx, next) => {
    const member = await ctx.getChatMember(ctx.from.id);
    if (!['creator', 'administrator'].includes(member.status)) {
        const user = await db.User.getData(ctx);
        if (user.stickers.includes(ctx.message.sticker.file_id)) {
            try {
                await ctx.deleteMessage(ctx.message.message_id);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    return next()
};