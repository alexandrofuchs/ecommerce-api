const { DataTypes } = require('sequelize');
const sequelize = require('../../config/datastore');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    url:{
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0.00,
        allowNull: false,
    }
});

module.exports = Product



