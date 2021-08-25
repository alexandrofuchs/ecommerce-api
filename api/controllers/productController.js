const express = require('express');
const router = express.Router();
const { createOrUpdate, findById, findAll, remove } = require('../services/ProductService');
const isValidID = require('../middlewares/isValidId');
const isAdmin = require('../middlewares/isAdmin');
const isAuthenticate = require('../middlewares/isAuthenticate');

router.route('/')
    .post(isAuthenticate, isAdmin, createOrUpdate)
    .get(findAll);

router.route('/:id')
    .all(isValidID)
    .get(findById)
    .put(isAuthenticate, isAdmin, createOrUpdate)
    .delete(isAuthenticate, isAdmin, remove);

module.exports = app => app.use('/products', router);
