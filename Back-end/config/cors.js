const config = require('config');

module.exports = {
    'origin': config.get('originUrl'),
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 204
};