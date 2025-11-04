'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('galery', [
      {
        url: 'uploads/galery1.jpg',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'uploads/galery2.jpg',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'uploads/galery3.jpg',
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('galery', null, {});
  }
};
