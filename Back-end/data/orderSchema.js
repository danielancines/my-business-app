const mongoose = require('mongoose');
const Joi = require('joi');

const Order = mongoose.model('Order', new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number },
    finalNumber: Number,
    date: { type: Date, default: Date.now, timezone: 'America/Sao_Paulo' }
}));

function validate(order) {
    const joiSchema = Joi.object().keys({
        name: Joi.string().required().error(new Error('Name is required')),
        number: Joi.number().required().error(new Error('Number is required')),
        finalNumber: Joi.number().required().error(new Error('Final Number is required')),
        date: Joi.date().error(new Error('Date must be a valid date'))
    });

    const { error } = Joi.validate(order, joiSchema);
    return error;
}

module.exports = {
    Order,
    validate
};