/**
 * @description : Express.js is a back end web application framework for Node.js
 * which can be used for writing business logic.
 */
const express = require('express');
require('./config/databaseConfig');
const swagger = require('swagger-ui-express');
const swaggerData = require('./swagger.json');
const logger = require('./logger/logger');

const port = process.env.PORT;
/**
 * create express app
 */
const app = express();
/**
 * parse requests of content-type - application/x-www-form-urlencoded
 * use is a way to register middleware or chain of middlewares before executing any end route logic.
 */
app.use(express.json());
/**
 * parse requests of content-type - application/json
 */
app.use(express.json());
/**
 * define a simple route
 */
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Book Store App' });
});
/**
 * Require Notes routes
 */
require('./app/routes/user')(app);

app.use('/swagger', swagger.serve, swagger.setup(swaggerData));
/**
 * listen for requests
 */
app.listen(port, () => { logger.log('info', 'Server is listening on port 3000'); });

module.exports = app;
