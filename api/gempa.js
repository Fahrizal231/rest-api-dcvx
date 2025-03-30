const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.suraweb.online/info/gempa");
    const data = response.data;

    if (!data || data.code !== 200 || !data.result) {
      return res.status(404).json({
        status: 404,
        creator: "Fahrizal",
        message: "Data gempa tidak ditemukan."
      });
    }

    res.json({
      status: 200,
      creator: "Fahrizal",
      result: {
        caption: data.result.data.caption,
        image: data.result.data.image
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      creator: "Fahrizal",
      message: "Terjadi kesalahan saat mengambil data gempa."
    });
  }
});

module.exports = router;