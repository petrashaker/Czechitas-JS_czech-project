export class Carousel {
    constructor() {
        this.carouselItemStart = 0;

        this.buttonLeft = document.querySelector('#carousel-button-left');
        this.buttonRight = document.querySelector('#carousel-button-right');

        this.checkButtonsVisibilty = function checkButtonsVisibilty(){};

        this.buttonLeft.addEventListener('click', () => {
            this.carouselItemStart --;
            this.populateNewsCarousel();
        });

        this.buttonRight.addEventListener('click', () => {
            this.carouselItemStart ++;
            this.populateNewsCarousel();
        });

    }

    populateNewsCarousel(news) {
        this.articles = news;
        this.header.innerText = ''; //pokud bychom nedali, zprávy při posouvání by se dvojily, tímto se vyčistí div a znovu se tam vytáhnou další zprávy a tak pořád dokola
        for(let i = this.carouselItemStart; i < (this.carouselItemStart + this.carouselItemCount); i ++) { //startAt přidáno pro posouvání carouselu
            const newsValue = news[i];
            const newsArticle = new NewsArticle();
            const newsDiv = newsArticle.createDivForNews(newsValue);
            this.header.appendChild(newsDiv); //append = připojit na konec, tzn. nahoře se header vyčistí (prázdný string) a zase se přidá další zpráva
        }
        this.checkButtonsVisibilty();
    }
}


function checkButtonsVisibilty(){
    buttonLeft.hidden = carouselItemStart === 0;
    buttonRight.hidden = carouselItemStart >= (articles.length - carouselItemCount);
}
