'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('services', [
      // --- Kategori 1: Pemetaan dan Survey ---
      {
        category_id: 1,
        title: 'Survey Topografi',
        description: 'Pengukuran kontur dan elevasi lahan untuk kebutuhan konstruksi dan perencanaan.',
        icon: 'fa-solid fa-mountain',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 1,
        title: 'Pemetaan Drone',
        description: 'Pemetaan udara menggunakan drone untuk hasil citra akurat dan efisien.',
        icon: 'fa-solid fa-drone',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // --- Kategori 2: Konsultasi Teknis ---
      {
        category_id: 2,
        title: 'Konsultasi Geodesi',
        description: 'Pendampingan proyek geodesi dari awal hingga penyusunan laporan akhir.',
        icon: 'fa-solid fa-ruler',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 2,
        title: 'Konsultasi Pemetaan Wilayah',
        description: 'Konsultasi teknis untuk proyek pemetaan skala besar dan kawasan industri.',
        icon: 'fa-solid fa-map-location-dot',
        status: 'inactive',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // --- Kategori 3: Pengolahan Data ---
      {
        category_id: 3,
        title: 'Analisis Data GIS',
        description: 'Pengolahan dan analisis data spasial menggunakan GIS untuk laporan teknis.',
        icon: 'fa-solid fa-layer-group',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 3,
        title: 'Konversi Format Data',
        description: 'Layanan konversi dan normalisasi format data hasil survey lapangan.',
        icon: 'fa-solid fa-file-import',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('services', null, {});
  }
};
