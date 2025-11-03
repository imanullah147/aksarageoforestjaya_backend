"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("services", {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        field: "category_id",
        allowNull: false,
        references: {
          model: "service_categories", // nama tabel relasi
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: Sequelize.STRING,
        field: "title",
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        field: "description",
        allowNull: true,
      },
      icon: {
        type: Sequelize.STRING,
        field: "icon",
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        field: "status",
        defaultValue: "active",
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "createdAt",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updatedAt",
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("services");
  },
};
