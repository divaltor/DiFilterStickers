const Telegraf = require('telegraf');
const db = require('./database');
const handleUsers = require('./middlewares');
const {
    handleStart,
    handleAddStickerAdmin,
    handleAddStickerUser
} = require('./handlers');

const bot = new Telegraf(process.env.TOKEN);

bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
});

bot.context.db = db;

bot.use(handleUsers);

bot.start(handleStart);

bot.command('add', handleAddStickerAdmin);

bot.command('add', handleAddStickerUser);

bot.launch();