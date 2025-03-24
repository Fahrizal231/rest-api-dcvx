const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({
      status: 400,
      creator: "Fahrizal",
      message: "Masukkan query!"
    });
  }

  try {
    const response = await axios.get(`https://api.diioffc.web.id/api/ai/alicia`, {
      params: { query }
    });

    const data = response.data;
    if (!data || !data.result) {
      return res.status(404).json({
        status: 404,
        creator: "Fahrizal",
        message: "Tidak ada respons dari Alicia AI."
      });
    }

    res.json({
      status: 200,
      creator: "Fahrizal",
      response: data.result // Langsung ambil teks jawaban dari API
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      creator: "Fahrizal",
      message: "Terjadi kesalahan saat mengambil data."
    });
  }
});

module.exports = router;