export class Day extends HTMLElement {
    constructor(date) {
        super(); //voláme costructor, odkazuje se na třídu o jedno vyšší, musí to být první

        this.innerHTML = `
        <div id='day-number'"></div>
        `;
        this.date = date;
        this.number = date.getDate();
        this.querySelector('#day-number').innerText = this.number;
        this.addEventListener('click', this.handleClickEvent);
    }

    getDayName() {
        switch(this.date.getDay()) {
            case 0:
                return 'Neděle';
            case 1:
                return 'Pondělí';
            case 2:
                return 'Úterý';
            case 3:
                return 'Středa';
            case 4:
                return 'Čtvrtek';
            case 5:
                return 'Pátek';
            case 6:
                return 'Sobota';
        }
    }

    handleClickEvent() {
        alert('Dnešní den: ' + this.getDayName());
    }
}


customElements.define('app-day', Day);
