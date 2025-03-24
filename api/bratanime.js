const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/bratanime', async (req, res) => {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({
            status: 400,
            message: "[ X ] Masukkan parameter text",
            creator: "Fahrizal"
        });
    }

    try {
        const response = await axios.get(`https://rest.cloudkuimages.com/api/maker/bratanime?text=${encodeURIComponent(text)}`, {
            responseType: 'arraybuffer'
        });

        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil gambar",
            creator: "Fahrizal"
        });
    }
});

module.exports = router;