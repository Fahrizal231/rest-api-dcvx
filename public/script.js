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
            title: "TikTok Downloader",
            status: "online",
            description: "API untuk mendownload video dari TikTok.",
            endpoint: "/api/ttdl?url="
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
    const apiItem = document.createElement('div');
    apiItem.className = 'api-item';

    const apiHeader = document.createElement('div');
    apiHeader.className = 'api-header';

    const apiMethod = document.createElement('span');
    apiMethod.className = 'api-method';
    apiMethod.textContent = api.method;

    const apiTitle = document.createElement('span');
    apiTitle.className = 'api-title';
    apiTitle.textContent = api.title;

    const apiStatusBadge = document.createElement('span');
    apiStatusBadge.className = `api-status-badge ${api.status}`;
    apiStatusBadge.textContent = api.status.toUpperCase();

    apiHeader.appendChild(apiMethod);
    apiHeader.appendChild(apiTitle);
    apiHeader.appendChild(apiStatusBadge);

    const apiDescription = document.createElement('div');
    apiDescription.className = 'api-description';
    apiDescription.style.display = 'none';

    const apiDescriptionText = document.createElement('p');
    apiDescriptionText.textContent = api.description;

    const apiEndpoint = document.createElement('div');
    apiEndpoint.className = 'api-endpoint';
    apiEndpoint.textContent = `Endpoint: ${api.endpoint}`;

    const apiButton = document.createElement('button');
    apiButton.textContent = 'GET';
    apiButton.onclick = () => {
        const userQuery = prompt("Masukkan query (jika diperlukan):");
        if (userQuery !== null) {
            window.location.href = api.endpoint + userQuery;
        }
    };

    apiDescription.appendChild(apiDescriptionText);
    apiDescription.appendChild(apiEndpoint);
    apiDescription.appendChild(apiButton);

    apiItem.appendChild(apiHeader);
    apiItem.appendChild(apiDescription);

    return apiItem;
}

function setupToggleDescriptions() {
    document.querySelectorAll('.api-header').forEach(header => {
        header.addEventListener('click', function () {
            const description = this.nextElementSibling;
            description.style.display = (description.style.display === "none" || !description.style.display) ? "block" : "none";
        });
    });
}

function loadApiData() {
    const apiCategoriesContainer = document.getElementById('api-categories');

    for (const category in apiData) {
        const apiCategory = document.createElement('div');
        apiCategory.className = 'api-category';

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category;

        const apiList = document.createElement('div');
        apiList.className = 'api-list';

        apiData[category].forEach(api => {
            const apiItem = createApiItem(api);
            apiList.appendChild(apiItem);
        });

        apiCategory.appendChild(categoryTitle);
        apiCategory.appendChild(apiList);
        apiCategoriesContainer.appendChild(apiCategory);
    }

    setupToggleDescriptions();
}

document.addEventListener('DOMContentLoaded', loadApiData);