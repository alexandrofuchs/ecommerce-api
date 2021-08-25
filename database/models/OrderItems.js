const { DataTypes } = require('sequelize');
const sequelize = require('../../config/datastore');
const Order = require('./Order');
const Product = require('./Product');

const OrderItems = sequelize.define('OrderItems', {
    productId: {
        type: DataTypes.UUID,
        references: {
            model: 'Products',
            key: 'id',
        }
    },
    orderId: {
        type: DataTypes.UUID,
        references: {
            model: 'Orders',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0.00
    }
}, {
    createdAt: true,
});

Order.belongsToMany(Product, { through: OrderItems, as: "items", foreignKey: 'orderId', onDelete: 'RESTRICT' });
Product.belongsToMany(Order, { through: OrderItems, as: "orders", foreignKey: 'productId', onDelete: 'RESTRICT' });

module.exports = OrderItems



