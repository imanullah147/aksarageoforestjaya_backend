'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/database'); // gunakan koneksi dari config

const db = {};
const basename = path.basename(__filename);

// Load semua model dalam folder ini
fs.readdirSync(__dirname)
  .filter((file) => {
    // Pastikan hanya file .js, bukan file hidden atau test
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Setup relasi antar model (jika ada)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
