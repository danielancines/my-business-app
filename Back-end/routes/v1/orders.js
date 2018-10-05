const express = require('express');
const router = express.Router();
const { Order, validate } = require('../../data/model/order');
const auth = require('./../../middleware/auth');
const admin = require('./../../middleware/admin');

router.use(auth);
router.delete('/:id', [admin], async (req, res) => {
    try {
        const order = await Order.findByIdAndRemove(req.params.id);
        if (order) return res.send(order);
        else return res.status(404).send({
            id: req.params.id
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).send('Order not found');

        order.set({
            name: req.body.name
        });

        res.send(await order.save());
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
            .sort({ name: 1 })
            .select({ name: 1, number: 1 });
        return res.send(orders);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        return res.send(order);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/', async (req, res) => {
    const error = validate(req.body);
    if (error !== null) return res.status(400).send({
        message: error.message.toString()
    });

    const savedOrder = await Order.findOne({ number: req.body.number });
    if (savedOrder) return res.status(409).send({
        message: `Order with number ${savedOrder.number} already exists`,
        location: `${req.baseUrl}/${savedOrder._id}`
    });

    const order = new Order({
        name: req.body.name,
        number: req.body.number,
        finalNumber: req.body.finalNumber,
    });

    if (req.body.date) order.date = req.body.date;

    try {
        const result = await order.save();
        res.status(201)
            .send({
                location: `${req.baseUrl}/${result._id}`
            });
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
});

module.exports = router;