///////////////// úkol č. 5 ////////////////////////

 // ČAS SE ZOBRAZUJE A BĚŽÍ PO SEKUNDÁCH  
 export function currentTime() {
    let date = new Date(); 
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    function updateTime(k) {
        if (k < 10) {
          return "0" + k;
        }
        else {
          return k;
        }
      }

      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
      
      document.getElementById('clock').innerHTML = hour + ' : ' + min + ' : ' + sec; 

      let t = setTimeout(function(){ currentTime() }, 1000); 
  }
currentTime();


export const modalContainerClock = document.getElementById('modal-container-clock');

// automatické skrytí modalu po 5 sekundách
// Tohle je problematické - docílíme tím toho, že se po každých pěti vteřinách
// modal skryje - tzn. pokud se trefím s jeho otevřením těsně před tento
// okamžik, zobrazí se třeba jen na část vteřiny.
// setInterval(function(){
//     modalContainerClock.classList.remove('show');
// }, 5000);


export function clockModalShow(keyStrokeTime, callback){
    let password = [];
    let lastKeyTime = Date.now();
    
    document.addEventListener('keydown', event => {
       const key = event.key.toLowerCase();
        let currentTime = Date.now();

        if (/^[az]$/.test(key)) {
          return;
        }

        if(currentTime - lastKeyTime > keyStrokeTime) {
            password = [];
        }

        password.push(key);

        const word = password.join("");
        if(word ==='time') {
            callback(password);
        }

        lastKeyTime = currentTime;

        console.log(password);

    });
}

export function modalAppear() {
    modalContainerClock.classList.add('show');
    setTimeout(() => {
      modalContainerClock.classList.remove('show');
    }, 5000);
}

clockModalShow(1000, modalAppear);


