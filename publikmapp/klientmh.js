// SÅHÄR BLEV DET FÄRDIGA RESULTATET:

$(document).ready(function () { // samma som window.onload
    $("#submit").click(function () { //obs! knappen i html har id="submit"

         let namn = document.getElementById('namn').value;
         let mobil = document.getElementById('mobil').value;
         let email = document.getElementById('email').value;
         let inlagg = document.getElementById('inlagg').value; // samma för alla, fast de är olika typer = går via ID.
         let pass = document.getElementById('pass').value;

         var namnLabel = document.getElementById('namnLabel'); // hämtar ID för de som jag vill ändra Label - texten för.
         var mobilLabel = document.getElementById('mobilLabel');
         var emailLabel = document.getElementById('emailLabel');
         var passLabel = document.getElementById('passLabel');

         var regexName = /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i; // namn
         
         let namnTest = function(reg,str) {
            if (reg.test(str)) {          
               namnLabel.innerHTML="Namn OK!"; 
               return true; 
            }else{
               namnLabel.innerHTML="Fel namninput! Försök igen"; // fel-feedback kör jag just nu som texten ovanför inmatningsrutan!
               return false; // obvious shit.
            }
         }
         let mobilTest = function(){ // Använder tilläggs-filen validator för att kolla om det är ett svenskt mobilnr/med/utan +46 och rätt längd.
            if(validator.isMobilePhone(mobil,'sv-SE')){
               mobilLabel.innerHTML = "Nr OK!";
               return true;
            }else{
               mobilLabel.innerHTML = "Fel nummer! Kan du inte ditt egen nr eller är du bara sopslut?";
               return false;
            }
         }
         let emailTest = function(){
            if(validator.isEmail(email)){ // validator-tillägget kollar om det är mail..
               emailLabel.innerHTML="Mail OK!"; 
               return true;
            }else{
               emailLabel.innerHTML="Fel format, försök igen!"; // diverse felmeddelanden för varje separat label
               return false;
            }
         }
         let passTest = function(){
            if(validator.isStrongPassword(pass)){ // Den här är lite småkaxig, räknar ihop poäng eller bara true/false.
               passLabel.innerHTML="Lösenord OK!"; // Default(för jag orkar inte ändra just nu..) är 8 tecken långt, 1 symbol, 1 siffra, 1 stor bokstav.
               return true; ///////////////////////////////////////////////////// gröntext för att underlätta printscreen.. //////////////////////////////////////////////////////////
            }else{
               passLabel.innerHTML="Fel format på lösenord!";
               return false;
            }
         }
         let inlaggJustering = function(){ // Anti-ful -input. Gör om < till &;amp eller vafan det brukar va.
             // Gör det med inlägg just nu, ska implementera överallt strax..
            inlagg=validator.escape(inlagg);
         }
         // under: kollar att alla returnar = true, && för att varenda en ska stämma innan det skickas iväg
         if(
         namnTest(regexName,namn) == true && // Här får namnTest sina 2 inputs reg, str. dvs regexName vs namn jämförs.
         mobilTest(mobil) == true &&
         emailTest() == true &&
         passTest() == true
         )
         {
         inlaggJustering();// Jaha ja? nu stämmer allt, alla tester är true, men då kör vi justering av inläggets text med krokodiljanne mm...
         $.post("/request", // och skickar iväg fanskapet till servern, hoppas det smakar!
          {
             namn: namn, // div.krafs
             mobil: mobil,
             email: email,
             inlagg: inlagg,
             pass: pass
          },
          function (data, status) { 
             console.log(data); //
          });

          console.log("Namnvariabel: " + namn +
          "\nMobilvariabel: "+ mobil + 
          "\nEmailvariabel: "+ email + 
          "\nInläggvariabel: " + inlagg +
          "\nPasswordvariabel: " +pass);
          alert("Success!"); // jamen grattis
          location.reload(); // laddar om hemsidan
      }else{
         event.preventDefault();
         console.log("Något stämmer inte, bokningen har ej skickats.");
      }
});
/*
let datumTest = function () {
      dt = new Date().toISOString().split(".")[0].replace(/[^\d]/gi, ""); // skapar datum utan symboler, bara siffror.
      dagensdatum = dt.substring(0, 8); // endast ååååmmdd, inte mikrosekunder etc.
      dagenstid = dt.substring(9, 12); // endast hhmm
      formateradTid = tid.toString().split(".")[0].replace(":", ""); // tid utan krimskrams
      formateratDatum = datum.toString().split(".")[0].replace(/[^\d]/gi, ""); //datum utan krimskrams

      if (formateratDatum >= dagensdatum) {
        console.log("Datum OK!");
        return true;
      } else {
        alert("Datum måste vara efter dagens datum");
        console.log("Datum och Tid ERROR!");
        return false;
      }
    };
*/ // datumfunktionen jag gjorde i gruppuppg.



// AJAX-RELATERAT HÄR UNDER
let hamtaData = function(){
   let forfragan = new XMLHttpRequest(); // skapar nytt request.

   forfragan.open("GET", "/andratextmedajax"); // be servern om innehållet 
   forfragan.onload = function(){ // det här startar när vi fått innehållet 
      console.log("Servern svarade på min förfrågan med:");
      console.log(this.response); // servern svarade med det här.
      document.getElementById("ajaxText").innerHTML = this.response;
   } // OVANFÖR: Ändrar texten under rubriken
   forfragan.send();
}
$("#h2refresh").click(function () { // knapp anropar
   hamtaData();
});
})
// AJAX-RELATERAT HÄR OVANFÖR
