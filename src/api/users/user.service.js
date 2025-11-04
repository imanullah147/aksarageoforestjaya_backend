const { genSaltSync, hashSync } = require("bcrypt");
const { Op } = require("sequelize");
const model = require("../../models");

class UserService {
  async createUser(data) {
    const existingUser = await model.User.findOne({ where: { email: data.email } });
    if (existingUser) {
      return { success: false, code: 409, message: "Email sudah terdaftar" };
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(data.password, salt);

    const user = await model.User.create({
      email: data.email,
      nama: data.nama,
      password: hashedPassword,
      status: 1,
    });

    return { success: true, code: 201, message: "User berhasil ditambahkan", data: user };
  }

  async editUser(data) {
    const duplicateUser = await model.User.findOne({
      where: { email: data.email, id: { [Op.not]: data.id } },
    });

    if (duplicateUser) {
      return { success: false, code: 409, message: "Email yang anda input sudah terdaftar" };
    }

    const updateData = {
      email: data.email,
      nama: data.nama,
    };

    if (data.password && data.password.trim() !== "") {
      const salt = genSaltSync(10);
      updateData.password = hashSync(data.password, salt);
    }

    await model.User.update(updateData, { where: { id: data.id } });
    return { success: true, code: 200, message: "User berhasil diperbarui" };
  }

  async getUserById(id) {
    const user = await model.User.findByPk(id);
    if (!user) return { success: false, code: 404, message: "User tidak ditemukan" };
    return { success: true, code: 200, data: user };
  }

  async getUserList({ cari = "", page = 0, size = 10, sortField = "id", sortOrder = "ASC" }) {
    const users = await model.User.findAndCountAll({
      where: { email: { [Op.like]: `%${cari}%` } },
      offset: parseInt(page),
      limit: parseInt(size),
      order: [[sortField, sortOrder]],
    });

    return {
      success: true,
      code: 200,
      totalData: users.count,
      limit: size,
      page,
      data: users.rows,
    };
  }

  async deleteUser(id) {
    const deleted = await model.User.destroy({ where: { id } });
    if (!deleted) return { success: false, code: 404, message: "User tidak ditemukan" };
    return { success: true, code: 200, message: "User berhasil dihapus" };
  }

  async aktifUserBanyak(idList) {
    await model.User.update({ status: 1 }, { where: { id: idList } });
    return { success: true, code: 200, message: "User berhasil diaktifkan" };
  }

  async nonAktifUserBanyak(idList) {
    await model.User.update({ status: 0 }, { where: { id: idList } });
    return { success: true, code: 200, message: "User berhasil dinonaktifkan" };
  }
}

module.exports = new UserService();
