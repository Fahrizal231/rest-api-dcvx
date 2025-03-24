const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { kota } = req.query;

  if (!kota) {
    return res.status(400).json({ status: 400, message: "Masukkan nama kota!" });
  }

  try {
    const response = await axios.get(`https://api.agatz.xyz/api/jadwalsholat`, {
      params: { kota },
    });

    const data = response.data;
    if (!data || !data.jadwal) {
      return res.status(404).json({ status: 404, message: "Jadwal sholat tidak ditemukan." });
    }

    res.json({
      status: 200,
      creator: "Fahrizal",
      kota,
      jadwal: data.jadwal, // Menampilkan jadwal sholat
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Terjadi kesalahan saat mengambil data." });
  }
});

module.exports = router;