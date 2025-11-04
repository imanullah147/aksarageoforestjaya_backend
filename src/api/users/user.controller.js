const userService = require("./user.service");
const response = require("../../utils/response");
const UserRequest = require("./user.request");

module.exports = {
  createUser: async (req, res) => {
    try {
      const userData = UserRequest.parseCreate(req);
      const result = await userService.createUser(userData);

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
      const userData = UserRequest.parseEdit(req);
      const result = await userService.editUser(userData);
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
      const userId = UserRequest.parseGetById(req);
      const result = await userService.getUserById(userId);
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
      const userQuery = UserRequest.parseList(req);
      const result = await userService.getUserList(userQuery);
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
      const userId = UserRequest.parseDelete(req);
      const result = await userService.deleteUser(userId);
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
      const userIds = UserRequest.parseBulk(req);
      const result = await userService.aktifUserBanyak(userIds);
      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, { code: 500, message: "Gagal mengaktifkan user", error: err.message });
    }
  },

  nonAktifUserBanyak: async (req, res) => {
    try {
      const userIds = UserRequest.parseBulk(req);
      const result = await userService.nonAktifUserBanyak(userIds);
      return response.success(res, { message: result.message });
    } catch (err) {
      return response.error(res, { code: 500, message: "Gagal menonaktifkan user", error: err.message });
    }
  },
};
