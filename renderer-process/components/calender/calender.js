//funguje vložení elementu select, nefunguje zbytek (for cyklus)
// export class Calender extends HTMLElement {
//     constructor(){
//         super();

//         this.innerHTML = `
//             <select class='year-number' id='year-number'></select>
//             <select class='monthName' id='month-name'></select>
//         `;

//        this.month = ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'];
        
//         function selectMonth(month) {
//             for(let i= 0; i < month.length; i++) {
//                 let optionMonth = document.createElement('option');
//                 optionMonth.id = 'optionMonth';
//                 optionMonth.innerHTML = this.month[i];
//                 this.monthName.appendChild(optionMonth);
//                 return;
//             }
//         }
//     }
// }

// customElements.define('app-calender', Calender);