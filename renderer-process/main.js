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
        //vytahujeme data z formuláře
        const formRef = document.querySelector('#modal-form');
        const formData = new FormData(formRef);
        const data = formData.entries(); //entries viz dokumentace formData

        const object = { }; //prázdný objekt

        for(let formValue of data) { //formValeu = jeden řádek z formuláře, který je array
            const key = formValu[0];
            const value = formValue[1];
            //object.gender = 'Female';   stejný zápis o řádek níže ale všeobecný
            object[key] = value;  //bracket notation for objects - přistupuji k hodnotě proměnné - object.key = JS hledá přímo "slovo" key object.key = value; === object['key'] = value; !== object[key] = value;
        }

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


