const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    let { text, name, avatar } = req.query;

    if (!text) {
        return res.status(400).json({ status: 400, message: 'Masukkan text untuk kutipan!' });
    }

    name = name || "Fahrizal"; // Default name
    avatar = avatar || "https://files.catbox.moe/3gbpgu.jpg"; // Default avatar

    try {
        const apiUrl = `https://api.ryzendesu.vip/api/image/quotly?text=${encodeURIComponent(text)}&name=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatar)}`;

        const response = await axios.get(apiUrl, {
            responseType: 'arraybuffer',
        });

        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Terjadi kesalahan saat mengambil gambar.' });
    }
});

module.exports = router;