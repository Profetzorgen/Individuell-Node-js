// Detta är klientskript, den ska i stort sett bara validera input, spara den, skicka den med ajax.
window.onload = function() {

document.getElementById("mittFormulär").addEventListener("submit", function(evt){
    // när submit trycks, gör något, förslagsvis skicka till servern all ovanstående info!

    let namn = document.getElementById('namn');
    let email = document.getElementById('email');
    let mobil = document.getElementById('mobil');
    let inlagg = document.getElementById('gestboksinlegg');
    let pass = document.getElementById('pass'); // .value?
    let forfragan = new XMLHttpRequest();
    forfragan.open("GET", "/hamta-data");
    

})
}

