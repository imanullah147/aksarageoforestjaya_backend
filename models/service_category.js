'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class service_category extends Model {
    static associate(models) {
      // satu kategori punya banyak service
      service_category.hasMany(models.service, {
        foreignKey: 'category_id',
        as: 'services'
      });
    }
  }

  service_category.init(
    {
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
      }
    },
    {
      sequelize,
      modelName: 'service_category',
      tableName: 'service_categories'
    }
  );

  return service_category;
};
