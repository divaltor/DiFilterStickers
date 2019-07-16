const Telegraf = require('telegraf');
const db = require('./database');
const handleUsers = require('./middlewares');
const {
    handleStart,
    handleAddStickerAdmin,
    handleAddStickerUser
} = require('./handlers');

const { performance } = require('perf_hooks');

const bot = new Telegraf(process.env.TOKEN);

bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
});

bot.context.db = db;

bot.use(handleUsers);
bot.use(async (ctx, next) => {
    const date = performance.now();
    await next();
    const res = performance.now() - date;
    console.log(`Response time: ${res}`);
});

bot.start(handleStart);

bot.command('add', handleAddStickerAdmin);

bot.command('add', handleAddStickerUser);

bot.launch();
console.log('Bot is started');