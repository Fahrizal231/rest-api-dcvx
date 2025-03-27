const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: false, message: "Masukkan URL YouTube!" });
  }

  try {
    const response = await axios.get("https://api.agatz.xyz/api/ytmp3", {
      params: { url }
    });

    const data = response.data;
    if (!data || !data.data || data.data.length === 0) {
      return res.status(404).json({ status: false, message: "Gagal mengambil data." });
    }

    // Format hasilnya sesuai JSON yang Anda minta
    const mp3Data = {
      status: true,
      Creator: "Fahrizal",
      BK9: {
        id: data.data[0].id || "",
        image: data.data[0].thumbnail || "",
        title: data.data[0].title || "",
        downloadUrl: data.data[0].downloadUrl || ""
      }
    };

    res.json(mp3Data);
  } catch (err) {
    res.status(500).json({ status: false, message: "Terjadi kesalahan saat mengambil data." });
  }
});

module.exports = router;