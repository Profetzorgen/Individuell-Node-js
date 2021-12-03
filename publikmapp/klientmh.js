const { query, urlencoded } = require("express");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
// Detta är klientskript, den ska i stort sett bara validera input, spara den, skicka den med ajax.
window.onload = function() {
    let namn = document.getElementById('namn');
    let email = document.getElementById('email');
    let mobil = document.getElementById('mobil');
    let inlagg = document.getElementById('gestboksinlegg');
    let pass = document.getElementById('pass'); // .value?
app.post("/processa-forfragan", (req, res) =>{
    namn = String(req.body.namn);
    email = String(req.body.email);
    mobil = String(req.body.mobil);
    inlagg = String(req.body.inlagg);
    pass = String(req.body.pass);
    res.send(`${namn}${email}${mobil}${inlagg}${pass}`);
})
}
// document.getElementById("knapp").innerHTML = this.response;

