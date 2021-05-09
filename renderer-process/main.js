import { NewsArticle } from './components/news-article/news-article.js';
import { Carousel } from './components/carousel/carousel.js'

const header = document.querySelector('header.header-news > div.header-news__container'); //může být pouze header-news__container bez šipky a header-news

const carouselItemCount = 2; //upravuje počet zpráv v aplikaci
let carouselItemStart = 0;
let articles; //vytáhli jsme proměnnou, kterou používáme ve fci, aby byla globální
const carousel = new Carousel();

fetch('http://localhost:3000/news.json')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
        const data = JSON.parse(responseText);
        articles = data.articles;
        carousel.populateNewsCarousel(data.articles, carouselItemStart); //data je objekt a přistupuji k articles (které jsou na serveru)
    });









