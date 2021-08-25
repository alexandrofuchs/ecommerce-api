'use strict';

const DataTypes = require('sequelize');

module.exports = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  description:{
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    references: { model: 'Users', key: 'id' }
  },
  street: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  complement: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}
