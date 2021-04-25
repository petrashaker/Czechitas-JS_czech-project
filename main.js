// INFO Z 2. LEKCE
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

// INFO ZE 3. LEKCE
const header = document.querySelector('header.header-news');

const carouselItemCount = 4;

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
        populateNewsCarousel(data.articles); //data je objekt a přistupuji k articles (které jsou na serveru)
    });

function populateNewsCarousel(news){
    for(let i = 0; i < carouselItemCount; i ++) {
        const newsValue = news[i];
        const newsDiv = createDivForNews(newsValue);
        header.appendChild(newsDiv);
    }
}

function createDivForNews(newsContents) {
    const newsArticle = document.createElement('div');
    newsArticle.innerText = newsContents.title; // newsContents je objekt a přistupuji k title (které je část articles na serveru)
    return newsArticle;
}

//DOMÁCÍ ÚKOL Č. 1
const mainContent = document.querySelector('.main-content');

for (let i = 1; i <= 31; i++) {
    const daysDiv = document.createElement('div');
    daysDiv.className = 'main-content__day';
    mainContent.appendChild(daysDiv);
    daysDiv.innerText = [i];    
}


