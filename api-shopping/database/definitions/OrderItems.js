'use strict';

const DataTypes = require('sequelize');

module.exports = {
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
  }
}

