const express = require("express");
const fs = require("fs");
const path = require("path"); 
const { body, validationResult } = require("express-validator");
const M = require("minimatch");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, "publikmapp")));
app.use(express.urlencoded({ extended: false }));
let omvandlaInlagg = new Array();
let omvandlaSkapaAnv = new Array();

app.get("/", (req, res) =>{
  res.sendFile("indexmhh.html", {root: "./publikmapp"});
})


app.post("/inlagg", (req, res) =>{
  const inlagg = {
    datum_received: req.body.dagensdatum,
    inlagg_received: req.body.inlagg
  } 
  const inlaggData = fs.readFileSync("inlagga.json");
  omvandlaInlagg = JSON.parse(inlaggData);
  omvandlaInlagg.push(inlagg);
});
app.post("/user", (req,res) => { //fd. request i klientmh
  const inlagg = {
    datum_received: req.body.dagensdatum,
    inlagg_received: req.body.inlagg
  } 
  const skapaAnv  = {
            namn_received: req.body.namn, 
            mobil_received: req.body.mobil,
            email_received: req.body.email,
            //inlagg_received: req.body.inlagg,
            pass_received: req.body.pass,
         };
             
    const filData = fs.readFileSync("skapaAnv.json");
    omvandlaText = JSON.parse(filData);
    omvandlaText.push(skapaAnv);
    const inlaggData = fs.readFileSync("inlagga.json");
    omvandlaInlagg = JSON.parse(inlaggData);
    omvandlaInlagg.push(inlagg);

    fs.writeFile("skapaAnv.json",JSON.stringify(omvandlaSkapaAnv, null, 2),
      (err) => {
        if (err) throw err;
        console.log("Användaren skapades korrekt!");
      });

});
// AJAX-RELATERAT HÄR UNDER
app.get("/andratextmedajax", (req,res) =>{
   let asd = "Text från servern";
   res.send(asd); 
});;
// AJAXRELATERAT HÄR OVANFÖR
const inloggTest= {
  anv: "Admin Adminsson",
  pass: "PasswordPasswordsson_89"
};
app.post("/", (req,res)=>{
  const mottagnaLoginUppg = {
    username: req.body.username,
    password: req.body.password,
  };
  if(mottagnaLoginUppg.username !== inloggTest.username){
    console.log("Fel userinput.");
  }
  else if ( mottagnaLoginUppg.username === inloggTest.username &&
    mottagnaLoginUppg.password !== inloggTest.password){
      console.log("Fel password.");
  }
  else {
    // rätt inloggad: datumstämpel,användarnamn,inlägg ska synas
    const inlaggFultFormat = JSON.parse(fs.readFileSync("inlagga.json"))
    let resultat = "";
    const skapaAnvFultFormat = JSON.parse(fs.readFileSync("skapaAnv.json"));
    
    for (let i = 0; i < inlaggFultFormat.length; i++){
      resultat +=
      "Datum: " +
      inlaggFultFormat[i].datum_received +
      "<br>" +
      "User: " +
      skapaAnvFultFormat[i].namn_received +
      "<br>" +
      "Inlägg: "+
      inlaggFultFormat[i].inlagg_received +
      "<br><br>";
    }
    fs.readFile("./publikmapp/indexmhh.html", (err, data) => {
      let nyHTML = data
        .toString()
        .replace("Logga in för att göra inlägg.", omvandlaText);

      res.send(nyHTML);
    });
  }
})
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass