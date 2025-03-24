const apiData = {
    "Downloader": [
        {
            method: "GET",
            title: "YouTube Downloader",
            status: "online",
            description: "API untuk mendownload video atau shorts dari YouTube.",
            endpoint: "/api/ytdl?url=&format="
        },
        {
            method: "GET",
            title: "Twitter Downloader",
            status: "online",
            description: "API untuk mendownload video atau gambar dari Twitter.",
            endpoint: "/api/twitterdl?url="
        },
        {
            method: "GET",
            title: "Instagram Downloader",
            status: "online",
            description: "API untuk mendownload video atau gambar dari Instagram.",
            endpoint: "/api/igdl?url="
        },
        {
            method: "GET",
            title: "Facebook Downloader",
            status: "online",
            description: "API untuk mendownload video dari Facebook.",
            endpoint: "/api/fbdl?url="
        },
        {
            method: "GET",
            title: "TikTok Downloader",
            status: "online",
            description: "API untuk mendownload video dari TikTok.",
            endpoint: "/api/ttdl?url="
        }
    ],
    "Search": [
        {
            method: "GET",
            title: "GitHub Stalk",
            status: "online",
            description: "API untuk melihat profil GitHub pengguna.",
            endpoint: "/api/githubstalk?username="
        },
        {
            method: "GET",
            title: "Search Groups",
            status: "online",
            description: "API untuk mencari grup WhatsApp berdasarkan kata kunci.",
            endpoint: "/api/searchgroups?q="
        },
        {
            method: "GET",
            title: "TikTok Search",
            status: "online",
            description: "API untuk mencari video dari TikTok berdasarkan query.",
            endpoint: "/api/ttsearch?q="
        },
        {
            method: "GET",
            title: "YouTube Search",
            status: "online",
            description: "API untuk mencari video dari YouTube berdasarkan kata kunci atau query.",
            endpoint: "/api/ytsearch?q="
        },
        {
            method: "GET",
            title: "Playstore Search",
            status: "online",
            description: "API untuk mencari aplikasi di Playstore berdasarkan kata kunci.",
            endpoint: "/api/playstore?q="
        },
        {
            method: "GET",
            title: "Webtoon Search",
            status: "online",
            description: "Cari Manhwa Favorit Mu Dengan Mudah!",
            endpoint: "/api/webtoon?query="
        }
    ],
    "Islamic": [
        {
            method: "GET",
            title: "Jadwal Sholat",
            status: "online",
            description: "API untuk melihat jadwal sholat berdasarkan kota.",
            endpoint: "/api/jadwalsholat?kota="
        }
    ],
    "AI": [
        {
            method: "GET",
            title: "LLaMA 3.3 70B Versatile",
            status: "online",
            description: "API untuk mengakses model LLaMA 3.3 70B yang serbaguna.",
            endpoint: "/api/llama-3.3-70b-versatile?content="
        },
        {
            method: "GET",
            title: "Txt2Img AI",
            status: "online",
            description: "API untuk membuat gambar dari AI dengan style yang banyak.",
            endpoint: "/api/txt2img?prompt=&style="
        },
        {
            method: "GET",
            title: "Deepseek AI",
            status: "online",
            description: "API Untuk mengakses chat dengan deepseek ai!",
            endpoint: "/api/deepseek?content="
        },
        {
            method: "GET",
            title: "Alicia AI",
            status: "online",
            description: "API Untuk mengakses chat dengan alicia ai! yang lucu",
            endpoint: "/api/alicia?query=&user="
        },
        {
            method: "GET",
            title: "Turbo AI",
            status: "online",
            description: "API Untuk mengakses endpoint turbo ai yang cepat dan keren",
            endpoint: "/api/turbo?query="
        }
    ],
    "Tools": [
        {
            method: "GET",
            title: "Screenshot Web",
            status: "online",
            description: "API untuk screenshot website dengan mudah.",
            endpoint: "/api/ssweb?url="
        }
    ],
    "Fun": [
        {
            method: "GET",
            title: "Tahu Kah Kamu?",
            status: "online",
            description: "Permainan seru yang menunjukkan fakta-fakta random yang mungkin belum kamu ketahui.",
            endpoint: "/api/tahukahkamu"
        },
        {
            method: "GET",
            title: "Cek Khodam",
            status: "online",
            description: "API untuk mengecek khodam berdasarkan nama yang diberikan.",
            endpoint: "/api/khodam?nama="
        }
    ],
    "Quotes": [
        {
            method: "GET",
            title: "Random Quotes",
            status: "online",
            description: "Random Quotes, Dari Tokoh-tokoh Terkenal Dan Lain-Lain",
            endpoint: "/api/quotes"
        }
    ],
    "Sticker": [
        {
            method: "GET",
            title: "Brat Generator",
            status: "online",
            description: "Fitur untuk membuat gambar brat generator dari teks yang diberikan.",
            endpoint: "/api/brat?text="
        },
        {
            method: "GET",
            title: "Brat Anime",
            status: "online",
            description: "Fitur untuk membuat gambar anime brat dari teks yang diberikan.",
            endpoint: "/api/bratanime?text="
        },
        {
            method: "GET",
            title: "Brat Animate",
            status: "online",
            description: "Fitur untuk membuat brat video dari text yang diberikan",
            endpoint: "/api/bratvid?text="
        }
    ]
};

function createApiItem(api) {
    const apiItem = document.createElement("div");
    apiItem.className = "api-item";

    apiItem.innerHTML = `
        <div class="api-header">
            <span class="api-method">${api.method}</span>
            <span class="api-title">${api.title}</span>
            <span class="api-status-badge ${api.status}">${api.status.toUpperCase()}</span>
        </div>
        <div class="api-description" style="display: none;">
            <p>${api.description}</p>
            <div class="api-endpoint">Endpoint: ${api.endpoint}</div>
            <button onclick="window.location.href='${api.endpoint}'">GET</button>
        </div>
    `;

    return apiItem;
}

function loadApiData() {
    const apiCategoriesContainer = document.getElementById("api-categories");

    for (const category in apiData) {
        const apiCategory = document.createElement("div");
        apiCategory.className = "api-category";

        apiCategory.innerHTML = `<h2>${category}</h2>`;

        const apiList = document.createElement("div");
        apiList.className = "api-list";

        apiData[category].forEach(api => apiList.appendChild(createApiItem(api)));

        apiCategory.appendChild(apiList);
        apiCategoriesContainer.appendChild(apiCategory);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadApiData();

    document.addEventListener("click", (event) => {
        if (event.target.closest(".api-header")) {
            const description = event.target.closest(".api-item").querySelector(".api-description");
            description.style.display = description.style.display === "none" ? "block" : "none";
        }
    });
});