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

// establish http server connection
app.listen(port, function() {
    console.log('App running on port: ' + port);
});