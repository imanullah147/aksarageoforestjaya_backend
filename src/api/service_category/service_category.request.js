module.exports = {
  parseCreate: (req) => {
    const { name, description, status } = req.body;
    return {
      name,
      description: description || "",
      status: status || "active",
    };
  },

  parseUpdate: (req) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    return {
      id,
      name,
      description,
      status,
    };
  },

  parseGetById: (req) => {
    return req.params.id;
  },

  parseList: (req) => {
    const { page = 1, limit = 10 } = req.query;
    return {
      page: parseInt(page),
      limit: parseInt(limit),
    };
  },

  parseDelete: (req) => {
    return req.params.id;
  },

  parseBulkStatus: (req) => {
    const { ids } = req.body;
    if (!Array.isArray(ids)) throw new Error("Parameter 'ids' harus berupa array");
    return ids;
  },
};
