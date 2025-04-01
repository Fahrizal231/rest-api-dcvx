const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://apizell.web.id/anime/quoterandom");
    const data = response.data;

    if (!data || !data.data) {
      return res.status(404).json({
        status: 404,
        creator: "Fahrizal",
        message: "Quote tidak ditemukan."
      });
    }

    res.json({
      status: 200,
      creator: "Fahrizal",
      character: data.data.character,
      quote: data.data.quote,
      fromAnime: data.data.fromAnime
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