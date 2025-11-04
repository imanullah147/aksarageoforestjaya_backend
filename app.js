require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./src/api");
const { sequelize, connectDatabase } = require("./src/config/database");

const app = express();

// === Middleware ===
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Routes ===
app.use("/api", routes);

// === Default route ===
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

// === Jalankan server ===
const PORT = process.env.APP_PORT || 3000;

(async () => {
  await connectDatabase();
  await sequelize.sync({ alter: false });

  app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  });
})();
