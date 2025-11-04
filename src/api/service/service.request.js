class ServiceRequest {
  // === CREATE ===
  static parseCreate(req) {
    const { category_id, title, description, status } = req.body || {};

    if (!category_id) throw new Error("Field 'category_id' wajib diisi");
    if (!title) throw new Error("Field 'title' wajib diisi");

    return {
      category_id: parseInt(category_id, 10),
      title: title.trim(),
      description: description?.trim() || null,
      status: status?.toLowerCase() || "active",
    };
  }

  // === UPDATE ===
  static parseUpdate(req) {
    const { id } = req.params;
    const { category_id, title, description, status } = req.body || {};

    if (!id) throw new Error("Parameter 'id' wajib dikirim");

    return {
      id: parseInt(id, 10),
      category_id: category_id ? parseInt(category_id, 10) : undefined,
      title: title?.trim(),
      description: description?.trim(),
      status: status?.toLowerCase(),
    };
  }

  // === GET BY ID ===
  static parseGetById(req) {
    const { id } = req.params;
    if (!id) throw new Error("Parameter 'id' wajib ada");
    return parseInt(id, 10);
  }

  // === GET LIST ===
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
    if (!id) throw new Error("Parameter 'id' wajib ada");
    return parseInt(id, 10);
  }

  // === BULK STATUS UPDATE ===
  static parseBulkStatus(req) {
    const { ids, status } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new Error("Field 'ids' harus berupa array dan tidak boleh kosong");
    }
    if (!status || !["active", "inactive"].includes(status.toLowerCase())) {
      throw new Error("Field 'status' harus bernilai 'active' atau 'inactive'");
    }

    return {
      ids,
      status: status.toLowerCase(),
    };
  }
}

module.exports = ServiceRequest;
