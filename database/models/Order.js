const { DataTypes } = require('sequelize');
const sequelize = require('../../config/datastore');
const Address = require('./Address');
const Payment = require('./Payment');
const User = require('./user');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    paymentId: {
        type: DataTypes.UUID,
        references: {
            model: 'Payments', key: 'id',
        }
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'Users', key: 'id'
        }
    },
    addressId: {
        type: DataTypes.UUID,
        references: {
            model: 'Addresses', key: 'id'
        }
    }
}, {
    createdAt: true,
});

Order.belongsTo(User, { as: 'orders', foreignKey: 'userId'});
User.hasMany(Order, { as: 'user', foreignKey: 'userId'});

Order.belongsTo(Address, { as: 'address', foreignKey: 'addressId'})


Order.belongsTo(Payment,{  as: 'payment', foreignKey: 'paymentId'});

module.exports = Order



