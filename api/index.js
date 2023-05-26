const express = require('express');

const apiRouter = require('./apiRoutes');

const app = express();

app.use('/apiRoutes', apiRouter);

module.exports = app;
