'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // Tidak ada asosiasi
    static associate(models) {}
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: true, // biarin tetap ada kolom role, tapi tanpa relasi ke model lain
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'User',   // Nama model (class)
      tableName: 'users',  // Nama tabel di DB
      timestamps: true,    // created_at & updated_at otomatis
      underscored: true,   // gunakan snake_case
    }
  );

  return User;
};
