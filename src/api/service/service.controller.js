const serviceService = require("./service.service");
const response = require("../../utils/response");
const ServiceRequest = require("./service.request");

module.exports = {
  createService: async (req, res) => {
    try {
      const data = ServiceRequest.parseCreate(req);
      const result = await serviceService.createService(data);
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
        message: "Gagal menambahkan service",
        error: err.message,
      });
    }
  },

  updateService: async (req, res) => {
    try {
      const data = ServiceRequest.parseUpdate(req);
      const result = await serviceService.updateService(data.id, data);
      if (!result.success)
        return response.error(res, {
          code: result.code,
          message: result.message,
        });

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
      const serviceId = ServiceRequest.parseGetById(req);
      const result = await serviceService.getServiceById(serviceId);
      if (!result.success)
        return response.error(res, {
          code: result.code,
          message: result.message,
        });

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
      const query = ServiceRequest.parseList(req);
      const result = await serviceService.getAllServices(query);
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
      const serviceId = ServiceRequest.parseDelete(req);
      const result = await serviceService.deleteService(serviceId);
      if (!result.success)
        return response.error(res, {
          code: result.code,
          message: result.message,
        });

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
      const ids = ServiceRequest.parseBulkStatus(req);
      const result = await serviceService.updateStatusMany(
        ids,
        "active"
      );
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
      const ids = ServiceRequest.parseBulkStatus(req);
      const result = await serviceService.updateStatusMany(
        ids,
        "inactive"
      );
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
