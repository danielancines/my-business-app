const express = require('express');
const router = express.Router();
const orders = require('./orders');

router.get('/', (req,res)=> {
    res.send('v.0.0.2');
});
router.use('/orders', orders);

module.exports = router;