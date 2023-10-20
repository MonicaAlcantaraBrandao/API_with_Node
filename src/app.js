'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();

//conexão ao banco
mongoose.connect('mongodb+srv://balta:balta@node-str.pkxp8wr.mongodb.net/?retryWrites=true&w=majority')

//carrega models
const Product = require('./models/product')

//carrega rotas
const indexRoute = require('./routes/index-route')
const productRoutes = require('./routes/product-routes')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', indexRoute);
app.use('/products', productRoutes);

module.exports = app;