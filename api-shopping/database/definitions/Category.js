'use strict';

const DataTypes = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }
},{
  createdAt: true,
  updatedAt: true,
}
