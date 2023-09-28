const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const registrationRoute = require('./src/routes/registration');
const webhookRoute = require('./src/routes/webhook');
const viewsRoute = require('./src/routes/views');
const userRoute = require('./src/routes/user');

app.use(
  cors({
    origin: `${process.env.CORS_ORIGIN}`,
  })
);
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

app.use('/api/v1', webhookRoute);

app.use(express.json());

app.use('/api/v1', registrationRoute);
app.use('/api/v1', userRoute);
app.use('/', viewsRoute);

module.exports = app;
