import { NewsArticle } from './components/news-article/news-article.js';
import { Carousel } from './components/carousel/carousel.js';
import { Day } from './components/day/day.js';

const header = document.querySelector('header.header-news > div.header-news__container'); 

const carousel = document.querySelector('app-carousel');


fetch('http://localhost:3000/news.json')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
        const data = JSON.parse(responseText);
        carousel.populateNewsCarousel(data.articles); 
    });


const mainContent = document.querySelector('section.main-content');

const currentDate = new Date();
const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

for (let i = 1; i <= maxDate; i++) {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    mainContent.appendChild(new Day(dayDate));
}
 
function showDayModal() {
    const template = document.querySelector('#modal-template');
    const modal = template.content.cloneNode(true);
    
    const closeAction = () => {
        const child = document.querySelector('section.modal-container');
        document.body.removeChild(child);
    };
    
    modal.querySelector('#close-modal').addEventListener('click', closeAction);
    
    const cancelButton = modal.querySelector('#cancel-button');
    cancelButton.addEventListener('click', closeAction);
    
    modal.querySelector('#save-button').addEventListener('click', () => {
        const formRef = document.querySelector('#modal-form');
        const formData = new FormData(formRef);
        const isHoliday = formData.get('isHolidayControl') === 'on';
    });

    //místo modal. mohu mít i document. ale musím pak celou část přesunout bod document.body.appendChild(modal)
    const checkbox = modal.querySelector('#limitAttendeesByGender');
    const row = modal.querySelector('#genderSelectRow');
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            row.classList.remove('hidden');
        } else {
            row.classList.add('hidden');
        }
    });
    
    document.body.appendChild(modal);

    const days = document.querySelectorAll('app-day'); //itiretovatelný objekt (pozor, není to pole)

    //const daysArray = Array.from(days); --> používáme, když víme, kolik je položek, při nekonečném množstvím položek by nám systém spadnul

    for(const item of days) {
        console.log(item);
    }
 
    fetch('http://localhost:3000/contacts')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
        const data = JSON.parse(responseText);
        const select = document.querySelector('#eventAttendees');
        data.forEach(item => {
            const option = document.createElement('option');
            option.setAttribute('value', item.id);
            option.innerText = `${item.first_name} ${item.last_name}`;
            select.appendChild(option);
        })
    })
}

//zadefinujeme si vlastní políčk na objektu, nemusíme toto použít, můžeme udělat i export/import a dát fci do samostatného souboru
window.showModal = showDayModal;

const exampleArray = [1, 2, 3, 4, 5, 6, 7, 8];

exampleArray.forEach(it => {
    console.log(it);
})

const rlt = exampleArray.map(it => {
    return it + 1;
})
console.log(rlt);

const rlt2 = exampleArray.filter(it => {
    const isEven = it % 2 === 0; //pokud je hodnota (it) dělitelná dvěma a zůstatek rovná se nula, tak číslo bude párové
    return isEven; 
});
console.log(rlt2);
