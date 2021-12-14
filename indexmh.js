const express = require("express"); // Diverse prylar servern behöver, några har jag lagt till
const fs = require("fs");// Och några dök upp av sig själv när jag klantade mig.
const path = require("path"); 
const { body, validationResult } = require("express-validator");
const M = require("minimatch"); // den här kom ur tomma intet.. vågar inte röra något.
const PORT = process.env.PORT || 3000; // port
const app = express(); // servern använder express
app.use(express.static(path.join(__dirname, "publikmapp")));
app.use(express.urlencoded({ extended: false }));  // express är med flit
app.get("/", (req, res) =>{
  res.sendFile("indexmhh.html", {root: "./publikmapp"}); // tillgång till filer
});
app.post("/inlagg", (req, res) =>{ // Hanterar inlägg, hela denna råkade jag radera cleant.
  const inlagg = { // felsökte och felsökte..
    datum_received: req.body.datum, // försökte först köra med kontroll av att användaren redan inte finns..
    nick_received: req.body.nick, // och olika knep men nick OCH namn = fungerar.
    inlagg_received: req.body.inlagg, 
  }
  const inlaggData = fs.readFileSync("inlagga.json"); // läser ur inläggsregistret
  omvandlaInlagg = JSON.parse(inlaggData);
  omvandlaInlagg.push(inlagg);  // formaterar till array och slutligen 
  fs.writeFileSync( // skriver den till registret igen med nytt info.
    "inlagga.json",
    JSON.stringify(omvandlaInlagg, null, 2),
    (err) => {
      if (err) throw err;
      console.log("Inlägget lades till korrekt!");
    });
    res.send()
});
app.post("/createUser", (req,res) => { //fd. request i klientmh
  const skapaAnv = { // denna innehåller beståndsdelarna till en fullständig användare.
    nick_received: req.body.nick,
    namn_received: req.body.namn,
    mobil_received: req.body.mobil,
    email_received: req.body.email,
    pass_received: req.body.pass,
  };   
    const dataTagetUrFil = fs.readFileSync("skapaAnv.json"); // läser in befintliga användare.
    anvArray = JSON.parse(dataTagetUrFil);
    anvArray.push(skapaAnv); // formaterar och sparar.
    fs.writeFile(
      "skapaAnv.json",
      JSON.stringify(anvArray, null, 2),
      (err) => {
        if (err) throw err;
        console.log("Användaren skapades korrekt!");
      });
      res.send("1");// skickar en 1a i strängform
});                 // för att kunna === jämföra och bekräfta: användare online i klientskriptet
// AJAX-RELATERAT, skickar ett enkelt svar om du trycker på en knapp på hemsidan.
app.get("/andratextmedajax", (req,res) =>{
  let asd = "Servertext";
  res.send(asd);
});
// den här skickar nu inlägg vid begäran! vidareutveckling av ovanstående.
app.get("/andratextmedajax2", (req,res) =>{
  const inl = JSON.parse(fs.readFileSync("inlagga.json"));
  let inlTextForm = "";
  for (let i = 0; i < inl.length; i++) {
    inlTextForm +=
      "Datum: "+inl[i].datum_received+"<br>"+
      "Nick: "+inl[i].nick_received +"<br>"+ // samma som gemensamma projektet, fast light.
      "Inlägg: "+inl[i].inlagg_received+"<br><br>" ;
  }
  res.send(inlTextForm); // skickar det omvandlade registret (plus ev nytt inlägg!) på begäran
});
app.post("/loggaIn", (req,res)=>{
  let svar="";
  const skapaAnv = { // för att logga in behöver man bara nick och password.
    nick_received: req.body.nick,
    pass_received: req.body.pass,
  };   console.log("Tog emot NICK: "+skapaAnv.nick_received + // visar för serverkonsollen ikommande inloggningsuppgifter.
  "\nPASS: "+skapaAnv.pass_received);
    const dataTagetUrFil = fs.readFileSync("skapaAnv.json");
    anvArray = JSON.parse(dataTagetUrFil);
    //anvArray.push(skapaAnv); behövs inte för att kontrollera användare med for-loop.

    for(let i = 0; i < anvArray.length;i++){
      if(skapaAnv.nick_received == anvArray[i].nick_received &&
        skapaAnv.pass_received == anvArray[i].pass_received){
        svar ="1"; // "1" som sträng sätter användare som online i klientskriptets ( två ställen.)
      } else if (skapaAnv.nick_received == anvArray[i].nick_received &&
        skapaAnv.pass_received != anvArray[i].pass_received){
          svar ="2"; // "2" är nåt annat än "1"
        } 
    }
 res.send(svar); // skickar 1:an eller 2:an
 console.log(svar);
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  
