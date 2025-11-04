const model = require("../../models");

class GaleryService {
  async createGalery(data) {
    const galery = await model.Galery.create({
      url: data.url,
      status: data.status ?? 1,
    });

    return { success: true, code: 201, message: "Galery berhasil ditambahkan", data: galery };
  }

  async editGalery(id, data) {
    const galery = await model.Galery.findByPk(id);
    if (!galery) {
      return { success: false, code: 404, message: "Galery tidak ditemukan" };
    }

    await model.Galery.update(data, { where: { id } });
    return { success: true, code: 200, message: "Galery berhasil diperbarui" };
  }

  async getGaleryById(id) {
    const galery = await model.Galery.findByPk(id);
    if (!galery) {
      return { success: false, code: 404, message: "Galery tidak ditemukan" };
    }
    return { success: true, code: 200, data: galery };
  }

  async getAllGalery({ cari = "", page = 0, size = 10, sortField = "id", sortOrder = "ASC" }) {
    const galeries = await model.Galery.findAndCountAll({
      where: {
        url: { [model.Sequelize.Op.like]: `%${cari}%` },
      },
      offset: parseInt(page),
      limit: parseInt(size),
      order: [[sortField, sortOrder]],
    });

    return {
      success: true,
      code: 200,
      totalData: galeries.count,
      limit: size,
      page,
      data: galeries.rows,
    };
  }

  async deleteGalery(id) {
    const deleted = await model.Galery.destroy({ where: { id } });
    if (!deleted) return { success: false, code: 404, message: "Galery tidak ditemukan" };

    return { success: true, code: 200, message: "Galery berhasil dihapus" };
  }

  async aktifkanGalery(idList) {
    await model.Galery.update({ status: 1 }, { where: { id: idList } });
    return { success: true, code: 200, message: "Galery berhasil diaktifkan" };
  }

  async nonAktifkanGalery(idList) {
    await model.Galery.update({ status: 0 }, { where: { id: idList } });
    return { success: true, code: 200, message: "Galery berhasil dinonaktifkan" };
  }
}

module.exports = new GaleryService();
