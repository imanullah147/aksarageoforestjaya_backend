const multer = require("multer");

const storage = multer.memoryStorage(); // Simpan sementara di RAM

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, photo, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(photo.mimetype)) {
      return cb(new Error("Hanya photo JPG/PNG yang diperbolehkan"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
