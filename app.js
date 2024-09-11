document.addEventListener('DOMContentLoaded', () => {
    
    const newsContainer = document.getElementById('news-container');
    const searchInput = document.getElementById('search');
  
    let newsData = [];
  
    const fetchNews = async () => {
        const response = await fetch('news.json');
        newsData = await response.json();
        displayNews();
    };
  
    const displayNews = () => {
        let filteredNews = newsData.filter(item => 
            item.title.toLowerCase().includes(searchInput.value.toLowerCase()) || 
            item.author.toLowerCase().includes(searchInput.value.toLowerCase())
        );
  
        newsContainer.innerHTML = filteredNews.map(newsItem => `
            <div class="news-item">
                <h3>${newsItem.title}</h3>
                <p><strong>${newsItem.author}</strong> - ${new Date(newsItem.publishedAt).toLocaleDateString()}</p>
                <img src="${newsItem.urlToImage}" alt="${newsItem.title}">
                <p>${newsItem.description}</p>
                <a href="${newsItem.url}" target="_blank">Read more</a>
            </div>
        `).join('');
    };
  
    searchInput.addEventListener('input', displayNews);
    fetchNews();
});
