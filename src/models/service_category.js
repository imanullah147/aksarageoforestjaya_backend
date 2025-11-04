'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ServiceCategory extends Model {
    static associate(models) {
      ServiceCategory.hasMany(models.Service, {
        foreignKey: 'category_id',
        as: 'services',
      });
    }
  }

  ServiceCategory.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'ServiceCategory',
      tableName: 'service_categories',
      timestamps: true,
      underscored: true,
    }
  );

  return ServiceCategory;
};
