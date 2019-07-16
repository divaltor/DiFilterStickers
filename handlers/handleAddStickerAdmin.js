const { Composer } = require('telegraf');
const Extra = require('telegraf/extra');
const db = require('../database');
const { telegram, if_admin } = require("../helpers");

module.exports = Composer.admin(async (ctx) => {
    if (!ctx.message.reply_to_message || !ctx.message.reply_to_message.sticker) {
        console.log('reply');
        return ctx.reply('Отправьте эту команду в ответ на стикер', Extra.inReplyTo(ctx.message.message_id));
    }

    const user = await db.User.getData(ctx.message.reply_to_message);
    if (await if_admin(ctx, telegram)) {
        console.log('admin');
        return ctx.reply('Команда не может использоваться на администраторов', Extra.inReplyTo(ctx.message.message_id))
    }
    if (user.stickers.includes(ctx.message.reply_to_message.sticker.file_id)) {
        console.log('sticker');
        return ctx.reply('Этот стикер уже в списке', Extra.inReplyTo(ctx.message.message_id));
    }
    await db.User.updateData(ctx.message.reply_to_message, ctx.message.reply_to_message.sticker);
});