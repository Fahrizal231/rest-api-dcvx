const axios = require("axios");

module.exports = async (req, res) => {
    try {
        const response = await axios.get("https://www.velyn.biz.id/api/tools/quotes");
        const data = response.data;
        
        if (data && data.result) {
            res.status(200).json({ 
                success: true, 
                quote: data.result 
            });
        } else {
            res.status(500).json({ success: false, message: "Invalid response format" });
        }
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch quote", 
            error: error.message 
        });
    }
};