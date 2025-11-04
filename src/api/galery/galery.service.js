const model = require("../../models");
const cloudinary = require("../../config/cloundinary");
const streamifier = require("streamifier");

class GaleryService {
    async createGalery(data) {
    try {
      // Upload ke Cloudinary via stream (langsung dari buffer)
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "galery", resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(data.file.buffer).pipe(stream);
      });

      const galery = await model.Galery.create({
        url: uploadResult.secure_url,
        status: data.status ?? 1,
      });

      return {
        success: true,
        code: 201,
        message: "Galery berhasil ditambahkan",
        data: galery,
      };
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return {
        success: false,
        code: 500,
        message: "Gagal upload ke Cloudinary",
        error: error.message,
      };
    }
  }

  async editGalery(id, data) {
    const galery = await model.Galery.findByPk(id);
    if (!galery) {
      return { success: false, code: 404, message: "Galery tidak ditemukan" };
    }

    let newUrl = galery.url;
    if (data.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "galery", resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(data.file.buffer).pipe(stream);
      });
      newUrl = uploadResult.secure_url;
    }

    await model.Galery.update(
      { url: newUrl, status: data.status ?? galery.status },
      { where: { id } }
    );

    return { success: true, code: 200, message: "Galery berhasil diperbarui" };
  }


  // === GET ===
  async getGaleryById(id) {
    const galery = await model.Galery.findByPk(id);
    if (!galery) {
      return { success: false, code: 404, message: "Galery tidak ditemukan" };
    }
    return { success: true, code: 200, data: galery };
  }

  async getAllGalery({
    cari = "",
    page = 0,
    size = 10,
    sortField = "id",
    sortOrder = "ASC",
  }) {
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
    if (!deleted)
      return { success: false, code: 404, message: "Galery tidak ditemukan" };

    return { success: true, code: 200, message: "Galery berhasil dihapus" };
  }

  async aktifkanGalery(idList) {
    await model.Galery.update({ status: 1 }, { where: { id: idList } });
    return { success: true, code: 200, message: "Galery berhasil diaktifkan" };
  }

  async nonAktifkanGalery(idList) {
    await model.Galery.update({ status: 0 }, { where: { id: idList } });
    return {
      success: true,
      code: 200,
      message: "Galery berhasil dinonaktifkan",
    };
  }
}

module.exports = new GaleryService();
