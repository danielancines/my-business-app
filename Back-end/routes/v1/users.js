const express = require('express');
const router = express.Router();
const { User, validate } = require('../../data/model/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('./../../middleware/auth');

router.use(auth);
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (user) return res.send(user);
        else return res.status(404).send({
            id: req.params.id
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('Order not found');

        user.set({
            name: req.body.name
        });

        res.send(await user.save());
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
            .sort({ name: 1 });
        return res.send(users.map(u => _.pick(u, ['_id', 'name', 'email'])));
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.get('/me', async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        return res.send(user);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const error = validate(req.body);
        if (error !== null) return res.status(400).send({
            message: error.details[0].message
        });

        const savedUser = await User.findOne({ email: req.body.email });
        if (savedUser) return res.status(409).send({
            message: `User with this email: ${savedUser.email} already exists`,
            location: `${req.baseUrl}/${savedUser._id}`
        });

        const user = new User(_.pick(req.body, ['name', 'lastName', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        const result = await user.save();

        const token = user.generateAuthToken();
        res.header('x-access-token', token).status(201)
            .send({
                user: _.pick(result, ['_id', 'name', 'lastName', 'email']),
                location: `${req.baseUrl}/${result._id}`
            });
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

module.exports = router;