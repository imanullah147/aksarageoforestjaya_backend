require("dotenv").config();
const model = require("../../models");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await model.user.findOne({
        where: { email, status: 1 },
      });

      if (!user) {
        return res.status(404).json({
          berhasil: false,
          pesan: "Akun tidak terdaftar",
        });
      }

      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          berhasil: false,
          pesan: "Email atau password salah",
        });
      }

      user.password = undefined; 

      const token = sign(
        { result: user },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        berhasil: true,
        pesan: "Login berhasil",
        data: user,
        token,
      });
    } catch (err) {
      console.error("Login error:", err);

      return res.status(500).json({
        berhasil: false,
        pesan: "Terjadi kesalahan pada server",
        error: err.message,
      });
    }
  },
};
