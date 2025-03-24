const express = require("express");
const axios = require("axios");
const router = express.Router();

async function logoGenerator(option = {}) {
    let payload = {
        ai_icon: [333276, 333279],
        height: 300,
        idea: option.idea,
        industry_index: "N",
        industry_index_id: "",
        pagesize: 4,
        session_id: "",
        slogan: option.slogan,
        title: option.title,
        whiteEdge: 80,
        width: 400
    };

    let { data } = await axios.post("https://www.sologo.ai/v1/api/logo/logo_generate", payload);
    return data.data.logoList.map(logo => logo.logo_thumb);
}

// Endpoint API untuk Logo Generator
router.get("/logo", async (req, res) => {
    const { idea, slogan, title } = req.query;

    if (!idea || !title) {
        return res.status(400).json({ error: "Parameter 'idea' dan 'title' diperlukan!" });
    }

    try {
        let logos = await logoGenerator({ idea, slogan, title });

        // Jika ingin mengembalikan URL gambar
        res.json({ logos });

        // Jika ingin mengembalikan langsung sebagai image (gunakan salah satu)
        // const imageResponse = await axios.get(logos[0], { responseType: "arraybuffer" });
        // res.set("Content-Type", "image/png");
        // res.send(imageResponse.data);
    } catch (error) {
        res.status(500).json({ error: "Gagal menghasilkan logo." });
    }
});

module.exports = router;