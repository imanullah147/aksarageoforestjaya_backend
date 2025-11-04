const galeryService = require("./galery.service");
const response = require("../../utils/response");
const GaleryRequest = require("./galery.request");

module.exports = {
  createGalery: async (req, res) => {
    try {
      const galeryData = GaleryRequest.parseCreate(req);
      const result = await galeryService.createGalery(galeryData);

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
        message: "Gagal menambahkan galery",
        error: err.message,
      });
    }
  },

  editGalery: async (req, res) => {
    try {
      const galeryData = GaleryRequest.parseEdit(req);
      const result = await galeryService.editGalery(galeryData.id, galeryData);

      if (!result.success)
        return response.error(res, {
          code: result.code,
          message: result.message,
        });

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
      const galeryId = GaleryRequest.parseGetById(req);
      const result = await galeryService.getGaleryById(galeryId);

      if (!result.success)
        return response.error(res, {
          code: result.code,
          message: result.message,
        });

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
      const galeryQuery = GaleryRequest.parseList(req);
      const result = await galeryService.getAllGalery(galeryQuery);

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
      const galeryId = GaleryRequest.parseDelete(req);
      const result = await galeryService.deleteGalery(galeryId);

      if (!result.success)
        return response.error(res, {
          code: result.code,
          message: result.message,
        });

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
      const galeryIds = GaleryRequest.parseBulk(req);
      const result = await galeryService.aktifkanGalery(galeryIds);
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
      const galeryIds = GaleryRequest.parseBulk(req);
      const result = await galeryService.nonAktifkanGalery(galeryIds);
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
