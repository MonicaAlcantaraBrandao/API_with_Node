'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

const app = express();

//conexão ao banco
mongoose.connect(config.connectionString)

//carrega models
const Product = require('./models/product')
const Costumer = require('./models/customer')
const Order = require('./models/order')

//carrega rotas
const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')
const customerRoute = require('./routes/customer-route')
const orderRoute = require('./routes/order-route')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;