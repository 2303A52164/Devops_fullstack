const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('shopping_db', 'postgres', 'any_password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Set to console.log to see SQL queries
});

module.exports = sequelize;
