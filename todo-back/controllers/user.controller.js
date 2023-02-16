const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middlewares/validate-request');
const authorize = require('middlewares/authorize')
const userService = require('./../services/user.service');

// routes
router.post('/sign-in', authenticateSchema, authenticate);
router.post('/sign-up', registerSchema, register);
router.post('/', registerSchema, register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);


// authorize(), 
// authorize(), 
// authorize(), 
// authorize(), 
// authorize(), 

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Ajout nouvel utilisateur avec succès ' }))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        // .then(user => res.json(user))
        .then(() => res.json({ message: 'Utilisateur modifier avec succès ' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'Utilisatuer supprimer avec succès' }))
        .catch(next);
}