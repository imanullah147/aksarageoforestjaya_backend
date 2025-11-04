'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('service_categories', [
      {
        title: 'Pemetaan dan Survey',
        description: 'Layanan pemetaan area menggunakan teknologi drone dan survey lapangan presisi.',
        icon: 'fa-solid fa-map',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Konsultasi Teknis',
        description: 'Layanan konsultasi profesional untuk proyek geodesi dan pemetaan.',
        icon: 'fa-solid fa-comments',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Pengolahan Data',
        description: 'Proses dan analisis data hasil survey untuk laporan teknis.',
        icon: 'fa-solid fa-database',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('service_categories', null, {});
  }
};
