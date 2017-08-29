const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const auth = require('./routes/auth');
const get = require('./routes/get');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', auth);
app.use('/api/get', get);
module.exports = app;
