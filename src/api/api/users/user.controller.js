const { genSaltSync, hashSync } = require("bcrypt");
const { Op } = require("sequelize");
const model = require("../../models");

module.exports = {
  // === CREATE USER ===
  createUser: async (req, res) => {
    try {
      const body = req.body.data;

      // Cek duplikasi email
      const existingUser = await model.user.findOne({
        where: { email: body.email },
      });

      if (existingUser) {
        return res.status(409).json({
          status: "ERROR",
          berhasil: false,
          pesan: "Email sudah terdaftar",
        });
      }

      // Hash password
      const salt = genSaltSync(10);
      const hashedPassword = hashSync(body.password, salt);

      const user = await model.user.create({
        email: body.email,
        nama: body.nama,
        password: hashedPassword,
        role: body.role,
        status: 1,
      });

      res.status(201).json({
        status: "OK",
        berhasil: true,
        pesan: "User berhasil ditambahkan",
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        status: "ERROR",
        berhasil: false,
        pesan: err.message,
        data: {},
      });
    }
  },

  // === EDIT USER ===
  editUser: async (req, res) => {
    try {
      const body = req.body.data;

      // Cek duplikasi email (kecuali dirinya sendiri)
      const duplicateUser = await model.user.findOne({
        where: {
          email: body.email,
          id: { [Op.not]: body.id },
        },
      });

      if (duplicateUser) {
        return res.status(409).json({
          status: "ERROR",
          berhasil: false,
          pesan: "Email yang anda input sudah terdaftar",
        });
      }

      const updateData = {
        email: body.email,
        nama: body.nama,
        role: body.role,
      };

      if (body.password && body.password.trim() !== "") {
        const salt = genSaltSync(10);
        updateData.password = hashSync(body.password, salt);
      }

      await model.user.update(updateData, { where: { id: body.id } });

      res.status(200).json({
        berhasil: true,
        status: "OK",
        pesan: "User berhasil diperbarui",
      });
    } catch (err) {
      res.status(400).json({
        status: "ERROR",
        berhasil: false,
        pesan: err.message,
        data: {},
      });
    }
  },

  // === GET USER BY ID ===
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await model.user.findByPk(id);

      if (!user) {
        return res.status(404).json({
          status: "ERROR",
          berhasil: false,
          pesan: "User tidak ditemukan",
          data: {},
        });
      }

      res.json({
        status: "OK",
        berhasil: true,
        pesan: "",
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        berhasil: false,
        status: "ERROR",
        pesan: err.message,
        data: {},
      });
    }
  },

  // === GET USER LIST ===
  getUser: async (req, res) => {
    try {
      const { cari = "", page = 0, size = 10, sortField = "id", sortOrder = "ASC" } = req.body;

      const users = await model.user.findAndCountAll({
        where: {
          email: { [Op.like]: `%${cari}%` },
        },
        offset: parseInt(page),
        limit: parseInt(size),
        order: [[sortField, sortOrder]],
      });

      if (!users.rows || users.rows.length === 0) {
        return res.json({
          status: "OK",
          berhasil: true,
          pesan: "Data kosong",
          data: [],
        });
      }

      res.json({
        status: "OK",
        berhasil: true,
        totalData: users.count,
        limit: size,
        page: page,
        data: users.rows,
      });
    } catch (err) {
      res.status(500).json({
        berhasil: false,
        status: "ERROR",
        pesan: err.message,
        data: {},
      });
    }
  },

  // === DELETE USER ===
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await model.user.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({
          status: "ERROR",
          pesan: "User tidak ditemukan",
          data: {},
        });
      }

      res.json({
        status: "OK",
        berhasil: true,
        pesan: "User berhasil dihapus",
      });
    } catch (err) {
      res.status(400).json({
        status: "ERROR",
        pesan: err.message,
        data: {},
      });
    }
  },

  // === AKTIFKAN BEBERAPA USER ===
  aktifUserBanyak: async (req, res) => {
    try {
      const { id } = req.body; // bisa array id
      await model.user.update({ status: 1 }, { where: { id } });

      res.json({
        status: "OK",
        berhasil: true,
        pesan: "User berhasil diaktifkan",
      });
    } catch (err) {
      res.status(400).json({
        status: "ERROR",
        pesan: err.message,
        data: {},
      });
    }
  },

  // === NONAKTIFKAN BEBERAPA USER ===
  nonAktifUserBanyak: async (req, res) => {
    try {
      const { id } = req.body; // bisa array id
      await model.user.update({ status: 0 }, { where: { id } });

      res.json({
        status: "OK",
        berhasil: true,
        pesan: "User berhasil dinonaktifkan",
      });
    } catch (err) {
      res.status(400).json({
        status: "ERROR",
        pesan: err.message,
        data: {},
      });
    }
  },
};
