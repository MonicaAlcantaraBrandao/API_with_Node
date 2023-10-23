'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();

//conexão ao banco
mongoose.connect('mongodb+srv://balta:balta@node-str.pkxp8wr.mongodb.net/?retryWrites=true&w=majority')

//carrega models
const Product = require('./models/product')
const Costumer = require('./models/customer')
const Order = require('./models/order')

//carrega rotas
const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')
const customerRoute = require('./routes/customer-route')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);

module.exports = app;