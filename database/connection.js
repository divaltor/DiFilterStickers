const mongoose = require('mongoose');

const connection = mongoose.createConnection(`mongodb://${process.env.HOST}:27017/test`, {useNewUrlParser: true});

connection.then(() => console.log('Connection is successful'));

connection.catch((error) => console.log(`Connection is refused\nError: ${error}`));

module.exports = connection;