const express = require('express');
const isAuthenticate = require('../middlewares/isAuthenticate');
const isValidId = require('../middlewares/isValidId');
const { createOrUpdate, findById, findAll, remove } = require('../services/AddressService');
const router = express.Router();

router.use(isAuthenticate);

router.route('/')
    .post(createOrUpdate)
    .get(findAll);

router.route('/:id')
    .all(isValidId)
    .get(findById)
    .put(createOrUpdate)
    .delete(remove);


module.exports = app => app.use('/addresses', router);