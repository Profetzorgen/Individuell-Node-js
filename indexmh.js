const express = require("express");
const fs = require("fs");
const path = require("path"); 
const { body, validationResult } = require("express-validator");
const M = require("minimatch");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, "publikmapp")));
app.use(express.urlencoded({ extended: false }));

app.get("/hämtainläggen", (req,res) =>{
  let inlaggUrFil = JSON.parse(fs.readFileSync("inlagga.json"));
  let inlaggArray = {
   datum: "",
   namn: "",
   inlagg: "",
  };
     for (let i = 0; i < inlaggUrFil.length; i++){
      inlaggArray.datum = inlaggUrFil[i].datum_received,
      inlaggArray.namn = inlaggUrFil[i].namn_received,
      inlaggArray.inlagg = inlaggUrFil[i].inlagg_received,
      JSON.stringify(inlaggArray, null, 2),(err) => {
          if (err) throw err;
          console.log("OK");
        }
      }
      res.send(inlaggArray);
});
app.get("/", (req, res) =>{
  res.sendFile("indexmhh.html", {root: "./publikmapp"});
});
app.post("/inlagg", (req, res) =>{
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
    res.send()
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
      res.send();
});
// AJAX-RELATERAT, skickar ett enkelt svar om du trycker på en knapp på hemsidan.
app.get("/andratextmedajax", (req,res) =>{
  let asd = "Servertext";
  res.send(asd);
});
app.post("/loggaIn", (req,res)=>{
  let mottUppg = {
    namn_received: req.body.namn,
    pass_received: req.body.pass,
  };
  let kontroll="";
  // kolla om användaren existerar
  let anvUrFil = JSON.parse(fs.readFileSync("skapaAnv.json"));
  if(mottUppg.namn_received=="" || mottUppg.pass_received==""){
    kontroll="FEL";
  } else {
    for(let i=0; i < anvUrFil.length; i++){
      if(anvUrFil[i].namn_received == mottUppg.namn_received &&
       anvUrFil[i].pass_received == mottUppg.pass_received){
         kontroll = "OK";
         console.log(kontroll);
       }
       else if(anvUrFil[i].namn_received != mottUppg.namn_received &&
         anvUrFil[i].pass_received == mottUppg.pass_received){
           kontroll = "namnfel";
         }
       else if(anvUrFil[i].namn_received == mottUppg.namn_received &&
         anvUrFil[i].pass_received != mottUppg.pass_received){
           kontroll = "passfel";
       } else {
         kontroll = "nullFel";
       }
  }
  
 }
 res.send(kontroll);
 console.log(kontroll);
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  
