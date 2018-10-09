const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { User } = require('../../data/model/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.post('/', async (req, res) => {
    try {
        const error = validate(req.body);
        if (error !== null) return res.status(400).send({
            message: error.details[0].message
        });

        const savedUser = await User.findOne({ email: req.body.email });
        if (!savedUser) return res.status(400).send({
            message: 'Invalid email or password'
        });

        const validPassword = await bcrypt.compare(req.body.password, savedUser.password);
        if (!validPassword) return res.status(400).send({
            message: 'Invalid email or password'
        });

        res.send({
            user: _.pick(savedUser, ['_id', 'name', 'lastName', 'email']),
            token: savedUser.generateAuthToken()
        });
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

router.get('/me/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) return res.send(_.pick(user, ['name', 'lastName', 'email']));
        else return res.status(400).send({
            message: 'User not found!'
        });
    } catch (error) {
        return res.status(400).send({
            message: error.message
        });
    }
});

function validate(user) {
    const joiSchema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    const { error } = Joi.validate(user, joiSchema);
    return error;
}

module.exports = router;