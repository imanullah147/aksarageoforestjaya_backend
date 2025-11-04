const express = require("express");
const router = express.Router();

const authRoutes = require("./auth/auth.routes");
const userRoutes = require("./users/user.routes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

module.exports = router;
