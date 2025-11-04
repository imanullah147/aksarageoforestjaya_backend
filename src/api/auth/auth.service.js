const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const model = require("../../models");

class AuthService {
  async login(email, password) {
    const user = await model.User.findOne({
      where: { email, status: 1 },
    });

    if (!user) {
      return { success: false, code: 404, message: "Akun tidak terdaftar" };
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return { success: false, code: 401, message: "Email atau password salah" };
    }

    user.password = undefined;
    const token = sign({ result: user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      success: true,
      code: 200,
      message: "Login berhasil",
      data: { user, token },
    };
  }
}

module.exports = new AuthService();
