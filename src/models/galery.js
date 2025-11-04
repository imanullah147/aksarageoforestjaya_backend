"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Galery extends Model {
    static associate(models) {}
  }

  Galery.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Galery",
      tableName: "galery",
      timestamps: true, // aktifkan jika ingin ada createdAt & updatedAt
      underscored: true, // kolom jadi snake_case (optional)
    }
  );

  return Galery;
};
