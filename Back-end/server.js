const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const log = require('./log/logger');
const apiV1 = require('./routes/v1/routes');
const dbConnection = require('./data/connection');
const port = process.env.PORT || 3000;
require('./middleware/morgan')(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(cors());
app.use('/api/v1', apiV1);

app.listen(port, () => {
    log('info', `Server running on port ${port}`);
    dbConnection();
});