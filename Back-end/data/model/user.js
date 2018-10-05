const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    isAdmin: {
        type: Boolean
    }
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign(_.pick(this, ['_id', 'email', 'name', 'isAdmin']), config.get('privateKey'));
};

const User = mongoose.model('User', userSchema);

function validate(user) {
    const joiSchema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    const { error } = Joi.validate(user, joiSchema);
    return error;
}

module.exports = {
    User,
    validate
};