let mesi = []
const listaMesi = [
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre"
]
let meseVisualizzato
let impegni = []
    /*mese
      giorno
      titolo
      orario*/

const giorniInMese = [31,28,31,30,31,30,31,31,30,31,30,31]
const anniBisestili = [2022, 2024, 2028, 2032, 2036, 2040, 2044, 2048]
const data = new Date()

function calcolaGiorni(){
    for (let i = 0; i < 12; i++) {
        let mese = {
            mese: listaMesi[i],
            giorni: giorniInMese[i]
        }
        // if((anniBisestili.includes(data.getFullYear()) )&& i == 1){
        //     mese.mese = 29
        //     console.log("vdfsd")
        // }
        mesi.push(mese)
        
    }
}

//console.log(mesi)
function aggiorna(){
    localStorage.setItem("Calendario", JSON.stringify(impegni))
}
function caricamento(){
    calcolaGiorni();

    if(JSON.parse(localStorage.getItem("Calendario")) == null){
        localStorage.setItem("Calendario", JSON.stringify(impegni))
    }else{
        impegni = JSON.parse(localStorage.getItem("Calendario")  || [])
    }
    
    const mese = meseCorrente()
    creaQuadrati(mese) 
}
function meseCorrente(){
    const meseCorrente = data.getMonth()
    //console.log(meseCorrente)
    return meseCorrente
}
function giornoCorrente(){
    const giornoCorrente = data.getDate()
    return giornoCorrente
}

/*
    CREAZIONE DEI QUADRATI
*/

function creaQuadrati(mese){
    meseVisualizzato = mese
    document.getElementById("quadrati").innerHTML = ""
    const nGiorni = mesi[mese].giorni
    for (let i = 0; i < nGiorni; i++) {
        //quadrati.innerHTML += "<div class='giorno'> </div>"
        document.getElementById("quadrati").innerHTML += 
            `<div class='giorno'>
                <h3>
                    ${i+1}
                </h3>
            </div>`
    }
    for (let index = 0; index < 12; index++) {
        document.getElementById(index).style.color = 'white'
    }
    document.getElementById(mese).style.color = 'yellow'

    if(mese == meseCorrente()){
        coloraGiorno()
    }
    inserisciInput(mese)

    //inserisco gli impegni
    for (let index = 0; index < impegni.length; index++) {
        if(impegni[index].mese == meseVisualizzato){
            /*mese
            giorno
            titolo
            orario*/
            const caselle = document.getElementsByClassName("giorno")
            caselle[impegni[index].giorno].innerHTML += `<p>${impegni[index].orario}: ${impegni[index].titolo}</p>`
        }
        
    }
}

function coloraGiorno(){
    const elementi = document.getElementsByTagName("h3")
    
    //console.log(elementi)
    const giorno = giornoCorrente()-1
    elementi[giorno].style.backgroundColor = "yellow"
}
function inserisciInput(mese){
    const finestraInput = document.getElementById("inputFinestra")
    //console.log(finestraInput)
    finestraInput.innerHTML = 
        `   <input type="number" title="data" placeholder="giorno" id="giorno" min="1" max="${mesi[mese].giorni}">
            <input type="time" title="ora" id="ora">
            <br>
            <input type="text" id="titolo" placeHolder="Titolo">
            
            <br>
            <button onclick="settaImpegno()">Invia </button>`
            //<input type="text" id="descrizione" placeHolder="Descrizione">

}
function settaImpegno(){
    const InputGiorno = document.getElementById("giorno").value
    const InputOra = document.getElementById("ora").value
    const InputTitolo = document.getElementById("titolo").value
    //const InputDescrizione = document.getElementById("descrizione").value

    const caselle = document.getElementsByClassName("giorno")
    caselle[InputGiorno-1].innerHTML += `<p>${InputOra}: ${InputTitolo}</p>`

    console.log(InputGiorno)

    document.getElementById("giorno").value = ""
    document.getElementById("ora").value = ""
    document.getElementById("titolo").value = ""
    console.log(meseVisualizzato)
    const impegno = {
        /*mese
        giorno
        titolo
        orario*/
        mese: meseVisualizzato,
        giorno: InputGiorno-1,
        titolo: InputTitolo,
        orario: InputOra
    }
    impegni.push(impegno)
    aggiorna()
}


caricamento();
