const axios = require("axios");

module.exports = async (req, res) => {
    try {
        // Ambil data dari API eksternal
        const response = await axios.get("https://www.velyn.biz.id/api/tools/quotes");

        // Cek apakah response sukses dan format sesuai
        if (response.data.status && response.data.data) {
            res.json({
                success: true,
               creator: "Fahrizal", // Tambahkan author API
                quote: response.data.data.quote,
                author: response.data.data.author,
                tags: response.data.data.tags
            });
        } else {
            throw new Error("Invalid response format");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch quote"
        });
    }
};