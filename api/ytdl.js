const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: false, message: "Masukkan URL YouTube!" });
  }

  try {
    const response = await axios.get("https://bk9.fun/download/youtube", {
      params: { url }
    });

    const data = response.data;
    if (!data || !data.BK9 || !data.BK9.downloadUrl) {
      return res.status(404).json({ status: false, message: "Gagal mengambil data." });
    }

    res.json({
      status: true,
      creator: "Fahrizal",  // Ubah creator menjadi Fahrizal
      video: {
        id: data.BK9.id || "",
        image: data.BK9.image || "",
        title: data.BK9.title || "",
        downloadUrl: data.BK9.downloadUrl || ""
      }
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Terjadi kesalahan saat mengambil data." });
  }
});

module.exports = router;