const serviceService = require("./service.service");
const response = require("../../utils/response");

module.exports = {
  createService: async (req, res) => {
    try {
      const result = await serviceService.createService(req.body.data);
      if (!result.success)
        return response.error(res, { code: result.code, message: result.message });

      return response.success(res, {
        code: result.code,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal menambahkan service",
        error: err.message,
      });
    }
  },

  updateService: async (req, res) => {
    try {
      const result = await serviceService.updateService(req.params.id, req.body.data);
      if (!result.success)
        return response.error(res, { code: result.code, message: result.message });

      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal memperbarui service",
        error: err.message,
      });
    }
  },

  getServiceById: async (req, res) => {
    try {
      const result = await serviceService.getServiceById(req.params.id);
      if (!result.success)
        return response.error(res, { code: result.code, message: result.message });

      return response.success(res, { data: result.data });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal mengambil data service",
        error: err.message,
      });
    }
  },

  getAllServices: async (req, res) => {
    try {
      const result = await serviceService.getAllServices(req.body);
      return response.paginated(res, {
        data: result.data,
        total: result.totalData,
        page: result.page,
        limit: result.limit,
      });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal mengambil daftar service",
        error: err.message,
      });
    }
  },

  deleteService: async (req, res) => {
    try {
      const result = await serviceService.deleteService(req.params.id);
      if (!result.success)
        return response.error(res, { code: result.code, message: result.message });

      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal menghapus service",
        error: err.message,
      });
    }
  },

  activateMany: async (req, res) => {
    try {
      const result = await serviceService.updateStatusMany(req.body.id, "active");
      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal mengaktifkan service",
        error: err.message,
      });
    }
  },

  deactivateMany: async (req, res) => {
    try {
      const result = await serviceService.updateStatusMany(req.body.id, "inactive");
      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal menonaktifkan service",
        error: err.message,
      });
    }
  },
};
