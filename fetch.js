document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://newsapi.org/v2/top-headlines'; // Base URL for top headlines
    const apiKey = '0e531833e2b1499c91fec72d196e9cdd'; // Your provided API key
    const newsList = document.getElementById('news-list');
    const searchInput = document.getElementById('search');
    const sortSelect = document.getElementById('sort');
    const paginationDiv = document.getElementById('pagination');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');

    let newsArticles = [];
    let totalResults = 0;
    let currentPage = 1;
    const itemsPerPage = 6;

    function fetchNews(query = '', sortBy = 'publishedAt', page = 1) {
        const params = new URLSearchParams({
            country: 'us', // Fetching US top headlines
            category: 'business', // Business category
            q: query, // Search query, if provided
            pageSize: itemsPerPage, // Number of articles per page
            page: page, // Current page number
            apiKey: apiKey
        });

        const url = `${apiUrl}?${params.toString()}`;

        loadingDiv.style.display = 'block';
        errorDiv.style.display = 'none';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    totalResults = data.totalResults;
                    newsArticles = data.articles.map(article => ({
                        title: article.title,
                        author: article.author,
                        description: article.description,
                        date: article.publishedAt
                    }));
                    sortAndDisplayNews();
                    setupPagination();
                } else {
                    throw new Error(data.message || 'Failed to fetch news');
                }
            })
            .catch(error => {
                errorDiv.style.display = 'block';
                errorDiv.textContent = 'Error fetching news: ' + error.message;
                console.error('Error fetching news:', error);
            })
            .finally(() => {
                loadingDiv.style.display = 'none';
            });
    }

    function sortAndDisplayNews() {
        const sortBy = sortSelect.value;

        if (sortBy === 'title') {
            newsArticles.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'author') {
            newsArticles.sort((a, b) => a.author ? a.author.localeCompare(b.author) : 1);
        } else if (sortBy === 'date') {
            newsArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        displayNews();
    }

    function displayNews() {
        newsList.innerHTML = '';
        newsArticles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.innerHTML = `
                <h2>${article.title}</h2>
                <p>By ${article.author ? article.author : 'Unknown Author'}</p>
                <p>${article.description}</p>
                <p>Published on ${new Date(article.date).toLocaleDateString()}</p>
            `;
            newsList.appendChild(newsItem);
        });
    }

    function setupPagination() {
        const totalPages = Math.ceil(totalResults / itemsPerPage);
        paginationDiv.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                fetchNews(searchInput.value, sortSelect.value, currentPage);
            });
            paginationDiv.appendChild(pageButton);
        }
    }

    searchInput.addEventListener('input', () => {
        fetchNews(searchInput.value, sortSelect.value);
    });

    sortSelect.addEventListener('change', () => {
        sortAndDisplayNews();
    });

    // Fetch the news initially without a query
    fetchNews();
});
