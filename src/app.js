require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models"); // koneksi Sequelize
const routes = require("./api"); // auto-load semua route di folder api/

const app = express();

// === Middleware ===
app.use(
  cors({
    origin: "*", // ubah sesuai kebutuhan misal ['http://localhost:3000']
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === API Routes ===
app.use("/api", routes);

// === Health check route ===
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "🌿 Aksara Geoforest Jaya API is running 🚀",
  });
});

// === 404 handler ===
app.use((req, res) => {
  res.status(404).json({
    status: "ERROR",
    message: "Endpoint tidak ditemukan",
  });
});

// === Jalankan server & koneksi DB ===
const PORT = process.env.APP_PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    // Sinkronisasi model (non-destruktif)
    await sequelize.sync({ alter: false });

    app.listen(PORT, () =>
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Gagal terhubung ke database:", err.message);
    process.exit(1);
  }
})();
