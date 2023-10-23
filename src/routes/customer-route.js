'use strict'

const express = require('express')
const router = express.Router();
const controller = require('../controller/customer-controller')

router.post('/', controller.post)

module.exports = router;