class ServiceCategoryRequest {
  static parseCreate(req) {
    const { title, description, icon } = req.body || {};
    if (!title) throw new Error("Field 'title' wajib diisi");
    return { title, description, icon };
  }

  static parseEdit(req) {
    const { id } = req.params;
    const { title, description, icon } = req.body || {};
    if (!id) throw new Error("Parameter 'id' wajib dikirim");
    if (!title && !description && !icon)
      throw new Error("Minimal kirim salah satu field untuk update");
    return { id, title, description, icon };
  }

  static parseGetById(req) {
    const { id } = req.params;
    if (!id) throw new Error("Parameter 'id' tidak ditemukan");
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
    if (!id) throw new Error("Parameter 'id' wajib ada");
    return id;
  }

  static parseBulkStatus(req) {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new Error("Field 'ids' harus berupa array dan tidak boleh kosong");
    }

    return ids;
  }
}

module.exports = ServiceCategoryRequest;
