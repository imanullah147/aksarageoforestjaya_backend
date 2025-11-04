'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      // setiap service milik satu kategori
      Service.belongsTo(models.ServiceCategory, {
        foreignKey: 'category_id',
        as: 'category',
      });
    }
  }

  Service.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      modelName: 'Service',
      tableName: 'services',
      timestamps: true,
      underscored: true,
    }
  );

  return Service;
};
