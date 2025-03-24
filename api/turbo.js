const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ status: 400, message: "Masukkan query untuk AI Turbo!" });
  }

  try {
    const response = await axios.get(`https://api.diioffc.web.id/api/ai/turbo`, {
      params: { query },
    });

    const data = response.data;
    if (!data || !data.result) {
      return res.status(404).json({ status: 404, message: "AI tidak memberikan respons." });
    }

    res.json({
      status: 200,
      creator: "Fahrizal",
      query,
      response: data.result, // Menampilkan respons AI Turbo
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Terjadi kesalahan saat mengambil data." });
  }
});

module.exports = router;