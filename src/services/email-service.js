'use strict'

var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
    console.log("Enviei o email abencoado", to, subject)
    sendgrid.send({
        to: to,
        from: 'gladson@stonestecnologia.com.br',
        subject: subject,
        html: body
    })
}