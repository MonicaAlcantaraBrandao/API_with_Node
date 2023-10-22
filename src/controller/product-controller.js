const mongoose = require('mongoose');
const product = require('../models/product');
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/fluent-validator')

exports.get = (req,res,next) => {
    product.find({
        active: true
    }, 'title price slug')
    .then(data =>{
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    })
}

exports.getBySlug = (req,res,next) => {
    product.findOne({
        slug: req.params.slug,
        active: true
    }, 'title description price slug tags')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    })
}

exports.getById = (req,res,next) => {
    product.findById(req.params.id)
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    })
}

exports.getByTag = (req,res,next) => {
    product.find({
        tags: req.params.tag,
        active: true
    }, 'title description price slug tags')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    })
}

exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, "O titulo deve conter no mínimo 3 carcteres")
    contract.hasMinLen(req.body.slug, 3, "O slug deve conter no mínimo 3 carcteres")
    contract.hasMinLen(req.body.description, 3, "A descrição deve conter no mínimo 3 carcteres")

    //Se os dados forem invalidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    var product = new Product(req.body);
    product.save().then(x => {
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar produto',
                data: e
            })
        }
        )
    })
};

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
            }).then(x => {
            res.status(200).send({message:'Produto atualizado com sucesso!'});
            }).catch(e => {
            res.status(400).send({
                message: "Falha ao atualizar produto.",
                data: e
            });
        });
    }; 

exports.delete = (req, res, next) => {
    Product.findOneAndDelete(req.body.id)
        .then(x => {
            res.status(200).send({message:'Produto deletado com sucesso!'});
        })
        .catch(e => {
            res.status(400).send({
            message: "Falha ao deletar produto.",
            data: e
            });
        });
};