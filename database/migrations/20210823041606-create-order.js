'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Orders', {
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
    await queryInterface.dropTable('Orders');
  }
};