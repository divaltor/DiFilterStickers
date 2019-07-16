const telegram = require('telegraf/telegram');

module.exports = new telegram(process.env.TOKEN);