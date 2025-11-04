const { service_category } = require("../../models");

module.exports = {
  createServiceCategory: async (data) => {
    try {
      const created = await service_category.create(data);
      return {
        success: true,
        code: 201,
        message: "Kategori service berhasil ditambahkan",
        data: created,
      };
    } catch (err) {
      return {
        success: false,
        code: 500,
        message: "Gagal menambahkan kategori service",
        error: err.message,
      };
    }
  },

  updateServiceCategory: async (id, data) => {
    try {
      const category = await service_category.findByPk(id);
      if (!category)
        return { success: false, code: 404, message: "Kategori service tidak ditemukan" };

      await category.update(data);
      return { success: true, code: 200, message: "Kategori service berhasil diperbarui" };
    } catch (err) {
      return {
        success: false,
        code: 500,
        message: "Gagal memperbarui kategori service",
        error: err.message,
      };
    }
  },

  getServiceCategoryById: async (id) => {
    try {
      const category = await service_category.findByPk(id);
      if (!category)
        return { success: false, code: 404, message: "Kategori service tidak ditemukan" };

      return { success: true, code: 200, data: category };
    } catch (err) {
      return {
        success: false,
        code: 500,
        message: "Gagal mengambil data kategori service",
        error: err.message,
      };
    }
  },

  getAllServiceCategories: async ({ page = 1, limit = 10 }) => {
    try {
      const offset = (page - 1) * limit;
      const { rows, count } = await service_category.findAndCountAll({
        offset,
        limit,
        order: [["createdAt", "DESC"]],
      });

      return {
        success: true,
        data: rows,
        totalData: count,
        page,
        limit,
      };
    } catch (err) {
      return {
        success: false,
        code: 500,
        message: "Gagal mengambil daftar kategori service",
        error: err.message,
      };
    }
  },

  deleteServiceCategory: async (id) => {
    try {
      const category = await service_category.findByPk(id);
      if (!category)
        return { success: false, code: 404, message: "Kategori service tidak ditemukan" };

      await category.destroy();
      return { success: true, code: 200, message: "Kategori service berhasil dihapus" };
    } catch (err) {
      return {
        success: false,
        code: 500,
        message: "Gagal menghapus kategori service",
        error: err.message,
      };
    }
  },

  updateStatusMany: async (ids, status) => {
    try {
      await service_category.update({ status }, { where: { id: ids } });
      return {
        success: true,
        code: 200,
        message: `Kategori service berhasil diperbarui menjadi ${status}`,
      };
    } catch (err) {
      return {
        success: false,
        code: 500,
        message: "Gagal memperbarui status kategori service",
        error: err.message,
      };
    }
  },
};
