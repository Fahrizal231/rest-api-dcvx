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
        const { data, headers } = await axios.get(
            `https://rest.cloudkuimages.com/api/maker/bratanime?text=${encodeURIComponent(text)}`,
            { responseType: 'arraybuffer' }
        );

        res.setHeader('Content-Type', headers['content-type'] || 'image/png');
        res.send(data);
    } catch (error) {
        console.error("Error fetching image:", error.message);
        
        res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil gambar",
            creator: "Fahrizal"
        });
    }
});

module.exports = router;