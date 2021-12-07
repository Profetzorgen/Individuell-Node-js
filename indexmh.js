// Tydligen räcker den här mängden kod
const express = require("express") // const = går ej att ändra,spikad variabel
const path = require("path"); // express vet ni vad det är, en grej i javascript.
  
const app = express(); // app använder express
const port = process.env.PORT || 3000; // såhär skriver man tydligen också. säger bara 
// lyssna på 3000.
  
// Kopierad kod från nätet,, blev så rörigt att klippa och klistra.
// denna under ska iaf dra ihop projektmappen med diverse annat.
const static_path = path.join(__dirname, "publikmapp");
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));
//...men om den inte gör det, se under:

// Eftersom jag lagt mina mappar som en möglig kråka behöver jag ha denna här under:
app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/publikmapp/indexmhh.html");
});
// Oavsett vad så måste man lägga rätt sökväg tills allt hittar varann.. mer om det
// senare...


// Det klonkade till i port 3000! är det ett fyllo? är det en inbrottstjuv? NEJ!
// För det är bara ett inkommande fanskap som vill åt /request!
// Och om dom vill ha ett svar, då är det bäst att de ger mig 5 variabler i json-format!
app.post("/request", (req, res) => { // När någon postar mig strängvariabler upplagda som i json
   res.json([{ // spara dem i json-format.
      namn_recieved: req.body.namn, // Jag fick ett namn, för jag requestade ett namn.
      mobil_recieved: req.body.mobil,
      email_recieved: req.body.email,
      inlagg_recieved: req.body.inlagg,
      pass_recieved: req.body.pass,
   }]) // ALLT FUNKADE, ALLA VARIABLER STÄMMER!ja men..
});//<----- Ta en kringla vetja! Var inte blyg, det finns massor!


// Jag är server, en kort klase med kod, jag lyssnar på port 3000 och svarar
// på klienter (användarjäklarnas) anrop.
// <----- det syns här till vänster att nodemon startar om servern varje gång jag skrivit
// en endaste bokstav.
app.listen(port, () => {
   console.log(`server is running at ${port}`);
});

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
      */
///