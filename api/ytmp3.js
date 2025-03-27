const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: 400, message: "Masukkan URL YouTube!" });
  }

  try {
    const response = await axios.get("https://api.agatz.xyz/api/ytmp3", {
      params: { url },
    });

    const data = response.data;
    if (!data || !data.data) {
      return res.status(404).json({ status: 404, message: "Gagal mengambil data audio." });
    }

    res.json({
      status: 200,
      creator: "Fahrizal",
      data: data.data, // Menampilkan data dari API Agatz tanpa modifikasi
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Terjadi kesalahan saat mengambil data." });
  }
});

module.exports = router;