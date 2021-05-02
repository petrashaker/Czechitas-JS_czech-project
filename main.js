// INFO Z 1. LEKCE
/* 
const header = document.querySelector('header.header-news');

const someDiv = document.createElement('div');

header.appendChild(someDiv); // vytvoří nový div v headeru 


someDiv.classList.add('ad-banner'); // přidá třídu k prvku div 


const myAge = 87;

someDiv.innerHTML = `
<a href="google.com">Click Me</a>
asdlfkj
lkjasdflkas
${myAge}
aksdfklj
abcd
`;
*/

//DOMÁCÍ ÚKOL Č. 1
// const mainContent = document.querySelector('.main-content');

// for (let i = 1; i <= 31; i++) {
//     const daysDiv = document.createElement('div');
//     daysDiv.className = 'main-content__day';
//     mainContent.appendChild(daysDiv);
//     daysDiv.innerText = [i];    
// }


// INFO ZE 2. LEKCE
const header = document.querySelector('header.header-news > div.header-news__container'); //může být pouze header-news__container bez šipky a header-news

const carouselItemCount = 2; //upravuje počet zpráv v aplikaci
let carouselItemStart = 0;
let articles; //vytáhli jsme proměnnou, kterou používáme ve fci, aby byla globální

//VYŽÁDÁNÍ DAT ZE SERVERU
/* verze 1
const dataPromise = fetch('http://localhost:3000/news.json');
dataPromise
.then(serverResponse => serverResponse.text())
.then(responseText => console.log(JSON.parse(responseText)));

dataPromise.then(serverResponse => console.log(serverResponse.text())); //stažení dat se podaří, volání fce text() - převede do textu
dataPromise.catch(serverError => alert('Chyba stahování dat.')); //stažení dat se nepodaří

verze 2 - není nutné balit fetch do proměnné, možno volat fetch přímo
fetch('http://localhost:3000/news.json')
.then(serverResponse => serverResponse.text())
.then(responseText => console.log(JSON.parse(responseText)));*/

//verze 3
fetch('http://localhost:3000/news.json')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
        const data = JSON.parse(responseText);
        articles = data.articles;
        populateNewsCarousel(data.articles, carouselItemStart); //data je objekt a přistupuji k articles (které jsou na serveru)
    });


function populateNewsCarousel(news, startAt) { 
    header.innerText = ''; //pokud bychom nedali, zprávy při posouvání by se dvojily, tímto se vyčistí div a znovu se tam vytáhnou další zprávy a tak pořád dokola
    for(let i = startAt; i < (startAt + carouselItemCount); i ++) { //startAt přidáno pro posouvání carouselu
        const newsValue = news[i];
        const newsDiv = createDivForNews(newsValue);
        header.appendChild(newsDiv); //append = připojit na konec, tzn. nahoře se header vyčistí (prázdný string) a zase se přidá další zpráva
    }
}

function createDivForNews(newsContents) {
    const newsArticle = document.createElement('div');
    newsArticle.classList.add('news-article');
    newsArticle.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), transparent), url(${newsContents.image})`; //nastavujeme v JS, protože každá zpráva bude mít jiný obrázek

    const title = document.createElement('span');
    title.classList.add('news-article__title')
    title.innerText = newsContents.title; // newsContents je objekt a přistupuji k title (které je část articles na serveru)

    newsArticle.appendChild(title);

    return newsArticle;
}

// function rotateCarouselLeft(){
//     alert('ahoj')
// }

// function rotateCarouselRight(){

// }


const buttonLeft = document.querySelector('#carousel-button-left');
const buttonRight = document.querySelector('#carousel-button-right');
// const buttonLeft = document.getElementById('carousel-button-left');
// const buttonRight = document.getElementById('carousel-button-right');

buttonLeft.addEventListener('click', () => {
    carouselItemStart --;
    populateNewsCarousel(articles, carouselItemStart);
});
//verze 2
// buttonLeft.addEventListener('click', rotateCarouselLeft); //pokud bych nechala rotateCarouselLeft() s uvozovkami, volám fci a při každém reload aplikaci vyskočí okno

buttonRight.addEventListener('click', () => {
    console.log(carouselItemStart, articles);
    carouselItemStart ++;
    populateNewsCarousel(articles, carouselItemStart);
});




