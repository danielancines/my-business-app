const express = require('express');
const router = express.Router();
const orders = require('./orders');
const users = require('./users');
const auth = require('./auth');

router.get('/', (req, res) => {
    res.send({
        message: 'Welcome to BusinessApp Api',
        version: 'v.0.0.6'
    });
});
router.use('/orders', orders);
router.use('/users', users);
router.use('/auth', auth);

module.exports = router;