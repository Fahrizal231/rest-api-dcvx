const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
    const text = req.query.text;
    if (!text) {
        return res.status(400).json({ status: 400, error: "Masukkan teks!" });
    }

    try {
        const response = await axios({
            url: `https://aqul-brat.hf.space/api/brat?text=${encodeURIComponent(text)}`,
            method: "GET",
            responseType: "stream", // Ambil gambar sebagai stream
        });

        res.setHeader("Content-Type", "image/png"); // Set header agar dikembalikan sebagai gambar
        response.data.pipe(res); // Kirim gambar langsung ke user
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ status: 500, error: "Terjadi kesalahan!" });
    }
});

module.exports = router;