const model = require("../../models");

class ServiceService {
  // === CREATE SERVICE ===
  async createService(data) {
    const service = await model.Service.create({
      category_id: data.category_id,
      title: data.title,
      description: data.description,
      icon: data.icon,
      status: data.status || 'active',
    });

    return { success: true, code: 201, message: "Service berhasil ditambahkan", data: service };
  }

  // === UPDATE SERVICE ===
  async updateService(id, data) {
    const service = await model.Service.findByPk(id);
    if (!service) {
      return { success: false, code: 404, message: "Service tidak ditemukan" };
    }

    await model.Service.update(data, { where: { id } });
    return { success: true, code: 200, message: "Service berhasil diperbarui" };
  }

  // === GET SERVICE BY ID ===
  async getServiceById(id) {
    const service = await model.Service.findByPk(id, {
      include: [{ model: model.ServiceCategory, as: "category" }],
    });

    if (!service) {
      return { success: false, code: 404, message: "Service tidak ditemukan" };
    }

    return { success: true, code: 200, data: service };
  }

  // === GET ALL SERVICES ===
  async getAllServices({ cari = "", page = 0, size = 10, sortField = "id", sortOrder = "ASC" }) {
    const { Op } = model.Sequelize;

    const services = await model.Service.findAndCountAll({
      where: { title: { [Op.like]: `%${cari}%` } },
      include: [{ model: model.ServiceCategory, as: "category" }],
      offset: parseInt(page),
      limit: parseInt(size),
      order: [[sortField, sortOrder]],
    });

    return {
      success: true,
      code: 200,
      totalData: services.count,
      limit: size,
      page,
      data: services.rows,
    };
  }

  // === DELETE SERVICE ===
  async deleteService(id) {
    const deleted = await model.Service.destroy({ where: { id } });
    if (!deleted) return { success: false, code: 404, message: "Service tidak ditemukan" };

    return { success: true, code: 200, message: "Service berhasil dihapus" };
  }

  // === UBAH STATUS BANYAK SERVICE ===
  async updateStatusMany(ids, status) {
    await model.Service.update({ status }, { where: { id: ids } });
    return {
      success: true,
      code: 200,
      message:
        status === "active"
          ? "Service berhasil diaktifkan"
          : "Service berhasil dinonaktifkan",
    };
  }
}

module.exports = new ServiceService();
