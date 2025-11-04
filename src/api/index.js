const express = require("express");
const router = express.Router();

// Import modular routes
const authRoutes = require("./auth/auth.routes");
const userRoutes = require("./users/user.routes");
const galeryRoutes = require("./galery/galery.routes");
const serviceRoutes = require("./service/service.routes");

// === REGISTER ROUTES ===
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/galery", galeryRoutes);
router.use("/services", serviceRoutes);

// === EXPORT ===
module.exports = router;
