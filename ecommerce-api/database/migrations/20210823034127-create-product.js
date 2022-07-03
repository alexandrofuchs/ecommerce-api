'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Products', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      url:{
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        defaultValue: 0.00,
        allowNull: false,
      },
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Products');
  }
};