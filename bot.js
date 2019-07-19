const Telegraf = require('telegraf');
const { Composer } = Telegraf;
const db = require('./database');
const {
    handleUsers,
    checkPerformance,
}= require('./middlewares');

const {
    handleAddStickerAdmin,
    handleAddStickerUser
} = require('./handlers');

const {
    limitAddConfig,
    limitStickerConfig,
    limitConifg
} = require('./configs');

const rateLimit = require('telegraf-ratelimit');

const bot = new Telegraf(process.env.TOKEN);

bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
});

bot.context.db = db;

bot.use(checkPerformance);
bot.use(rateLimit(limitConifg));

bot.on('sticker', rateLimit(limitStickerConfig), Composer.groupChat(handleUsers));

bot.command('add', Composer.admin(handleAddStickerAdmin));

bot.command('add', rateLimit(limitAddConfig), Composer.groupChat(handleAddStickerUser));


bot.launch().then(() => {
    console.log('Bot is started')
});