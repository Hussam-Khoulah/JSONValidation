const get = require ('lodash/get');
const express = require('express');
const router = express.Router();
const schemaValidator = require('./middlewares/schema-validator');
const getSchemas = require('./schema-loader');

// We are using the formatted Joi Validation error
// Pass false as argument to use a generic error
const validateRequest = schemaValidator(true);

// generic route handler
const genericSuccessHandler = (req, res, next) => {
    res.json({
        status: 'success',
        data: req.body,
    })
};

let schemaAddresses = getSchemas('src/schemas');
console.log(JSON.stringify(schemaAddresses));

for (let i = 0; i < schemaAddresses.length; i++) {
    router.post(schemaAddresses[i], validateRequest, genericSuccessHandler);
}
module.exports = router;
