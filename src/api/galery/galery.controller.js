const galeryService = require("./galery.service");
const response = require("../../utils/response");

module.exports = {
  createGalery: async (req, res) => {
    try {
      const result = await galeryService.createGalery(req.body.data);

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
        message: "Gagal menambahkan galery",
        error: err.message,
      });
    }
  },

  editGalery: async (req, res) => {
    try {
      const result = await galeryService.editGalery(req.params.id, req.body.data);

      if (!result.success)
        return response.error(res, { code: result.code, message: result.message });

      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal memperbarui galery",
        error: err.message,
      });
    }
  },

  getGaleryById: async (req, res) => {
    try {
      const result = await galeryService.getGaleryById(req.params.id);

      if (!result.success)
        return response.error(res, { code: result.code, message: result.message });

      return response.success(res, { data: result.data });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal mengambil data galery",
        error: err.message,
      });
    }
  },

  getAllGalery: async (req, res) => {
    try {
      const result = await galeryService.getAllGalery(req.body);

      return response.paginated(res, {
        data: result.data,
        total: result.totalData,
        page: result.page,
        limit: result.limit,
      });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal mengambil daftar galery",
        error: err.message,
      });
    }
  },

  deleteGalery: async (req, res) => {
    try {
      const result = await galeryService.deleteGalery(req.params.id);

      if (!result.success)
        return response.error(res, { code: result.code, message: result.message });

      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal menghapus galery",
        error: err.message,
      });
    }
  },

  aktifkanGalery: async (req, res) => {
    try {
      const result = await galeryService.aktifkanGalery(req.body.id);
      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal mengaktifkan galery",
        error: err.message,
      });
    }
  },

  nonAktifkanGalery: async (req, res) => {
    try {
      const result = await galeryService.nonAktifkanGalery(req.body.id);
      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, {
        code: 500,
        message: "Gagal menonaktifkan galery",
        error: err.message,
      });
    }
  },
};
