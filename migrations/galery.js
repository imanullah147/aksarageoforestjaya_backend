"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("galery", {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        field: "url",
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        field: "status",
        allowNull: false,
        defaultValue: 1, // misal 1 = aktif, 0 = nonaktif
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
    return queryInterface.dropTable("galery");
  },
};
