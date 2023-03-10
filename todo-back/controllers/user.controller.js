const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middlewares/validate-request');
// const authorize = require('middlewares/authorize')
const userService = require('./../services/user.service');
const users_data = require('../user.json');


router.post('/', validatorSchema, addNew);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);


module.exports = router;

function validatorSchema(req, res, next) {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

function addNew(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Ajout nouvel utilisateur avec succès ' }))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

// function validatorUpdateSchema(req, res, next) {
//     const schema = Joi.object({
//         firstName: Joi.string().empty(''),
//         lastName: Joi.string().empty(''),
//         username: Joi.string().empty(''),
//         password: Joi.string().min(6).empty('')
//     });
//     validateRequest(req, next, schema);
// }

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Utilisateur modifier avec succès ' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'Utilisatuer supprimer avec succès' }))
        .catch(next);
}