export class Day extends HTMLElement {
    constructor(dayNumber) {
        super(); //voláme costructor, odkazuje se na třídu o jedno vyšší, musí to být první

        this.innerText = 'DAY';
        this.number = dayNumber;
        this.addEventListener('click', this.handleClickEvent);
    }

    handleClickEvent() {
        alert('clicked day: ' + this.number);
    }
}


customElements.define('app-day', Day);
