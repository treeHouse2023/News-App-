const API_KEY = "811baad8bdab47dca4234f5691822534"; 
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  try {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`); // Handles non-200 responses
    }
    const data = await res.json();
    if (data.articles.length === 0) {
      alert("No news articles found. Try a different query.");
      return;
    }
    bindData(data.articles);
  } catch (error) {
    console.error("Failed to fetch news:", error);
    alert("Failed to fetch news, please try again later.");
  }
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = ""; // Clear previous articles

  articles.forEach((article) => {
    if (!article.urlToImage) return; // Skip articles without images
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage || "https://via.placeholder.com/400x200"; // Fallback image
  newsTitle.innerHTML = article.title || "No Title Available";
  newsDesc.innerHTML = article.description || "No Description Available";

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-text").value;
  if (query) {
    fetchNews(query);
  }
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const themeIcon = document.querySelector("#theme-toggle i");
  themeIcon.classList.toggle("fa-sun");
  themeIcon.classList.toggle("fa-moon");
});

function onNavItemClick(query) {
  fetchNews(query);
}
