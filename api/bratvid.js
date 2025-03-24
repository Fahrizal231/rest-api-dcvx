const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const router = express.Router();

router.get("/", async (req, res) => {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({
            status: 400,
            message: "Masukkan parameter text",
            creator: "Fahrizal"
        });
    }

    if (text.length > 250) {
        return res.status(400).json({
            status: 400,
            message: "Karakter terbatas, max 250!",
            creator: "Fahrizal"
        });
    }

    const words = text.split(" ");
    const tempDir = path.join(__dirname, "..", "tmp");

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const framePaths = [];

    try {
        for (let i = 0; i < words.length; i++) {
            const currentText = words.slice(0, i + 1).join(" ");

            const response = await axios.get(
                `https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(currentText)}`,
                { responseType: "arraybuffer" }
            ).catch((e) => e.response);

            if (!response || response.status !== 200) {
                return res.status(500).json({
                    status: 500,
                    message: "Terjadi kesalahan saat mengambil frame",
                    creator: "Fahrizal"
                });
            }

            const framePath = path.join(tempDir, `frame${i}.mp4`);
            fs.writeFileSync(framePath, response.data);
            framePaths.push(framePath);
        }

        const fileListPath = path.join(tempDir, "filelist.txt");
        let fileListContent = framePaths.map(frame => `file '${frame}'\nduration 0.7`).join("\n");
        fileListContent += `\nfile '${framePaths[framePaths.length - 1]}'\nduration 2`;

        fs.writeFileSync(fileListPath, fileListContent);
        const outputVideoPath = path.join(tempDir, "bratvideo.mp4");

        execSync(
            `ffmpeg -y -f concat -safe 0 -i ${fileListPath} -vf "fps=30" -c:v libx264 -preset ultrafast -pix_fmt yuv420p ${outputVideoPath}`
        );

        res.setHeader("Content-Type", "video/mp4");
        res.sendFile(outputVideoPath, err => {
            framePaths.forEach(frame => fs.existsSync(frame) && fs.unlinkSync(frame));
            if (fs.existsSync(fileListPath)) fs.unlinkSync(fileListPath);
            if (fs.existsSync(outputVideoPath)) fs.unlinkSync(outputVideoPath);
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat membuat video",
            creator: "Fahrizal"
        });
    }
});

module.exports = router;