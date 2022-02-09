//implemento un ascoltatore di eventi al tasto gioca
document.getElementById('play').addEventListener('click', play);

//funzione che gestisce tutto il gioco
function play() {

    const griglia = [];

    const gioco = document.getElementById('gioco');
    //resetto il campo di gioco
    gioco.innerHTML = "";
    
    const difficolta = document.getElementById('difficolta').value;

    let numeroCelle;
    let cellePerRiga;

    switch (difficolta) {
        case "facile":
        default:
            numeroCelle = 100;
            break;
        case "medio":
            numeroCelle = 81;
            break;
        case "difficile":
            numeroCelle = 49;
            break;
    };


    generaCampoGioco(numeroCelle);
    generaBombe(numeroCelle);
    function gestioneClick(){
        this.classList.add('clicked');


        if(this.classList.contains('bomb')){
            alert('Hai preso una bomba, il gioco è finito, ritenta');
            let elementiBomba = document.getElementsByClassName('bomb');
            for (let i = 0; i < elementiBomba.length; i++){
                elementiBomba[i].classList.add('clicked');
            }
            for( let i = 0; i < griglia.length; i++){
                griglia[i].removeEventListener('click', gestioneClick);
            }
        }
    }

    function generaCampoGioco(numeroCelle) {

        cellePerRiga = Math.sqrt(numeroCelle);

        for (let i = 1; i <= numeroCelle; i++) {

            const nodo = document.createElement('div');
            nodo.classList.add('quadrato');

            const dimensione = `calc(100% / ${cellePerRiga})`;
            nodo.style.width = dimensione;
            nodo.style.height = dimensione;
        
            nodo.innerText = i;
        
            nodo.addEventListener('click', gestioneClick );
        
            gioco.appendChild(nodo);

            griglia.push(nodo);
        
        };

        return true;

    };

    function generaBombe(numeroCelle){
        for (let i = 1; i <= 16; i++){
            let cellaBomba = Math.floor(Math.random() * numeroCelle);
            if(griglia[cellaBomba].classList.contains('bomb')){
                i--;
                continue;
            }
            
            griglia[cellaBomba].classList.add('bomb');            
        };

        return true;
    }


}
