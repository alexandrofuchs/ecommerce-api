'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config  = require('../config/database.json')[env];
const db = {};

const connection = config.use_env_variable ? 
  new Sequelize(process.env[config.use_env_variable], config) :
  new Sequelize(config.database, config.username, config.password, config);

const definitions = require('./definitions');
const models = {};
for(const name in definitions) {
  models[name] = connection.define(name, definitions[name]);
}

module.exports = {
  connection, models
};