const { DataTypes } = require('sequelize');
const sequelize = require('../../config/datastore');
const Category = require("./Category");
const Product = require("./Product");

const ProductCategories = sequelize.define('ProductCategories', {
  productId: {
    type: DataTypes.UUID,
    references: {
      model: Product, 
      key: 'id',      
    }
  },
  categoryId: {
    type: DataTypes.UUID,
    references: {
      model: Category, 
      key: 'id'
    }
  }
});
Category.belongsToMany(Product, { through: ProductCategories, as: "products", foreignKey: 'categoryId', onDelete: 'RESTRICT' });
Product.belongsToMany(Category, { through: ProductCategories, as: "categories", foreignKey: 'productId', onDelete: 'CASCADE' });

module.exports = ProductCategories;