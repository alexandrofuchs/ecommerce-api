const { DataTypes } = require('sequelize');
const sequelize = require('../../config/datastore');

const Address = sequelize.define("Address",{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  userId:{
    type: DataTypes.UUID,
    references: { model: 'Users', key: 'id'}
  },
  description:{
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
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
});    


module.exports = Address;

