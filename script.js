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
const giorniInMese = [31,28,31,30,31,30,31,31,30,31,30,31]
const data = new Date()

function calcolaGiorni(){
    for (let i = 0; i < 12; i++) {
        let mese = {
            mese: listaMesi[i],
            giorni: giorniInMese[i]
        }
        mesi.push(mese)
        
    }
}

//console.log(mesi)
function caricamento(){
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
}

calcolaGiorni();
caricamento();
