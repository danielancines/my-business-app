const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint, colorize } = format;
const config = require('config');

const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp(),
        prettyPrint()
    )
});

if (config.util.getEnv('NODE_ENV') === 'development') {
    logger.add(new transports.Console());
} else {
    logger.add(new transports.File({ filename: 'error.log', level: 'error' }));
    logger.add(new transports.File({ filename: 'service.log' }));
}

module.exports = function (level, message) {
    logger.log({
        level,
        message
    });
};