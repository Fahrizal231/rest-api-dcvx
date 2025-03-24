const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({
            status: 400,
            message: "[ X ] Masukkan parameter text",
            creator: "Fahrizal"
        });
    }

    try {
        const response = await axios.get(
            `https://api.betabotz.eu.org/api/maker/brat-video?text=${encodeURIComponent(text)}&apikey=Btz-Fahrizal`,
            { responseType: "arraybuffer" }
        );

        res.setHeader("Content-Type", "video/mp4");
        res.send(response.data);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil video",
            creator: "Fahrizal"
        });
    }
});

module.exports = router;