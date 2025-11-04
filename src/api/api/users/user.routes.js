const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  getUserById,
  aktifUserBanyak,
  nonAktifUserBanyak,
  editUser,
  deleteUser,
} = require("../controllers/userController");
const { checkToken } = require("../../middleware/token_validation");

// === ROUTES ===

// Create user (biasanya hanya admin, jadi bisa ditambah checkToken nanti)
router.post("/", checkToken, createUser);

// Get all users (dengan pagination/filter)
router.get("/", checkToken, getUser);

// Get user by ID
router.get("/:id", checkToken, getUserById);

// Update user
router.patch("/:id", checkToken, editUser);

// Delete user
router.delete("/:id", checkToken, deleteUser);

// Activate multiple users
router.patch("/activate/many", checkToken, aktifUserBanyak);

// Deactivate multiple users
router.patch("/deactivate/many", checkToken, nonAktifUserBanyak);

module.exports = router;
