const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    let { text, name, avatar } = req.query;

    // Jika tidak ada teks, minta pengguna memasukkan teks
    if (!text) {
        return res.status(400).json({ status: 400, message: '[ X ] Masukkan text untuk membuat qc!' });
    }

    // Jika nama kosong, tetapkan default
    if (!name) {
        name = "Fahrizal"; // Bisa diganti dengan nama pengguna yang login
    }

    // Jika avatar kosong, gunakan avatar default
    if (!avatar) {
        avatar = "https://files.catbox.moe/3gbpgu.jpg"; // Ganti dengan URL avatar default
    }

    try {
        const apiUrl = `https://api.ryzendesu.vip/api/image/quotly?text=${encodeURIComponent(text)}&name=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatar)}`;

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Terjadi kesalahan saat mengambil gambar.' });
    }
});

module.exports = router;