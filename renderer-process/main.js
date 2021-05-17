import { NewsArticle } from './components/news-article/news-article.js';
import { Carousel } from './components/carousel/carousel.js';
import { Day } from './components/day/day.js';

const header = document.querySelector('header.header-news > div.header-news__container'); 
const carousel = new Carousel();

fetch('http://localhost:3000/news.json')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
        const data = JSON.parse(responseText);
        carousel.populateNewsCarousel(data.articles); 
    });


const mainContent = document.querySelector('section.main-content');

function populateDays() {
    for (let i = 1; i < 31; i++) {
        const newDay = new Day();
        mainContent.appendChild(newDay);
    }
}
populateDays();





