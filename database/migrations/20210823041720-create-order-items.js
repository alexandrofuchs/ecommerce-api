'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('OrderItems', {
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
      quantity:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
      },
      price:{
        type: DataTypes.FLOAT,
        defaultValue: 0.00
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('OrderItems');
  }
};