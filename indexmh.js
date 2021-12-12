const express = require("express");
const fs = require("fs");
const path = require("path"); 
const { body, validationResult } = require("express-validator");
const port = process.env.PORT || 3000;
const app = express();
// Det är här som path drar ihop projektmappen med diverse annat på något vis.
app.use(express.static(path.join(__dirname, "publikmapp")));
app.use(express.static(static_path));
// Ger express tillgång till input från formulär. Vet ej vad extended: true/false gör.
app.use(express.urlencoded({ extended: false }));

let omvandlaText = new Array();

// Eftersom jag lagt mina mappar som en möglig kråka behöver jag ha denna här under:
app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/publikmapp/indexmhh.html");
});


// AJAX-RELATERAT HÄR UNDER
app.get("/andratextmedajax", (req,res) =>{
   let asd = "Text från servern";
   res.send(asd); 
});;
// AJAXRELATERAT HÄR OVANFÖR

// app.post("/request", (req, res) => { 
//    res.json([{
//       namn_recieved: req.body.namn, 
//       mobil_recieved: req.body.mobil,
//       email_recieved: req.body.email,
//       inlagg_recieved: req.body.inlagg,
//       pass_recieved: req.body.pass,
//    }]) 
// });
app.post("/request", (req,res) => {
   const mottagetInlagg  = {
            namn_recieved: req.body.namn, 
            mobil_recieved: req.body.mobil,
            email_recieved: req.body.email,
            inlagg_recieved: req.body.inlagg,
            pass_recieved: req.body.pass,
         };
             
    const filData = fs.readFileSync("inlagg.json");
    omvandlaText = JSON.parse(filData);
    omvandlaText.push(mottagetInlagg);

    fs.writeFile("inlagg.json",JSON.stringify(omvandlaText, null, 2),
      (err) => {
        if (err) throw err;
        console.log("Inlägget hanterades korrekt!");
      });

app.listen(port, () => {
   console.log(`server is running at ${port}`);
});
})
/* 
skriva till fil, läsa från fil
*/

///
      /// ANTECKNINGAR, ATT GÖRA: Skriva fil, uppdatera hemsida, ajax!
      /*
      1.Ha möte, lär teamet hur man skriver till fil!
      2.Kolla om nåt annat ska läras.
      3.Kolla om min kod behöver ändras, förklaras.
      4.När mötet är klart: 
       --skriva till fil och läsa från fil på individuella
       --uppdatera hemsidan med ajax om nån gör ett inlägg utan att ladda om sidan
       --jquery dropdown,menynavigering,inloggningskonto-hantering (async?)
       --validering serverskript, sedan, validering klientskript
       --skriva till fil och läsa till fil på gemensamma
       --uppdatera hemsidan, gemensamma
       --slutligen=styling med css på både gemensama och individuella uppg.
       --uppgifter del 2. sockets etc.
       --kanske ha chattfönster med sockets på individ/gemensam?


       FRÅN MÖTE:
       1.Användaren gör ett inlägg.
       2.Inlägget skickas till server.
       3.Server sparar den på befintlig fil och uppdaterar hemsidan utan att den laddas om.
       
       FRÅN MÖTE MED RONJA:
       1. RONJA FIXAR SERVERVALIDERING
       2. RONJA FIXAR LÄSA SKRIVA TILL FRÅN FIL json format etc.
       3. MATTI KOLLAR UPP AJAX.
       4. RONJA LADE TILL ADMIN PÅ PANG, NÄR VI SKRIVER IN ANV NAMN.
       OCH LÖSENORD, KOLLAS DESSA MOT SPARAD INFO, VID KORREKT INFO:
       SÅ SKA DET SOM SPARATS IN PÅ JSON FILEN, BOKNINGSFORMULÄRET
       LÄSAS UPP PÅ HEMSIDAN, SERVER HÄMTAR FRÅN FILEN, LÄGGER UPP PÅ
       SIDAN, MED AJAX. ALL BOKNINGSINFO FRÅN .JSONFIL VISAS FÖR ADMIN
       PÅ SIDAN MED AJAX.
       MATTI: Kolla upp PÅ ADMIN.HTML, kommunikation via ajax mellan:
       DET SOM RONJA FIXAR, ÄR ATT SERVERN KAN LÄSA JSON OCH SKICKA TILL
       ADMIN.HTML VIA KLIENTEN
      */
///// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass