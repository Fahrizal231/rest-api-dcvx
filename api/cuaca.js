const express = require("express");
const axios = require("axios");

const router = express.Router();

const csvUrl =
  "https://raw.githubusercontent.com/kodewilayah/permendagri-72-2019/main/dist/base.csv";
let dataWilayah = null;

// Parse CSV menjadi array objek { kode, nama }
const parseCSV = (csv) => {
  return csv.split("\n").map((line) => {
    const [kode, nama] = line.split(",");
    return { kode: kode.trim(), nama: nama?.trim() };
  });
};

// Fetch data wilayah dari sumber CSV
const fetchData = async () => {
  try {
    const response = await axios.get(csvUrl);
    dataWilayah = parseCSV(response.data);
    console.log("Data wilayah berhasil di-fetch.");
  } catch (error) {
    console.error("Gagal mengambil data wilayah:", error);
  }
};

// Cari wilayah berdasarkan query
const searchWilayah = async (query) => {
  if (!dataWilayah) {
    await fetchData();
  }

  const queryWords = query.toLowerCase().split(" ");
  return dataWilayah.filter((item) => {
    const searchString = `${item.kode} ${item.nama}`.toLowerCase();
    return queryWords.every((word) => searchString.includes(word));
  });
};

// Endpoint: /api/wilayah?query=nama_wilayah
router.get("/", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query tidak boleh kosong" });

  const results = await searchWilayah(query);
  if (results.length === 0)
    return res.status(404).json({ error: "Wilayah tidak ditemukan" });

  res.json({ status: "success", results });
});

// Endpoint: /api/wilayah/cuaca?query=nama_wilayah
router.get("/cuaca", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query tidak boleh kosong" });

  const results = await searchWilayah(query);
  const wilayah = results.find((item) => item.kode.split(".").length === 4);

  if (!wilayah) return res.status(404).json({ error: "Wilayah tidak ditemukan" });

  try {
    const { data } = await axios.get(
      `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${wilayah.kode}`
    );
    res.json({ status: "success", wilayah, cuaca: data });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data cuaca dari BMKG" });
  }
});

module.exports = router;