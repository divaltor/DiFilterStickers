module.exports = async (ctx, next) => {
    if (['supergroup', 'group'].includes(ctx.chat.type)) {
        let chatMember;
        try {
            chatMember = await ctx.getChatMember(ctx.from.id);
        } catch (e) {
            console.log(e);
        }

        if (chatMember && ['creator', 'administrator'].includes(chatMember.status)) {
            await next()
        }
    }
};