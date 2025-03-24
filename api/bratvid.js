const express = require('express');
const axios = require('axios');

const router = express.Router();

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
        const response = await axios.get(
            `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isVideo=true&delay=700`,
            { responseType: 'stream' }
        );

        res.setHeader('Content-Type', 'video/mp4');
        response.data.pipe(res);
    } catch (error) {
        console.error("Error fetching video:", error.message);

        res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil video",
            creator: "Fahrizal"
        });
    }
});

module.exports = router;