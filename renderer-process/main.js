import { NewsArticle } from './components/news-article/news-article.js';
import { Carousel } from './components/carousel/carousel.js';
import { Day } from './components/day/day.js';
import { Calender } from './components/calender/calender.js';

const header = document.querySelector('header.header-news > div.header-news__container'); 

const carousel = document.querySelector('app-carousel');

window.showLoader = showLoader;
window.hideLoader = hideLoader;
function showLoader() {
    document.body.appendChild(document.querySelector('#loaderTemplate').content.cloneNode(true));
}
function hideLoader() {
    document.body.removeChild(document.querySelector('.loader'));
}
function showToaster(success, title, message) {
    const toasterTemplate = document.querySelector('#toasterTemplate').content.cloneNode(true);
    const toasterElement = toasterTemplate.querySelector('.toaster');
    toasterElement.addEventListener('click', () => document.body.removeChild(toasterElement));
    toasterElement.classList.add(success ? 'success' : 'error');
    toasterTemplate.querySelector('h1').innerText = title;
    toasterTemplate.querySelector('p').innerText = message;
    document.body.appendChild(toasterTemplate);
    setTimeout(() => {
        try {
            document.body.removeChild(toasterElement);
        } catch(e) {
            console.warn('Toaster already removed');
        }
    }, 3000);
}

fetch('http://localhost:3000/news.json')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
        const data = JSON.parse(responseText); //parse převádí data z textu na objekt (opak stringify)
        carousel.populateNewsCarousel(data.articles); 
    });


const mainContent = document.querySelector('section.main-content');

const currentDate = new Date();
const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

// vytvoření kalendáře dle čísla dnů
for (let i = 1; i <= maxDate; i++) {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    mainContent.appendChild(new Day(dayDate));
}
 
function showDayModal(dayDate) {
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
        //vytahujeme data z formuláře
        const formRef = document.querySelector('#modal-form');
        const formData = new FormData(formRef);
        const data = formData.entries(); //entries viz dokumentace formData

        const object = { 
            date: dayDate
        };

        for(let formValue of data) { //formValeu = jeden řádek z formuláře, který je array
            const key = formValue[0];
            const value = formValue[1];
            //object.gender = 'Female';   stejný zápis o řádek níže ale všeobecný
            object[key] = value;  //bracket notation for objects - přistupuji k hodnotě proměnné - object.key = JS hledá přímo "slovo" key object.key = value; === object['key'] = value; !== object[key] = value;
        }

        showLoader();

        fetch('http://localhost:3000/calendar',
        {
            method: 'POST', //tento objekt nám umožňuje přepisovat výchozí metodu fetch (dříve GET, zde přepsáno na POST)
            body: JSON.stringify(object), //stringify z objektu na text, z textu na objekt parse
            headers: {
                'Content-Type': 'application/json',
            },
        }
    ).then(response => {
            hideLoader();
            if(response.ok) { //ok obsahuje booleanskou hodnotu true/false / může být i (response.status === 200)
                showToaster(true, 'Data uloženy', 'Událost byla uložena.');
                fetch('http://localhost:3000/calendar')
                .then(serverResponse => serverResponse.text())
                .then(responseText => {
                    const events = JSON.parse(responseText);
                    const days = document.querySelectorAll('app-day');
                    
                    //verze 1
                    const eventValues = Object.values(events);

                    eventValues.forEach(event => {
                        //zjišťujeme, zda se bude rovnat datum
                        for(let day of days) {
                            const eventDate = new Date(event.date);
                            const dayDate = day.date; //date z day.js

                            console.log(eventDate.toDateString(), eventDate.toDateString()) === dayDate.toDateString();
                        }
                    })


                });
            } else {
                showToaster(false, 'Chyba ukládání', 'Server není dostupný.');
            }
            console.log(response); //zpracování odpovědi ze serveru
        }
    );

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

    //const days = document.querySelectorAll('app-day'); //itiretovatelný objekt (pozor, není to pole)

    //const daysArray = Array.from(days); --> používáme, když víme, kolik je položek, při nekonečném množstvím položek by nám systém spadnul

    // for(const item of days) {
    //     console.log(item);
    // }
 
    let contactsArray; //vytáhnu si data jako cache 

    fetch('http://localhost:3000/contacts')
        .then(serverResponse => serverResponse.text())
        .then(responseText => {
        contactsArray = JSON.parse(responseText);
        createOptions(contactsArray);
    });

    const radioButtons = document.querySelectorAll('#genderSelectRow > input'); //querySelectorAll vrací itirovatelný objekt

    for (let radio of radioButtons) {
        radio.addEventListener('change', () => {
            //vytahujeme data z formuláře a z html používáme name (je stejný pro Female i Male)
            const formRef = document.querySelector('#modal-form');
            const formData = new FormData(formRef);
            const gender = formData.get('gender'); //z html pod name = "gender"
            const filteredContacts = contactsArray.filter(contact => {
                return contact.gender === gender; //contact je objekt na serveru
                //vyber jeden gender a "=== gender" porovnej s hodnotou, kterou mame zakliknutou ve formuláři
            })
            createOptions(filteredContacts);
        });
    }

  
}

function createOptions(contactsArray) {
        const select = document.querySelector('#eventAttendees');

        //vyhodím všechny hodnoty, vynuluju hodnoty
        //select.innerText = ''; 

        //pokud používám dvoje uvozovky, musí byt jiné
        //select.innerHTML = '<option value=" "> </option>'; 

        //nuluji hodnoty jiným způsobem
        const odlOptions = document.querySelectorAll('.hakunamatata');
        odlOptions.forEach(opt => {
            select.removeChild(opt);
            //opt.remove(); je to správně, ale starší prohlížeče by to nemuseli přečíst
        });

        
        contactsArray.forEach(item => {
            const option = document.createElement('option');
            option.setAttribute('value', item.id);
            option.innerText = `${item.first_name} ${item.last_name}`;
            option.classList.add('hakunamatata');
            select.appendChild(option);
        });
}

//zadefinujeme si vlastní políčk na objektu, nemusíme toto použít, můžeme udělat i export/import a dát fci do samostatného souboru
window.showModal = showDayModal;

//úkol č. 6





