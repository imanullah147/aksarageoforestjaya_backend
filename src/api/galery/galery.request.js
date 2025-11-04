class GaleryRequest {
  // === CREATE ===
  static parseCreate(req) {
    const file = req.file; // diisi oleh multer
    const status = req.body?.status ?? 1;

    if (!file) {
      throw new Error("File gambar wajib diupload (form-data field: photo)");
    }

    return { file, status };
  }

  // === EDIT ===
  static parseEdit(req) {
    const { id } = req.params;
    const file = req.file;
    const status = req.body?.status;

    if (!id) throw new Error("Parameter 'id' wajib dikirim");
    if (!file && typeof status === "undefined") {
      throw new Error("Minimal kirim salah satu: file atau status");
    }

    return { id, file, status };
  }

  // === GET BY ID ===
  static parseGetById(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Parameter 'id' tidak ditemukan");
    }
    return id;
  }

  // === LIST (GET) ===
  static parseList(req) {
    const {
      cari = "",
      page = 0,
      size = 10,
      sortField = "id",
      sortOrder = "ASC",
    } = req.query || {};

    return {
      cari,
      page: parseInt(page, 10),
      size: parseInt(size, 10),
      sortField,
      sortOrder: sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC",
    };
  }

  // === DELETE ===
  static parseDelete(req) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Parameter 'id' wajib ada");
    }
    return id;
  }

  // === BULK AKTIF/NONAKTIF ===
  static parseBulk(req) {
    const { id } = req.body;
    if (!id || !Array.isArray(id) || id.length === 0) {
      throw new Error("Field 'id' harus berupa array dan tidak boleh kosong");
    }
    return id;
  }
}

module.exports = GaleryRequest;
