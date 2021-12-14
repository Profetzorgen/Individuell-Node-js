const express = require("express");
const fs = require("fs");
const path = require("path"); 
const { body, validationResult } = require("express-validator");
const M = require("minimatch");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, "publikmapp")));
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) =>{
  res.sendFile("indexmhh.html", {root: "./publikmapp"});
});
app.post("/inlagg", (req, res) =>{
  const inlagg = {
    datum_received: req.body.datum,
    nick_received: req.body.nick,
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
    
});
app.post("/createUser", (req,res) => { //fd. request i klientmh
  const skapaAnv = { 
    nick_received: req.body.nick,
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
  res.send(asd);
});
app.get("/andratextmedajax2", (req,res) =>{
  const inl = JSON.parse(fs.readFileSync("inlagga.json"));
  let inlTextForm = "";
  for (let i = 0; i < inl.length; i++) {
    inlTextForm +=
      "Datum: "+inl[i].datum_received+"<br>"+
      "Nick: "+inl[i].nick_received +"<br>"+
      "Inlägg: "+inl[i].inlagg_received+"<br><br>" ;
  }
  res.send(inlTextForm);
});
app.post("/loggaIn", (req,res)=>{
  let svar="";
  const skapaAnv = { 
    nick_received: req.body.nick,
    pass_received: req.body.pass,
  };   
    const dataTagetUrFil = fs.readFileSync("skapaAnv.json");
    anvArray = JSON.parse(dataTagetUrFil);
    //anvArray.push(skapaAnv);

    for(let i = 0; i < anvArray.length;i++){
      if(skapaAnv.nick_received == anvArray[i].nick_received &&
        skapaAnv.pass_received == anvArray[i].pass_received){
        svar +=""+anvArray[i].nick_received;
      } else if (skapaAnv.nick_received == anvArray[i].nick_received &&
        skapaAnv.pass_received != anvArray[i].pass_received){
          svar +="Användaren finns, Fel lösenord";
        } 
    }
 res.send(svar);
 console.log(svar);
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  
