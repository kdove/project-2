'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
//  var sequelize = new Sequelize(process.env.JAWSDB_URL, { //[config.use_env_variable], {
//    "dialect": "mysql"
 // });
 var sequelize = new Sequelize(
   config.database, 
   config.username, 
   config.password,
  config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
  //var sequelize = new Sequelize(
  //  "mysql://dttid9vau3gczr9x:bt99stnxnfsc7tqd@sulnwdk5uwjw1r2k.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ujn0nqes4dk29jci", { //[config.use_env_variable], {
   // "dialect": "mysql"
  //});
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
