const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    chat_id: {
        type: Number,
        required: true,
    },
    telegram_id: {
        type: Number,
        index: true,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    username: String,
    stickers: [String]
});

module.exports = userSchema;