const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const tempDir = path.join(__dirname, '../public/temp');

// Pastikan folder temp ada
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

router.get('/', async (req, res) => {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({
            status: 400,
            message: "[ X ] Masukkan parameter text",
            creator: "Fahrizal"
        });
    }

    try {
        const apiUrl = `https://api.betabotz.eu.org/api/maker/brat-video?text=${encodeURIComponent(text)}&apikey=Btz-Fahrizal`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

        const filePath = path.join(tempDir, 'bratvideo.mp4');
        fs.writeFileSync(filePath, response.data);

        res.sendFile(filePath, (err) => {
            if (err) {
                console.error("Error saat mengirim file:", err);
                res.status(500).json({ status: 500, message: "Gagal mengirim video", creator: "Fahrizal" });
            }
            // Hapus file setelah dikirim untuk menghemat penyimpanan
            fs.unlinkSync(filePath);
        });

    } catch (error) {
        console.error("Error fetching video:", error);
        res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil video",
            creator: "Fahrizal"
        });
    }
});

module.exports = router;