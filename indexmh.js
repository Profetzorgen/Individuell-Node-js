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
//////////////////////////
app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/indexmhh.html");
});
app.listen(3000);
console.log("Gästboken är online.");

app.use(express.static("publikmapp"));
app.get("/addition", (req, res) => {
    console.log("Mottog förfrågan från klient xhtml");
    let namn = req.query.namn;
    let email = req.query.email;
    let mobil = req.query.mobil;
    let inlagg = req.query.inlagg;
    let pass = req.query.pass;
    req.send(`${namn}+${email}+${mobil}+${inlagg}+${pass}`);

fs.readFile("km10.json", function(err,data){
    let json = JSON.parse(data);
    json.push({"namn": namn, "email": email, "mobil": mobil, "inlagg": inlagg, "pass": pass});
    fs.writeFile("km10.json", JSON.stringify(json), function(err){
        if(err) throw err;
        console.log("Om detta fungerade, har du nu sparat informationen korrekt!");
    });
})})