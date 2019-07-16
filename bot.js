const Telegraf = require('telegraf');
const telegram = require('telegraf/telegram');
const Extra = require('telegraf/extra');
const db = require('./database');
const { Composer } = Telegraf;
const if_admin = require('./helpers');

const bot = new Telegraf(process.env.TOKEN);
const tg = new telegram(process.env.TOKEN);

bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
});

bot.context.db = db;

bot.use(async (ctx, next) => {
    const member = await tg.getChatMember(ctx.chat.id, ctx.from.id);
    if (ctx.message.sticker && !(member.status === 'administrator' || member.status === 'creator')) {
        const user = await db.User.getData(ctx);
        if (user.stickers.includes(ctx.message.sticker.file_id)) {
            tg.deleteMessage(ctx.chat.id, ctx.message.message_id);

        }
    }
    return next()
});

bot.start(async (ctx) => {
    ctx.reply('Hi, I can delete stickers from peoples in filtered list');
});

bot.command('get', async (ctx) => {
    await db.User.getData(ctx).then((user) => ctx.reply(user));
});


bot.command('add', Composer.admin(async (ctx) => {
    if (!ctx.message.reply_to_message || !ctx.message.reply_to_message.sticker) {
        console.log('reply');
        return ctx.reply('Send this commands with sticker reply', Extra.inReplyTo(ctx.message.message_id));
    }

    const user = await db.User.getData(ctx.message.reply_to_message);
    if (await if_admin(ctx, tg)) {
        console.log('admin');
        return ctx.reply('Command can\'t use on admins', Extra.inReplyTo(ctx.message.message_id))
    }
    if (user.stickers.includes(ctx.message.reply_to_message.sticker.file_id)) {
        console.log('sticker');
        return ctx.reply('This sticker is in filter list already', Extra.inReplyTo(ctx.message.message_id));
    }
    await db.User.updateData(ctx.message.reply_to_message, ctx.message.reply_to_message.sticker);
}));

bot.command('add', (ctx) => {
   ctx.reply('You don\'t have enough rights', Extra.inReplyTo(ctx.message.message_id));
});

bot.launch();