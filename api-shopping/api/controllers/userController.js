const express = require('express');
const isAuthenticate = require('../middlewares/isAuthenticate');
const isValidID = require('../middlewares/isValidId');
const { createOrUpdate, findById, findAll, remove, authenticate, updatePassword } = require('../services/UserService');
const router = express.Router();

const isAdmin = require('../middlewares/isAdmin');

router.post('/authenticate', authenticate);
router.get('/validate', isAuthenticate, async (req, res) => await res.status(200).json(true));
router.post('/', createOrUpdate);
router.get('/', isAuthenticate, isAdmin, findAll);

router.put('/:id/password', isValidID, updatePassword);

router.route('/:id')
    .all(isValidID, isAuthenticate)
    .get(findById)
    .put(createOrUpdate)
    .delete(remove);

module.exports = app => app.use('/users', router);