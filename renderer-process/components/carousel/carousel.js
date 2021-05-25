import {NewsArticle} from '../news-article/news-article.js';

export class Carousel extends HTMLElement {
  constructor() {
    super();
    
    this.innerHTML = `
    <header class="header-news">
      <div class="header-news__container"></div>  

      <button id="carousel-button-left">
          <i class="fas fa-chevron-left"></i>
      </button>
     
      <button  id="carousel-button-right" class="last">
          <i class="fas fa-chevron-right"></i>
      </button>
    </header>
    `;

    this.carouselItemStart = 0;
    this.carouselItemsCount = 2;

    this.header = document.querySelector(
        'header.header-news > div.header-news__container'
    );

    this.buttonLeft = document.querySelector('#carousel-button-left');
    this.buttonRight = document.querySelector('#carousel-button-right');

    this.buttonLeft.addEventListener('click', () => {
      this.carouselItemStart--;
      this.populateNewsCarousel();
    });

    this.buttonRight.addEventListener('click', () => {
      this.carouselItemStart++;
      this.populateNewsCarousel();
    });

  }

  populateNewsCarousel(news) {
    if (undefined !== news) {
      this.articles = news;
    }
    this.header.innerText = ''; 
    for(let i = this.carouselItemStart; i <
    (this.carouselItemStart + this.carouselItemsCount); i++) { 
      const newsValue = this.articles[i];
      const newsArticle = new NewsArticle(newsValue);
      this.header.appendChild(newsArticle); 
      this.checkButtonsVisibility();
  }
}

  checkButtonsVisibility() {
    this.buttonLeft.hidden = this.carouselItemStart === 0;
    this.buttonRight.hidden = this.carouselItemStart >=
        (this.articles.length - this.carouselItemsCount);
  }

}

customElements.define('app-carousel', Carousel);