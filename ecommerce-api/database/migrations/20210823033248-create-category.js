'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Categories', {
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
      description: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Categories');
  }
};