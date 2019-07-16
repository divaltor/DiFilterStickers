const Extra = require('telegraf/extra');

module.exports = async (ctx) => {
    ctx.reply('У вас недостаточно прав', Extra.inReplyTo(ctx.message.message_id));
};