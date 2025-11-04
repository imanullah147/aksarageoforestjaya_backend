const response = require("../../utils/response");
const ServiceCategoryService = require("./service_category.service");
const ServiceCategoryRequest = require("./service_category.request");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const categoryData = ServiceCategoryRequest.parseCreate(req);
      const result = await ServiceCategoryService.createCategory(categoryData);
      return response.success(res, result);
    } catch (err) {
      return response.error(res, {
        code: 400,
        message: "Gagal menambahkan kategori",
        error: err.message,
      });
    }
  },

  editCategory: async (req, res) => {
    try {
      const categoryData = ServiceCategoryRequest.parseEdit(req);
      const result = await ServiceCategoryService.editCategory(
        categoryData.id,
        categoryData
      );
      return response.success(res, result);
    } catch (err) {
      return response.error(res, {
        code: 400,
        message: "Gagal memperbarui kategori",
        error: err.message,
      });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const id = ServiceCategoryRequest.parseGetById(req);
      const result = await ServiceCategoryService.getCategoryById(id);
      return response.success(res, result);
    } catch (err) {
      return response.error(res, {
        code: 400,
        message: "Gagal mengambil data kategori",
        error: err.message,
      });
    }
  },

  getAllCategory: async (req, res) => {
    try {
      const query = ServiceCategoryRequest.parseList(req);
      const result = await ServiceCategoryService.getAllCategory(query);
      return response.paginated(res, {
        data: result.data,
        total: result.totalData,
        page: result.page,
        limit: result.limit,
      });
    } catch (err) {
      return response.error(res, {
        code: 400,
        message: "Gagal mengambil daftar kategori",
        error: err.message,
      });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const id = ServiceCategoryRequest.parseDelete(req);
      const result = await ServiceCategoryService.deleteCategory(id);
      return response.success(res, result);
    } catch (err) {
      return response.error(res, {
        code: 400,
        message: "Gagal menghapus kategori",
        error: err.message,
      });
    }
  },

  activateMany: async (req, res) => {
    try {
      const ids = ServiceCategoryRequest.parseBulkStatus(req);
      const result = await ServiceCategoryService.updateStatusMany(
        ids,
        "active"
      );
      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal mengaktifkan kategori layanan",
        error: err.message,
      });
    }
  },

  deactivateMany: async (req, res) => {
    try {
      const ids = ServiceCategoryRequest.parseBulkStatus(req);
      const result = await ServiceCategoryService.updateStatusMany(
        ids,
        "inactive"
      );
      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal menonaktifkan kategori layanan",
        error: err.message,
      });
    }
  },
};
