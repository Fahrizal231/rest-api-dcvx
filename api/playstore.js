const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ status: 400, message: 'Masukkan query pencarian!' });

  try {
    const response = await axios.get(`https://vapis.my.id/api/playstore?q=${encodeURIComponent(query)}`);
    const data = response.data.data;

    if (!data || data.length === 0) {
      return res.status(404).json({ status: 404, message: 'Aplikasi tidak ditemukan.' });
    }

    // Filter data yang mengandung query dalam nama aplikasi
    const filteredApps = data.filter(app => app.nama.toLowerCase().includes(query.toLowerCase()));

    if (filteredApps.length === 0) {
      return res.status(404).json({ status: 404, message: 'Aplikasi tidak ditemukan.' });
    }

    // Ambil hasil pertama dari daftar yang sudah difilter
    const bestMatch = filteredApps[0];

    res.json({
      status: 200,
      creator: "Fahrizal",
      name: bestMatch.nama,
      developer: bestMatch.developer,
      rating: bestMatch.rate2,
      icon: bestMatch.img,
      link: bestMatch.link,
      developer_link: bestMatch.link_dev
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Terjadi kesalahan saat mengambil data.' });
  }
});

module.exports = router;