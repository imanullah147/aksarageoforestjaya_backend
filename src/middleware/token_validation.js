require("dotenv").config();
const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    try {
      let token = req.headers["authorization"];

      if (!token) {
        return res.status(403).json({
          success: false,
          message: "Akses ditolak! Token tidak ditemukan.",
        });
      }

      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
      }

      verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Token tidak valid atau sudah kadaluarsa.",
          });
        }

        req.user = decoded?.result || decoded;
        next();
      });
    } catch (error) {
      console.error("JWT Verification Error:", error);
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada verifikasi token.",
      });
    }
  },
};
