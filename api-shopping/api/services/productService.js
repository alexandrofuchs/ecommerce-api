const Product = require('../../database/models/Product');
const Category = require('../../database/models/Category');
const { maxAndMinLength, isValidPrice } = require('../helpers/validate');
const ProductCategories = require('../../database/models/ProductCategories');
const { Op } = require('sequelize');
const sequelize = require('../../config/datastore');

const createOrUpdate = async (req, res) => {
    try {
        const { name, price, description, categories } = req.body;
        const errors = []

        if (!!description) {
            if (!maxAndMinLength(description, 3, 500)) {
                errors.push({ field: 'description', error: 'deve conter entre 3 e 100 caracteres!' });
            }
        }

        if (!isValidPrice(price)) {
            errors.push({ field: 'price', error: 'preço invalido' });
        }

        if (!maxAndMinLength(name, 3, 100)) {
            errors.push({ field: "name", error: "deve conter entre 3 e 100 caracteres e conter apenas letras ou números" })
        } else {
            const foundProduct = await Product.findOne({ where: { name } });
            if (!!foundProduct && foundProduct.id !== req.params.id) {
                errors.push({ field: 'name', error: 'nome do produto já cadastrado!' });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ error: [ ...errors ] });
        }

        if (!!req.params.id) {
            

            const result = await sequelize.transaction(async (t) => {
                const createdProduct = await Product.update({
                    name, price, description
                }, {
                    where: { id: req.params.id },                
                }, { transaction: t });            
                return createdProduct;
              });

            return res.status(204).json();
        } else {
            const result = await sequelize.transaction(async (t) => {
                const createdProduct = await Product.create({
                    name, price, description
                }, { transaction: t });            
                categories.forEach(async ({ description }) => {
                    const foundCat = await Category.findOrCreate({ where: { description }}); 
                    await createdProduct.addCategory(foundCat[0]);
                });
                return createdProduct;
              });
            return res.status(201).json({ data: result });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

const findById = async (req, res) => {
        try {
            const foundProduct = await Product.findOne({ 
                where: {id: req.params.id}, 
                include: {
                    model: Category,
                    attributes: ['id', 'description'],
                    as: 'categories',
                    through: { attributes: []}}});

            if(!foundProduct){
                return res.status(400).json({ error: 'não encontrado!' });
            }

            return res.status(200).json({ data: foundProduct });
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({ message: "Server error!" });
        }
    }

const findAll = async (req,res) => {
    try {
        const foundProducts = await Product.findAll({include: {
            model: Category,
            attributes: ['id', 'description'],
            as: 'categories',
            through: { attributes: []}}});
        return res.status(200).json({ data: foundProducts});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: ' Server Error '});
    }
}
const remove = async (req, res) => {
    try {
        const removedProduct = await Product.destroy({ where: {id: req.params.id} });
        return res.status(200).json({ data: removedProduct });
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({ message: "Server error!" });
    }
}

module.exports = { createOrUpdate, findById, findAll, remove }


