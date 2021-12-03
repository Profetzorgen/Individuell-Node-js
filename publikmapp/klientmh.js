// Detta är klientskript, den ska i stort sett bara validera input, spara den, skicka den med ajax.
window.onload = function() {

document.getElementById("mittFormulär").addEventListener("submit", function(evt){
    // när submit trycks, gör något, förslagsvis skicka till servern all ovanstående info!
    evt.preventDefault();
    namn = document.getElementById('namn');
    email = document.getElementById('email');
    mobil = document.getElementById('mobil');
    inlagg = document.getElementById('gestboksinlegg');
    pass = document.getElementById('pass'); // .value?
    
    let forfragan = new XMLHttpRequest(); // skapar ett nytt req
    forfragan.open("GET", "/addition?namn&email&mobil&inlagg&pass");
     // (2) definiera vad som ska hända på klientsidan när vi får svar från servern
     forfragan.onload = function() {
        // här skriver vi vad som ska hända när vi får svar från servern
        console.log("Mottog svar från servern");
        document.getElementById("knapp").innerHTML = this.response;
    }
    // (3) skicka förfrågan
    forfragan.send();
}
}

