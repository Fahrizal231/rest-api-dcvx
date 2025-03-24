const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    const { content } = req.query;

    if (!content) {
        return res.status(400).json({ 
            status: 400, 
            creator: 'Fahrizal', 
            error: 'Parameter "content" tidak boleh kosong' 
        });
    }

    try {
        const response = await axios.get(`https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=${encodeURIComponent(content)}`);
        res.json({ 
            status: 200, 
            creator: 'Fahrizal', 
            response: response.data 
        });
    } catch (error) {
        console.error('Error fetching DeepSeek API:', error.response?.data || error.message);
        res.status(500).json({ 
            status: 500, 
            creator: 'Fahrizal', 
            error: 'Terjadi kesalahan saat mengambil data.' 
        });
    }
});

module.exports = router;