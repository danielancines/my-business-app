const express = require('express');
const app = express();
const cors = require('cors');
const corsConfig = require('./config/cors');
const helmet = require('helmet');
const log = require('./log/logger');
const apiV1Routes = require('./routes/v1/routes');
const dbConnection = require('./data/connection');
const port = process.env.PORT || 3000;
require('./middleware/morgan')(app);
const config = require('config');
const compression = require('compression');

if (!config.get('privateKey')){
    log('error', 'FATAL ERROR: BUSINESSAPP_PRIVATE_KEY is not defined!');
    process.exit(1);
}

if (!config.get('connectionString')){
    log('error', 'FATAL ERROR: CONNECTION_STRING is not defined!');
    process.exit(1);
}

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(cors(corsConfig));
app.use('/api/v1', apiV1Routes);

app.listen(port, () => {
    log('info', `Server running on port ${port}`);
    dbConnection();
});