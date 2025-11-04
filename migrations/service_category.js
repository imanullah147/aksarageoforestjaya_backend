'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('service_categories', {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        field: 'title',
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        field: 'description',
        allowNull: true
      },
      icon: {
        type: Sequelize.STRING,
        field: 'icon',
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'createdAt',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updatedAt',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('service_categories');
  }
};
