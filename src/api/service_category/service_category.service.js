const model = require("../../models");
const cloudinary = require("../../config/cloundinary");
const streamifier = require("streamifier");
class ServiceCategoryService {
  async createCategory(data) {
    try {
      let iconUrl = null;

      // Upload icon ke Cloudinary kalau ada file
      if (data.file) {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "service-category",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(data.file.buffer).pipe(stream);
        });

        iconUrl = uploadResult.secure_url;
      }

      const category = await model.ServiceCategory.create({
        title: data.title,
        description: data.description,
        icon: iconUrl,
      });

      return {
        success: true,
        code: 201,
        message: "Kategori layanan berhasil ditambahkan",
        data: category,
      };
    } catch (error) {
      console.error("Error createCategory:", error);
      return {
        success: false,
        code: 500,
        message: "Gagal menambahkan kategori layanan",
        error: error.message,
      };
    }
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
    try {
      const categories = await model.ServiceCategory.findAndCountAll({
        where: {
          title: { [model.Sequelize.Op.iLike]: `%${cari}%` },
        },
        include: [
          {
            model: model.Service,
            as: "services",
            attributes: ["id", "title", "description", "status"], // pilih field yang ingin ditampilkan
            where: { status: "active" }, // opsional: hanya tampilkan service aktif
            required: false, // agar kategori tanpa service tetap muncul
          },
        ],
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
    } catch (error) {
      console.error("Error fetching categories:", error);
      return {
        success: false,
        code: 500,
        message: "Gagal memuat data kategori",
        error: error.message,
      };
    }
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
