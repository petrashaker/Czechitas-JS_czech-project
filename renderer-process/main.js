import { NewsArticle } from './components/news-article/news-article.js';
import { Carousel } from './components/carousel/carousel.js'

const header = document.querySelector('header.header-news > div.header-news__container'); 
const carousel = new Carousel();

fetch('http://localhost:3000/news.json')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
        const data = JSON.parse(responseText);
        articles = data.articles;
        carousel.populateNewsCarousel(data.articles, carouselItemStart); 
    });




