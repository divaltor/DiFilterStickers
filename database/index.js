const connection = require('./connection');
const collections = require('./models');

const db = {};

Object.keys(collections).forEach((collectionName) => {
    console.log(collectionName);
    db[collectionName] = connection.model(collectionName, collections[collectionName])
});

db.User.getData = (ctx) => new Promise(async (resolve) => {
    let user = await db.User.findOne({ telegram_id: ctx.from.id, chat_id: ctx.chat.id });

    if (!user) {
        user = new db.User();
        user.telegram_id = ctx.from.id;
        user.chat_id = ctx.chat.id
    }

    resolve(user);
});

db.User.updateData = (ctx, sticker) => new Promise(async (resolve) => {
    const user = await db.User.getData(ctx);

    user.first_name = ctx.from.first_name;
    user.last_name = ctx.from.last_name;
    user.username = ctx.from.username;
    if (!user.stickers.includes(sticker.file_id)) {
        user.stickers.push(sticker.file_id);
    }


    await user.save();

    resolve(user);
});

module.exports = db;