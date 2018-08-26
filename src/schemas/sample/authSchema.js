const Joi = require('joi');

// accepts a valid UUID v4 string as id
const personID = Joi.string().guid({version: 'uuidv4'});

// password and confirmPassword must contain the same value
const authSchema = Joi.object({
    teacherId: personID.required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(7).required().strict(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
});

// export the schema
module.exports = authSchema;
