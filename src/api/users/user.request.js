class UserRequest {
  // === CREATE ===
  static parseCreate(req) {
    const { email, nama, password } = req.body || {};

    if (!email || !nama || !password) {
      throw new Error("Field email, nama, dan password wajib diisi");
    }

    return { email, nama, password };
  }

  // === EDIT ===
  static parseEdit(req) {
    const { id, email, nama, password } = req.body || {};

    if (!id) throw new Error("ID user wajib dikirim untuk update");
    if (!nama) throw new Error("Field email dan nama wajib diisi");

    return { id, email, nama, password };
  }

  static parseGetById(req) {
    const { id } = req.params;
    if (!id) throw new Error("Parameter ID tidak ditemukan");
    return id;
  }

  static parseList(req) {
    const {
      cari = "",
      page = 0,
      size = 10,
      sortField = "id",
      sortOrder = "ASC",
    } = req.query || {};

    // pastikan integer untuk page dan size
    return {
      cari,
      page: parseInt(page, 10),
      size: parseInt(size, 10),
      sortField,
      sortOrder: sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC",
    };
  }

  static parseDelete(req) {
    const { id } = req.params;
    if (!id) throw new Error("Parameter ID wajib ada");
    return id;
  }

  static parseBulk(req) {
    const { id } = req.body;
    if (!id || !Array.isArray(id) || id.length === 0) {
      throw new Error("Field 'id' harus berupa array dan tidak boleh kosong");
    }
    return id;
  }
}

module.exports = UserRequest;
