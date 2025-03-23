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

    const randomApp = data[Math.floor(Math.random() * data.length)];

    res.json({
      status: 200,
      creator:"Fahrizal",
      name: randomApp.nama,
      developer: randomApp.developer,
      rating: randomApp.rate2,
      icon: randomApp.img,
      link: randomApp.link,
      developer_link: randomApp.link_dev
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Terjadi kesalahan saat mengambil data.' });
  }
});

module.exports = router;