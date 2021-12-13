const express = require("express");
const fs = require("fs");
const path = require("path"); 
const { body, validationResult } = require("express-validator");
const M = require("minimatch");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, "publikmapp")));
app.use(express.urlencoded({ extended: false }));
let anvOnline = false;

let kombineraJson = function () {
  if(anvOnline === true){
    let anvUrFil = JSON.parse(fs.readFileSync("skapaAnv.json"));
    let inlaggUrFil = JSON.parse(fs.readFileSync("inlagga.json"));
    let komboArray = {
     datum: "",
     namn: "",
     mobil: "",
     email: "",
     inlagg: "",
     pass: "",
    };
       for (let i = 0; i < inlaggUrFil.length; i++){
         komboArray.datum = inlaggUrFil[i].datum_received,
         komboArray.namn = anvUrFil[i].namn_received,
         komboArray.mobil = anvUrFil[i].mobil_received,
         komboArray.email = anvUrFil[i].email_received,
         komboArray.inlagg = inlaggUrFil[i].inlagg_received,
         komboArray.pass = anvUrFil[i].pass_received,
         fs.writeFile(
          "kombo.json",
          JSON.stringify(komboArray, null, 2),
          (err) => {
            if (err) throw err;
            console.log("OK");
          });
        } 
  } else {
    console.log("Användaren är inte inloggad!");
  }

};
app.get("/", (req, res) =>{
  res.sendFile("indexmhh.html", {root: "./publikmapp"});
});
app.post("/inlagg", (req, res) =>{
  let skickat = false;
  const inlagg = {
    datum_received: req.body.datum,
    namn_received: req.body.namn,
    inlagg_received: req.body.inlagg,
  }
  const inlaggData = fs.readFileSync("inlagga.json");
  omvandlaInlagg = JSON.parse(inlaggData);
  omvandlaInlagg.push(inlagg);
  fs.writeFile(
    "inlagga.json",
    JSON.stringify(omvandlaInlagg, null, 2),
    (err) => {
      if (err) throw err;
      console.log("Inlägget lades till korrekt!");
    });
    // kombineraJson();
    res.send();
});
app.post("/createUser", (req,res) => { //fd. request i klientmh
  const skapaAnv = {
    namn_received: req.body.namn,
    mobil_received: req.body.mobil,
    email_received: req.body.email,
    pass_received: req.body.pass,
  };   
    const dataTagetUrFil = fs.readFileSync("skapaAnv.json");
    anvArray = JSON.parse(dataTagetUrFil);
    anvArray.push(skapaAnv);
    fs.writeFile(
      "skapaAnv.json",
      JSON.stringify(anvArray, null, 2),
      (err) => {
        if (err) throw err;
        console.log("Användaren skapades korrekt!");
      });  
});
// AJAX-RELATERAT, skickar ett enkelt svar om du trycker på en knapp på hemsidan.
app.get("/andratextmedajax", (req,res) =>{
  let asd = "Servertext";
  if(anvOnline === true){
    asd = "Server bekräftar: Användaren är online!";
  } else asd = "Servern nekar: Användaren är OFFLINE!";
  res.send(asd);
});
app.post("/loggaIn", (req,res)=>{
  let mottUppg = {
    namn_received: req.body.namn,
    pass_received: req.body.pass,
  };
  let inloggad="";
  // kolla om användaren existerar
  let anvUrFil = JSON.parse(fs.readFileSync("skapaAnv.json"));

  for(let i=0; i < anvUrFil.length; i++){
   if(anvUrFil[i].namn_received == mottUppg.namn_received &&
    anvUrFil[i].pass_received == mottUppg.pass_received){
      anvOnline = true;
      inloggad = "inloggad";
      console.log(inloggad);
      break;
    }
    else if(anvUrFil[i].namn_received != mottUppg.namn_received &&
      anvUrFil[i].pass_received == mottUppg.pass_received){
        inloggad = "namnfel";
        anvOnline = false;
      }
    else if(anvUrFil[i].namn_received == mottUppg.namn_received &&
      anvUrFil[i].pass_received != mottUppg.pass_received){
        inloggad = "passfel";
        anvOnline = false;
    } else {
      inloggad = "nullFel";
      anvOnline = false;
    }
 }
 res.send(inloggad);
 console.log(inloggad);
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  
