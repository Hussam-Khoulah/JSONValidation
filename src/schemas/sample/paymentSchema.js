const Joi = require('joi');

// accepts a valid UUID v4 string as id
const personID = Joi.string().guid({version: 'uuidv4'});

// cardNumber must be a valid Luhn number
const paymentSchema = Joi.object({
    studentId: personID.required(),
    amount: Joi.number().positive().greater(1).precision(2).required(),
    cardNumber: Joi.string().creditCard().required(),
    completedAt: Joi.date().timestamp().required()
});

// export the schema
module.exports = paymentSchema;