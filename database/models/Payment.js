const { DataTypes } = require('sequelize');
const sequelize = require('../../config/datastore');
const Order = require('./Order');
const Product = require('./Product');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'cancelled'),
        defaultValue: 'pending'
    }
}, {
    createdAt: true,
    updatedAt: true,
});


module.exports = Payment



