const { DataTypes } = require('sequelize');
const sequelize = require('../../config/datastore');

const Category = sequelize.define("Category",{
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
});    

module.exports = Category;

