const mongoose = require('mongoose');
const log = require('../log/logger');
const config = require('config');

function connect() {
    mongoose.connect(config.get('connectionString'), { useNewUrlParser: true })
        .then(() => log('info', 'Mongodb Connected'))
        .catch(err => log('error', err.message));
}

module.exports = connect;


