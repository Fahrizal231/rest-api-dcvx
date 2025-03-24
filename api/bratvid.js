const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

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
        const videoUrl = `https://api.betabotz.eu.org/api/maker/brat-video?text=${encodeURIComponent(text)}&apikey=Btz-Fahrizal`;
        const videoPath = path.join(__dirname, "../../public/temp/bratvideo.mp4");

        // Download video ke file sementara
        const response = await axios({
            method: "GET",
            url: videoUrl,
            responseType: "stream",
        });

        const writer = fs.createWriteStream(videoPath);
        response.data.pipe(writer);

        writer.on("finish", () => {
            res.sendFile(videoPath, err => {
                if (!err) {
                    // Hapus file setelah dikirim
                    fs.unlinkSync(videoPath);
                }
            });
        });

        writer.on("error", err => {
            console.error("Download error:", err);
            res.status(500).json({
                status: 500,
                message: "Terjadi kesalahan saat mengambil video",
                creator: "Fahrizal"
            });
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil video",
            creator: "Fahrizal"
        });
    }
});

module.exports = router;