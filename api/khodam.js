const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const nama = req.query.nama;
  if (!nama) return res.status(400).json({ status: 400, message: 'Masukkan nama untuk cek khodam!' });

  try {
    const response = await axios.get(`https://api.ownblox.biz.id/api/cekkhodam?nama=${encodeURIComponent(nama)}`);
    const data = response.data;

    if (!data || !data.result) {
      return res.status(404).json({ status: 404, message: 'Khodam tidak ditemukan.' });
    }

    res.json({
      status: 200,
      creator: "Fahrizal",
      nama: nama,
      khodam: data.result // Langsung ambil teks deskripsinya
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Terjadi kesalahan saat mengambil data.' });
  }
});

module.exports = router;