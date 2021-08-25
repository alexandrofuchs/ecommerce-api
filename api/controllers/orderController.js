const express = require('express');
const sequelize = require('../../config/datastore');
const { isEmpty, isWord, isNumeric, isValidUUID } = require('../helpers/validate');
const isAuthenticate = require('../middlewares/isAuthenticate');

const Address = require('../../database/models/Address');
const OrderItems = require('../../database/models/OrderItems');
const Order = require('../../database/models/Order');
const Product = require('../../database/models/Product');
const Payment = require('../../database/models/Payment');
const User = require('../../database/models/User');
const isValidId = require('../middlewares/isValidId');
const isInteger = require('lodash.isinteger');
const { Op } = require('sequelize');
const router = express.Router();

router.use(isAuthenticate);


router.route('/')
    .post(async (req, res) => {
        try {
            const { address, items } = req.body;

            if (isEmpty(address) || isEmpty(items)) {
                return res.status(400).json({ error: 'valores informados inválidos!' });
            }

            let valid_address = null;

            console.log(req.user.id)
            console.log(address.id);

            if (!isValidUUID(req.user.id)) {
                return res.status(400).json({ error: 'id do usuário inválido!' })
            }
      
            if (isValidUUID(address.id)) {
                console.log(address.id);
                valid_address = await Address.findOne({ where: { id: address.id } });
                console.log(valid_address)
            }

            if (!valid_address) {
                return res.status(400).json({ error: 'endereço não encontrado!' })
            }

            const result = await sequelize.transaction(async (t) => {
                const payment = await Payment.create({  transaction: t });
                const order = await Order.create({
                    userId: req.user.id,
                    addressId: valid_address.id,
                    paymentId: payment.id                 
                }, {  transaction: t });
    
                items.map(async (item) => {
                    if (!isInteger(item.quantity) | !isValidUUID(item.productId)) {
                        return res.status(400).json({ error: 'dados de produto invalido!' });
                    }
                    const foundProduct = await Product.findOne({ id: item.productId });
                    if (!foundProduct) {
                        return res.status(400).json({ error: 'produto não encontrado!' });
                    }
                    await order.addItem(
                        foundProduct,
                        {
                            through:
                            {
                                quantity: item.quantity,
                                price: foundProduct.dataValues.price
                            },         
                        });                    
                });   
                
                return order;
              });

            return res.status(201).json({ data: result });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Server Error!' });
        }
    });

router.route('/')
.get(isAuthenticate,async (req, res) => {
    try {
        const foundOrders = await Order.findAll({
            where: { userId: req.user.id },
            attributes: ['createdAt'],
            include: [{
                model: Product,
                as: 'items',
                attributes: ['id', 'name', 'description', 'price'],
                through: { attributes: ['quantity'] }
            }, { model: Address, as: 'address' }, { model: Payment, as:  'payment'}]
        });

        return res.status(200).json({ data: foundOrders });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server Error!' });
    }
})


module.exports = app => app.use('/orders', router)