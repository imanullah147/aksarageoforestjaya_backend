const serviceCategoryService = require("./service_category.service");
const response = require("../../utils/response");
const ServiceCategoryRequest = require("./service_category.request");

module.exports = {
  createServiceCategory: async (req, res) => {
    try {
      const data = ServiceCategoryRequest.parseCreate(req);
      const result = await serviceCategoryService.createServiceCategory(data);
      if (!result.success)
        return response.error(res, {
          code: result.code,
          message: result.message,
        });

      return response.success(res, {
        code: result.code,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal menambahkan kategori service",
        error: err.message,
      });
    }
  },

  updateServiceCategory: async (req, res) => {
    try {
      const data = ServiceCategoryRequest.parseUpdate(req);
      const result = await serviceCategoryService.updateServiceCategory(data.id, data);
      if (!result.success)
        return response.error(res, {
          code: result.code,
          message: result.message,
        });

      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal memperbarui kategori service",
        error: err.message,
      });
    }
  },

  getServiceCategoryById: async (req, res) => {
    try {
      const categoryId = ServiceCategoryRequest.parseGetById(req);
      const result = await serviceCategoryService.getServiceCategoryById(categoryId);
      if (!result.success)
        return response.error(res, {
          code: result.code,
          message: result.message,
        });

      return response.success(res, { data: result.data });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal mengambil data kategori service",
        error: err.message,
      });
    }
  },

  getAllServiceCategories: async (req, res) => {
    try {
      const query = ServiceCategoryRequest.parseList(req);
      const result = await serviceCategoryService.getAllServiceCategories(query);
      return response.paginated(res, {
        data: result.data,
        total: result.totalData,
        page: result.page,
        limit: result.limit,
      });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal mengambil daftar kategori service",
        error: err.message,
      });
    }
  },

  deleteServiceCategory: async (req, res) => {
    try {
      const categoryId = ServiceCategoryRequest.parseDelete(req);
      const result = await serviceCategoryService.deleteServiceCategory(categoryId);
      if (!result.success)
        return response.error(res, {
          code: result.code,
          message: result.message,
        });

      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal menghapus kategori service",
        error: err.message,
      });
    }
  },

  activateMany: async (req, res) => {
    try {
      const ids = ServiceCategoryRequest.parseBulkStatus(req);
      const result = await serviceCategoryService.updateStatusMany(ids, "active");
      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal mengaktifkan kategori service",
        error: err.message,
      });
    }
  },

  deactivateMany: async (req, res) => {
    try {
      const ids = ServiceCategoryRequest.parseBulkStatus(req);
      const result = await serviceCategoryService.updateStatusMany(ids, "inactive");
      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal menonaktifkan kategori service",
        error: err.message,
      });
    }
  },
};
