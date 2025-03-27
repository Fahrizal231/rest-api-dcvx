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
      params: { url },
    });

    const { data } = response;

    if (!data || !data.BK9 || !data.BK9.BK8) {
      return res.status(404).json({ status: false, message: "Gagal mengambil data." });
    }

    // Cari video dengan resolusi 720p di dalam BK8
    const video720p = data.BK9.BK8.find((video) => video.quality === "720p");

    if (!video720p) {
      return res.status(404).json({ status: false, message: "Video 720p tidak tersedia." });
    }

    res.json({
      status: true,
      creator: "Fahrizal",
      video: {
        title: data.BK9.title || "",
        resolution: video720p.quality,
        format: video720p.format,
        downloadUrl: video720p.link,
      },
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Terjadi kesalahan saat mengambil data." });
  }
});

module.exports = router;