module.exports = async (ctx, next) => {
    if (['supergroup', 'group'].includes(ctx.chat.type)) {
        const chatMember = await ctx.telegram.getChatMember(
            ctx.chat.id,
            ctx.from.id
        ).catch(console.log);

        if (chatMember && ['creator', 'administrator'].includes(chatMember.status)) {
            return await next()
        }
    }
};