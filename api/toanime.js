const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { url, prompt } = req.query;

  if (!url || !prompt) {
    return res.status(400).json({ 
      status: 400, 
      creator: "Fahrizal", 
      message: "[ X ] Masukkan URL gambar dan prompt!" 
    });
  }

  try {
    const response = await axios.get("https://api.suraweb.online/ai/toanime", {
      params: { url, prompt }
    });

    const data = response.data;
    if (!data || data.code !== 200 || !data.result) {
      return res.status(404).json({ 
        status: 404, 
        creator: "Fahrizal", 
        message: "Tidak ada hasil dari toAnime." 
      });
    }

    res.json({
      status: 200,
      creator: "Fahrizal",
      result: {
        image: data.result
      }
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500, 
      creator: "Fahrizal", 
      message: "Terjadi kesalahan saat memproses gambar." 
    });
  }
});

module.exports = router;