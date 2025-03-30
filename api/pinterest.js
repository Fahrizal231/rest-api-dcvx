const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ 
      status: false, 
      creator: "Fahrizal", 
      message: "[ X ] Masukkan query pencarian!" 
    });
  }

  try {
    const response = await axios.get("https://archive-ui.tanakadomp.biz.id/search/pinterest", {
      params: { q }
    });

    const data = response.data;
    if (!data || !data.result) {
      return res.status(404).json({ 
        status: false, 
        creator: "Fahrizal", 
        message: "Tidak ada hasil ditemukan!" 
      });
    }

    res.json({
      status: true,
      creator: "Fahrizal",
      result: data.result 
    });
  } catch (err) {
    console.error("Error dari API:", err.response?.data || err.message);
    res.status(500).json({ 
      status: false, 
      creator: "Fahrizal", 
      message: "Terjadi kesalahan saat mengambil data." 
    });
  }
});

module.exports = router;