const Category = require("../../database/models/Category");
const { isWord, maxAndMinLength } = require("../helpers/validate");
const express = require('express');
const isAuthenticate = require("../middlewares/isAuthenticate");
const isAdmin = require("../middlewares/isAdmin");
const isValidId = require("../middlewares/isValidId");
const router = express.Router();

router.use(isAuthenticate, isAdmin);

router.route('/')
    .post(async (req, res) => {
        try {
            const { description } = req.body;

            if (!description) {
                return res.status(400).json({ message: "descrição inválida!" });
            }

            if (!maxAndMinLength(description, 3, 100)) {
                return res.status(400).json({ message: "descrição inválida!" })
            }

            let foundOrCreatedCategory = await Category.findOrCreate({ description, where: { description } });

            return res.status(200).json({ message: "Ok!", data: foundOrCreatedCategory[0] });

        } catch (e) {
            console.log(e.message);
            return res.status(500).json({ message: "Server Error!" })
        }
    })
    .get(async (req, res) => {
        try {
            const foundCategories = await Category.findAll();
            return res.status(200).json({ message: "Ok!", data: foundCategories });
        } catch (error) {
            console.log(e.message);
            return res.status(500).json({ message: "Server error!" });
        }
    });


router.route('/:id')
    .all(isValidId)
    .delete(
        async (req, res) => {
            try {
                const id = req.params.id;

                let removedCategory = (await Category.destroy({ where: { id }, individualHooks: true }))

                return res.status(200).json({ message: "Ok!" });

            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Server error!" })
            }
        }
    )
    .get(
        async (req, res) => {
            try {
                const foundCategory = await Category.findOne({where: {id: req.params.id}});
                return res.status(200).json({ message: "Ok!", data: foundCategory });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Server error!" })
            }
        }
    )
    .put(
        async (req, res) => {
            try {
                const id = req.params.id;

                const { description } = req.body;

                if (!isWord(description)) {
                    return res.status(400).json({ message: "invalid description!", data: null });
                }

                const updatedCategory = await Category.update({
                    description
                }, {
                    where: { id },
                    returning: true,
                    individualHooks: true
                });

                return res.status(200).json({ message: "Ok"});

            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Server error!" });
            }
        });

module.exports = app => app.use('/categories', router);