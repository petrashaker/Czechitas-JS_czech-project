export class Calender extends HTMLElement {
    constructor(){
        super();

        this.innerHTML = `
            <select name="year" id="year">
                <option value="">Select Year</option>
            </select>

            <select name="month" id="month">
                <option value="">Select Month</option>
            </select>   
        `;

        //year selector
        let currentYear = new Date().getFullYear();
        let plusYears = 20;
        let minusYears = 80;
        
        function chooseYear() {
            for(let i = currentYear-minusYears; i <= currentYear+plusYears; i++) {
                    let option = document.createElement("option");
                    option.text = i;
                    option.value = i;
        
                    if(i === currentYear) {
                    option.selected = true;
                    }
                    
                    document.getElementById('year').options.add(option);
            }    
        };
        chooseYear();

        //month selector
        let currentMonth = new Date().getMonth();
        let monthArray = ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'];
        
        function chooseMonth(){
        for(let m = 0; m <= 11; m++) {
            let option = document.createElement("option");
            option.text = monthArray[m];
            // server side month start from one
            option.value = (m+1);

            if ( m === currentMonth) {
                option.selected = true;
            }

            document.getElementById('month').options.add(option);
            } 
        }
        chooseMonth();


        //month highlight
        let currentDay = new Date().getDate();
        console.log(currentDay);
        
        let year = new Date().getFullYear();
        console.log(year);
        
        let month = new Date().getMonth()+1;
        console.log(month);

        let today = new Date();
        console.log(today);

        if (currentDay === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
            app-day.classList.add('.day-chosen');
        }

    }
}

customElements.define('app-calender', Calender);