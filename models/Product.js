const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Product Name is required.' },
      notEmpty: { msg: 'Product Name cannot be empty.' },
    },
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Category is required.' },
      notEmpty: { msg: 'Category cannot be empty.' },
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notNull: { msg: 'Price is required.' },
      isDecimal: { msg: 'Price must be a valid decimal number.' },
      min: {
        args: [0],
        msg: 'Price must be greater than or equal to 0.',
      },
    },
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: 'Stock Quantity is required.' },
      isInt: { msg: 'Stock Quantity must be a valid integer.' },
      min: {
        args: [0],
        msg: 'Stock Quantity must be greater than or equal to 0.',
      },
    },
  },
}, {
  timestamps: true, // Bonus challenge: adds createdAt and updatedAt
  tableName: 'Products',
});

module.exports = Product;
