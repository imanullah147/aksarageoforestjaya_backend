'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class galery extends Model {
    static associate(models) {

      galery.hasOne(models.role, { sourceKey: 'role', foreignKey: { name: 'id' }, as: 'roleUser' })
    }
  };
  galery.init({
    url: DataTypes.STRING,
    status: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'galery',
    tableName: 'galery'

  });
  return galery;
};