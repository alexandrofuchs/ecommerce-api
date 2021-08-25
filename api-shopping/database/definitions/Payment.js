'use strict';

const DataTypes = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid'),
        defaultValue: 'pending'
    },
},{
  createdAt: true,
  updatedAt: true,
}
