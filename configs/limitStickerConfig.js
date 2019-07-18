module.exports = {
    window: 5000,
    limit: 3,
    onLimitExceeded: async (ctx, next) => {
        try {
            await ctx.restrictChatMember(ctx.from.id, {
                until_date: Math.floor(Date.now() / 1000 + 300),
                can_send_messages: true,
                can_send_media_messages: true,
                can_send_other_messages: false,
                can_add_web_page_previews: true
            });
        } catch (e) {
            console.log(e);
        }

        try {
            await ctx.deleteMessage(ctx.message.message_id)
        }
        catch (e) {
            console.log(e);
        }
        ctx.reply('Вы ограничены в отправке стикеров на 5 минут');
    }
};