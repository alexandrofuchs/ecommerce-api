const { DataTypes } = require('sequelize');
const sequelize = require('../../config/datastore');
const Address = require('./Address');
const bcrypt = require('bcryptjs');
const Order = require('./Order');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: true,
  updatedAt: true,
});

User.beforeCreate(async ({ dataValues }) => {
  let encryptedPassword = await bcrypt.hash(dataValues.password, 12);
  dataValues.password = encryptedPassword;
})

User.hasMany(Address, { as: 'addresses', foreignKey: 'userId' });

module.exports = User;

