// mattis individuella inlämning.
// Denna är under utveckling och fungerar inte riktigt rätt ännu.
// Beskrivande inledande rubrik, sedan inmatningsfält med:
// 1.tids-stämpel
// 2.namn (senare dolt namn, valt användarnamn)
// 3.email
// 4.telefonnummer
// 5.inlägg

// get element...

// const express = require("express");
// const app = express();
// app.get("/", (req, res) =>{
//     res.sendFile(__dirname + "/indexmhh.html");
// });
// app.listen(3000);
// console.log("Gästboken är online.");

// let namn = document.getElementById('namn');
// let email = document.getElementById('email');
// let mobil = document.getElementById('mobil');
// let inlagg = document.getElementById('gestboksinlegg');
// let pass = document.getElementById('pass');
// lägg till inmatningskontroll typ regex på detta ovan.
let fs =require("fs");
const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// knappen skicka bör aktivera tillverkandet av filen, inläsning och tillägg
r1.question('Skriv 1 för att köra del 1 och skapa fil, 2 för att köra del 2 och spara till befintlig fil',
(answer) =>{
    console.log(answer);
    if(answer== 1){
        let data = `
        [{
        "namn": "Sigbjörn Brunto",
        "email": "sbjornB@dunderkloss.se",
        "mobil": "0701234567",
        "inlagg": "Är det här man skriver in något och trycker på skicka?",
        "pass": "Lösenord1234"
        }, {
        "namn": "Skrytbengt MacFjärdhundra",
        "email": "bestbengan@bengtarbast.bengt",
        "mobil": "0761234567",
        "inlagg": "Ja visst fan är det här du trycker skicka, imbecill!",
        "pass": "IngenHybris1337"
        }]
        `;
        let object = JSON.parse(data);
        console.log("First object name: " + object[0].name);
        fs.writeFile("km10.json", JSON.stringify(object), function(err){
            if(err) throw err;
            console.log('Ny fil sparad, om det inte fanns någon');
        });
    } else {
        fs.readFile("km10.json", function(err,data){
            let json = JSON.parse(data);
            json.push({"namn": "Krystlejf Den Sege", "email": "forstoppning@transleffe.se", "mobil": "0707654321", "inlagg": "Det visste jag väl redan... hurr durr..", "pass": "VartÄrMuggen?"});
            fs.writeFile("km10.json", JSON.stringify(json), function(err){
                if(err) throw err;
                console.log("Ändringarna är nog sparade nu ska du se!!!!");
            });
        });
    }});