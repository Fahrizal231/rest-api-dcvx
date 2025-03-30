const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

let totalRequests = 0;
let clients = [];

app.use(cors({ origin: "*" })); // Bisa diperketat dengan origin tertentu
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    totalRequests++;
    sendUpdateToClients();
    next();
});

// Halaman utama
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Halaman monitor
app.get("/monitor-page", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "monitor", "monitor.html"));
});

// Streaming update jumlah request
app.get("/monitor", (req, res) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
    });
    res.flushHeaders();

    const clientId = Date.now();
    const newClient = { id: clientId, res };
    clients.push(newClient);

    res.write(`data: ${JSON.stringify({ totalRequests })}\n\n`);

    req.on("close", () => {
        clients = clients.filter(client => client.id !== clientId);
    });
});

// Fungsi untuk mengirim update ke semua client
function sendUpdateToClients() {
    clients.forEach(client => {
        client.res.write(`data: ${JSON.stringify({ totalRequests })}\n\n`);
    });
}

// Daftar endpoint API
const routes = [
    "ytmp4", "twitterdl", "igdl", "fbdl", "ttdl", 
    "githubstalk", "searchgroups", "ttsearch", "ytsearch", 
    "llama-3.3-70b-versatile", "txt2img", "ssweb", "khodam", 
    "tahukahkamu", "brat", "bratanime", "bratvid", "deepseek", 
    "alicia", "playstore", "quotes", "webtoon", "turbo", 
    "jadwalsholat","ytmp3","gempa","toanime"
];

// Cek apakah file ada sebelum memuatnya
routes.forEach(route => {
    const filePath = path.join(__dirname, "api", `${route}.js`);
    if (fs.existsSync(filePath)) {
        try {
            app.use(`/api/${route}`, require(filePath));
            console.log(`Loaded API route: /api/${route}`);
        } catch (err) {
            console.error(`Error loading API route /api/${route}:`, err.message);
        }
    } else {
        console.warn(`API file not found: ${filePath}, skipping route /api/${route}`);
    }
});

// Menangani SIGINT agar bisa ditutup dengan bersih
process.on("SIGINT", () => {
    console.log("\nServer shutting down...");
    process.exit();
});

module.exports = app;