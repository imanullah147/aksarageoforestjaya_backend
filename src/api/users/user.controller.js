const userService = require("./user.service");
const response = require("../../utils/response");

module.exports = {
  createUser: async (req, res) => {
    try {
      const result = await userService.createUser(req.body.data);

      if (!result.success) {
        return response.error(res, { code: result.code, message: result.message });
      }

      return response.success(res, {
        code: result.code,
        message: result.message,
        data: result.data,
      });
    } catch (err) {
      return response.error(res, { code: 500, message: "Gagal menambahkan user", error: err.message });
    }
  },

  editUser: async (req, res) => {
    try {
      const result = await userService.editUser(req.body.data);
      if (!result.success) {
        return response.error(res, { code: result.code, message: result.message });
      }

      return response.success(res, { code: 200, message: result.message });
    } catch (err) {
      return response.error(res, { code: 500, message: "Gagal memperbarui user", error: err.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const result = await userService.getUserById(req.params.id);
      if (!result.success) {
        return response.error(res, { code: result.code, message: result.message });
      }

      return response.success(res, { data: result.data });
    } catch (err) {
      return response.error(res, { code: 500, message: "Gagal mengambil data user", error: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const result = await userService.getUserList(req.body);
      return response.paginated(res, {
        data: result.data,
        total: result.totalData,
        page: result.page,
        limit: result.limit,
      });
    } catch (err) {
      return response.error(res, { code: 500, message: "Gagal mengambil data user", error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await userService.deleteUser(req.params.id);
      if (!result.success) {
        return response.error(res, { code: result.code, message: result.message });
      }

      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, { code: 500, message: "Gagal menghapus user", error: err.message });
    }
  },

  aktifUserBanyak: async (req, res) => {
    try {
      const result = await userService.aktifUserBanyak(req.body.id);
      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, { code: 500, message: "Gagal mengaktifkan user", error: err.message });
    }
  },

  nonAktifUserBanyak: async (req, res) => {
    try {
      const result = await userService.nonAktifUserBanyak(req.body.id);
      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, { code: 500, message: "Gagal menonaktifkan user", error: err.message });
    }
  },
};
