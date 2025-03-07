const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const FoodRoute = require('./routes/FoodRoute');
const MenuRoute = require('./routes/MenuRoute');
const Placed = require('./routes/OrderRoute');
const UserRoute = require('./routes/userRoute');
const reviewRoute = require('./routes/ReviewRoute');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());

app.use('/api/order', FoodRoute);
app.use('/api/menu', MenuRoute);
app.use('/api/user', UserRoute);
app.use('/api/orders', Placed);
app.use('/api/review', reviewRoute);

module.exports = app;
