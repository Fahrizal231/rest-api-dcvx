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
      params: { url, prompt },
      responseType: "arraybuffer" // Mengambil respons dalam bentuk gambar
    });

    res.setHeader("Content-Type", "image/jpeg"); // Set header agar browser menampilkan gambar
    res.send(response.data); // Kirim gambar langsung ke pengguna
  } catch (err) {
    console.error("Error dari API:", err.response?.data || err.message);
    res.status(500).json({ 
      status: 500, 
      creator: "Fahrizal", 
      message: "Terjadi kesalahan saat memproses gambar."
    });
  }
});

module.exports = router;