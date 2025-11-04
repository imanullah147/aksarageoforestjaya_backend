const model = require("../../models");

class ServiceCategoryService {
  async createCategory(data) {
    const category = await model.ServiceCategory.create(data);
    return {
      success: true,
      code: 201,
      message: "Kategori layanan berhasil ditambahkan",
      data: category,
    };
  }

  async editCategory(id, data) {
    const category = await model.ServiceCategory.findByPk(id);
    if (!category)
      return { success: false, code: 404, message: "Kategori tidak ditemukan" };

    await model.ServiceCategory.update(data, { where: { id } });
    return {
      success: true,
      code: 200,
      message: "Kategori layanan berhasil diperbarui",
    };
  }

  async getCategoryById(id) {
    const category = await model.ServiceCategory.findByPk(id, {
      include: [{ model: model.Service, as: "services" }],
    });

    if (!category)
      return { success: false, code: 404, message: "Kategori tidak ditemukan" };

    return { success: true, code: 200, data: category };
  }

  async getAllCategory({
    cari = "",
    page = 0,
    size = 10,
    sortField = "id",
    sortOrder = "ASC",
  }) {
    const categories = await model.ServiceCategory.findAndCountAll({
      where: {
        title: { [model.Sequelize.Op.iLike]: `%${cari}%` },
      },
      offset: parseInt(page),
      limit: parseInt(size),
      order: [[sortField, sortOrder]],
    });

    return {
      success: true,
      code: 200,
      totalData: categories.count,
      limit: size,
      page,
      data: categories.rows,
    };
  }

  async deleteCategory(id) {
    const deleted = await model.ServiceCategory.destroy({ where: { id } });
    if (!deleted)
      return { success: false, code: 404, message: "Kategori tidak ditemukan" };

    return { success: true, code: 200, message: "Kategori berhasil dihapus" };
  }

  async updateStatusMany(ids, newStatus) {
    const [updatedCount] = await model.ServiceCategory.update(
      { status: newStatus },
      { where: { id: ids } }
    );

    if (!updatedCount) {
      return {
        success: false,
        code: 404,
        message: "Tidak ada kategori yang diperbarui",
      };
    }

    const msg =
      newStatus === "active"
        ? "Beberapa kategori berhasil diaktifkan"
        : "Beberapa kategori berhasil dinonaktifkan";

    return {
      success: true,
      code: 200,
      message: msg,
    };
  }
}

module.exports = new ServiceCategoryService();
