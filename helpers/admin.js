module.exports = async (ctx) => {
    const member = await ctx.telegram.getChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id);

    return !!(member && (member.status === 'administrator' || member.status === 'creator'));

};