'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('ProductCategories', {
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
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
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ProductCategories');
  }
};