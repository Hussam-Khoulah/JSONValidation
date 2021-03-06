/* middlewares/schema-validator.js */

const _ = require('lodash');
const Joi = require('joi');

module.exports = (useJoiError = false) => {
    // useJoiError determines if we should respond with the base Joi error
    // boolean: defaults to false
    const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

    // enabled HTTP methods for request data validation
    const _supportedMethods = ['post', 'put'];

    // Joi validation options
    const _validationOptions = {
        abortEarly: false, // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: false // remove unknown keys from the validated data
    };

    // return the validation middleware
    return (req, res, next) => {

        const route = req.route.path;
        const method = req.method.toLowerCase();

        if (_.includes(_supportedMethods, method)) {

            // get schema for the current route
            const _schema = require('../schemas' + route);

            if (_schema) {

                // Validate req.body using the schema and validation options
                return Joi.validate(req.body, _schema, _validationOptions, (err, data) => {

                    if (err) {

                        // Joi Error
                        const JoiError = {
                            status: 'error',
                            details: err.details
                        };

                        // Generic Error
                        const genericError = {
                            status: 'error',
                            message: 'Invalid request. Please review your request and try again.'
                        };

                        // Send back the JSON error response
                        res.status(422).json(_useJoiError ? JoiError : genericError);

                    } else {
                        // Replace req.body with the data after Joi validation
                        req.body = data;
                        next();
                    }
                });
            }
        }
        next();
    };
};