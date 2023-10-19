'use strict';

const express = require('express');
const bodyParser = require('body-parser')

const app = express();

//carrega rotas
const indexRoute = require('./routes/index-route')
const productRoutes = require('./routes/product-routes')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', indexRoute);
app.use('/products', productRoutes);

module.exports = app;