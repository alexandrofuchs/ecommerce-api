'use strict';

const DataTypes = require('sequelize');

module.exports = {
    productId: {
        type: DataTypes.UUID,
        references: {
            model: 'Products',
            key: 'id',
        }
    },
    categoryId: {
        type: DataTypes.UUID,
        references: {
            model: 'Categories',
            key: 'id'
        }
    }
}