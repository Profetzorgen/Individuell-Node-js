// mattis individuella inlämning. Version 1.0
// Denna är under utveckling och fungerar inte riktigt rätt ännu.
// Beskrivande inledande rubrik, sedan inmatningsfält med:
// 1.tids-stämpel
// 2.namn (senare dolt namn, valt användarnamn)
// 3.email
// 4.telefonnummer
// 5.inlägg
// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
// get element...

const express = require("express");
const app = express();
///////////////////////////
let fs =require("fs");
const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
app.use(express.static("publikmapp"));
app.use(express.urlencoded({ extended: true }));
//////////////////////////
app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/indexmhh.html");
});
app.listen(3000);
console.log("Gästboken är online.");


app.get("/processa-forfragan", (req, res) => {
    
    console.log("Mottog förfrågan från klient xhttp");

    res.send("Server säger: du lyckades!");
    jsonHelaRasket();
});
let jsonHelaRasket = function () {
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
        //// första delen ovanför, andra eller tredje här under
    fs.readFile("km10.json", function(err,data){
    let json = JSON.parse(data);
    json.push({"namn": namn, "email": email, "mobil": mobil, "inlagg": inlagg, "pass": pass});
    fs.writeFile("km10.json", JSON.stringify(json), function(err){
        if(err) throw err;
        console.log("Om detta fungerade, har du nu sparat informationen korrekt!");
    });
})
}
