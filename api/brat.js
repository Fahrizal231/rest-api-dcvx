const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
    const text = req.query.text;

    if (!text) {
        return res.status(400).json({
            status: 400,
            creator: "AciooBot",
            error: "Masukkan parameter text!"
        });
    }

    try {
        const { data } = await axios.get(`https://aqul-brat.hf.space/api/brat?text=${encodeURIComponent(text)}`);

        if (!data || (!data.image && !data.result)) {
            return res.status(500).json({
                status: 500,
                creator: "AciooBot",
                error: "Gagal mendapatkan data dari API."
            });
        }

        res.json({
            status: 200,
            creator: "AciooBot",
            source: text,
            brat_image: data.image || data.result // Gunakan image jika ada
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({
            status: 500,
            creator: "AciooBot",
            error: "Terjadi kesalahan, coba lagi nanti!"
        });
    }
});

module.exports = router;