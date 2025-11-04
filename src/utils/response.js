/**
 * Utility response helper
 * Semua response API sebaiknya pakai format ini biar seragam.
 */

const success = (res, { code = 200, message = "Berhasil", data = null, token = null }) => {
  const response = {
    status: "OK",
    berhasil: true,
    pesan: message,
  };

  if (data !== null) response.data = data;
  if (token) response.token = token;

  return res.status(code).json(response);
};

const error = (res, { code = 500, message = "Terjadi kesalahan pada server", error = null }) => {
  const response = {
    status: "ERROR",
    berhasil: false,
    pesan: message,
  };

  if (error) response.error = error.toString();

  return res.status(code).json(response);
};

/**
 * Helper khusus untuk pagination (opsional)
 */
const paginated = (res, { code = 200, message = "Berhasil", data = [], total = 0, page = 1, limit = 10 }) => {
  return res.status(code).json({
    status: "OK",
    berhasil: true,
    pesan: message,
    total,
    page,
    limit,
    data,
  });
};

module.exports = {
  success,
  error,
  paginated,
};
