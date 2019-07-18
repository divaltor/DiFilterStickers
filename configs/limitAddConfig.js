module.exports = {
    window: 5000,
    limit: 3,
    onLimitExceeded: async (ctx, next) => {
        try {
            await ctx.telegram.restrictChatMember(ctx.chat.id, ctx.from.id, {
                until_date: Math.floor(Date.now() / 1000 + 600),
                can_send_messages: false,
                can_send_media_message: false,
                can_send_other_messages: false,
                can_add_web_page_preview: false,
            });
        } catch (e) {
            console.log(e);
        }

        ctx.reply('Вы ограничены в отправке сообщений из-за спама ЕБУЧЕЙ КОМАНДЫ /ADD');
    }
};