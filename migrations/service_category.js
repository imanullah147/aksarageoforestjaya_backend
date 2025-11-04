"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("service_categories", {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("service_categories");
  },
};
