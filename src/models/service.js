'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class service extends Model {
    static associate(models) {
      // setiap service milik satu kategori
      service.belongsTo(models.service_category, {
        foreignKey: 'category_id',
        as: 'category'
      });
    }
  }

  service.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
      }
    },
    {
      sequelize,
      modelName: 'service',
      tableName: 'services'
    }
  );

  return service;
};
