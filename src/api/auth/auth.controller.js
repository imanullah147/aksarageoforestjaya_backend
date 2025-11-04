const authService = require("./auth.service");
const response = require("../../utils/response");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return response.error(res, {
          code: 400,
          message: "Email dan password wajib diisi",
        });
      }

      const result = await authService.login(email, password);

      if (!result.success) {
        return response.error(res, {
          code: result.code,
          message: result.message,
        });
      }

      return response.success(res, {
        code: 200,
        message: result.message,
        data: result.data.user,
        token: result.data.token,
      });
    } catch (error) {
      return response.error(res, {
        code: 500,
        message: "Terjadi kesalahan pada server",
        error: error.message,
      });
    }
  },
};
