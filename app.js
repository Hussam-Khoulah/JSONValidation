const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
const port = process.env.NODE_ENV || 3000;


// app configurations
app.set('port', port);

// load app middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// load api routes
app.use('/', routes);


/* app.js */

/**
 * CODE ADDITION
 *
 * Defines a POST /test route for our simple example
 *
 * It must come after the following line:
 *   app.use('/', Routes);
 */
app.post('/test', (req, res, next) => {

    // require the Joi module
    const Joi = require('joi');

    // fetch the request data
    const data = req.body;

    // define the validation schema
    const schema = Joi.object().keys({

        // email is required
        // email must be a valid email string
        email: Joi.string().email().required(),

        birthday: Joi.date().iso(),

    });

    // validate the request data against the schema
    Joi.validate(data, schema, (err, value) => {

        // create a random number as id
        const id = Math.ceil(Math.random() * 9999999);

        if (err) {
            // send a 422 error response if validation fails
            res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: data
            });
        } else {
            // send a success response if validation passes
            // attach the random ID to the data response
            res.json({
                status: 'success',
                message: 'User created successfully',
                data: Object.assign({id}, value)
            });
        }

    });

});

/* CODE ADDITION ENDS HERE */

// establish http server connection
app.listen(port, () => {
    console.log(`App running on port: ${ port }`);
});