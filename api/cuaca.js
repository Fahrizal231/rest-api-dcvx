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

// Cari kode wilayah berdasarkan query
const getWilayahKode = async (query) => {
  if (!dataWilayah) {
    await fetchData();
  }

  const results = dataWilayah.filter((item) =>
    item.nama.toLowerCase().includes(query.toLowerCase())
  );

  return results.find((item) => item.kode.split(".").length === 4);
};

// Endpoint: /api/cuaca?query=nama_wilayah
router.get("/", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query tidak boleh kosong" });

  const wilayah = await getWilayahKode(query);
  if (!wilayah) return res.status(404).json({ error: "Wilayah tidak ditemukan" });

  try {
    const { data } = await axios.get(
      `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${wilayah.kode}`
    );
    res.json({ status: "success", wilayah: wilayah.nama, cuaca: data });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data cuaca dari BMKG" });
  }
});

module.exports = router;