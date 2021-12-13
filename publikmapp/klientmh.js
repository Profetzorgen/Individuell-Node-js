
// SÅHÄR BLEV DET FÄRDIGA RESULTATET:
$(document).ready(function () { // samma som window.onload

   let inlaggSkickaRuta = document.getElementById("inlaggSkickaRuta");
   let usersPanelen = document.getElementById("users");
   var onlineBool = false;
   let regexName = /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i;
   let hanteraOnline = function(vem){
      if(onlineBool === false){
         usersPanelen.style.display = "block";
         inlaggSkickaRuta.style.display = "none";
         console.log("onlinebool: "+onlineBool + "\n  FRÅN:"+vem);
      }
      else if (onlineBool===true){
         usersPanelen.style.display = "none";
         inlaggSkickaRuta.style.display = "block";
         console.log("onlinebool: "+onlineBool +"\n  FRÅN: "+vem);
         alert("Du loggas in, för att registrera eller logga in annan användare "+
         ",vänligen logga ut");
      }
   };
   let namnTest = function(namn,namnLabel,regexName) {
      if (regexName.test(namn)) {          
         namnLabel.innerHTML="Namnformatet OK!"; 
         console.log("Resultat nytt namntest: True");
         return true; 
      }else{
         namnLabel.innerHTML="Fel namninput! Försök igen"; 
         console.log("Resultat nytt namntest: False");
         return false; // obvious shit.
      }
   };
   let passTest = function(pass,passLabel){
      if(validator.isStrongPassword(pass)){ 
         passLabel.innerHTML="Lösenordsformatet OK!"; 
         console.log("Resultat nytt passtest: True");
         return true; 
      }else{
         passLabel.innerHTML="Fel format på lösenord!";
         console.log("Resultat nytt passtest: False");
         return false;
      }
   };
   let mobilTest = function(mobil,mobilLabel){ 
      if(validator.isMobilePhone(mobil,'sv-SE')){
         mobilLabel.innerHTML = "Nr OK!";
         return true;
      }else{
         mobilLabel.innerHTML = "Fel nummer! Kan du inte ditt egen nr eller är du bara sopslut?";
         return false;
      }
   };
   let emailTest = function(email,emailLabel){
      if(validator.isEmail(email)){ 
         emailLabel.innerHTML="Mail OK!"; 
         return true;
      }else{
         emailLabel.innerHTML="Fel format, försök igen!"; 
         return false;
      }
   };
   hanteraOnline("window.onload");
   $("#skickaUpp").click(function () { // skapar ny användare
         let namn = document.getElementById('namn').value;
         let mobil = document.getElementById('mobil').value;
         let email = document.getElementById('email').value;
         let pass = document.getElementById('pass').value;

         let mobilLabel = document.getElementById('mobilLabel');
         let emailLabel = document.getElementById('emailLabel');
         let namnLabel = document.getElementById('namnLabel');
         let passLabel = document.getElementById('passLabel');
         
         if(namnTest(namn,namnLabel,regexName) == true &&
         mobilTest(mobil,mobilLabel) == true &&
         emailTest(email,emailLabel) == true &&
         passTest(pass,passLabel) == true
         )
         {
         $.post("/createUser", 
          {
             namn: namn,
             mobil: mobil,
             email: email,
             pass: pass
          },
          function (data, status) { 
             console.log(data); 
          });
          console.log(
          "\nNamnvariabel: " + namn +
          "\nMobilvariabel: "+ mobil + 
          "\nEmailvariabel: "+ email + 
          "\nPasswordvariabel: " +pass);
          alert("Success! användaren skapades!");
          onlineBool = true;
          //location.reload(); // laddar om hemsidan
      }else{
         onlineBool = false;
         console.log("Något stämmer inte. Har ej skickats.");
      }
      hanteraOnline("Registera ny användare");
      event.preventDefault();
});

$("#btnLogin").click(function () {
   let svarshantering = "";
   let namn = document.getElementById("loginUserName").value;
   let pass = document.getElementById("loginPass").value;
   let inlaggen = document.getElementById("Respons");
   let namnLabel = document.getElementById('anvLabel2');
   let passLabel = document.getElementById('passLabel2');
   
   if(namnTest(namn,namnLabel,regexName)==true &&
   passTest(pass,passLabel)== true){
      $.post("/loggaIn",{
         namn: namn,
         pass: pass
         },
         function (data, status) {
             if(data===("inloggad")){
               inlaggen.innerHTML = data;
               svarshantering = data;
               onlineBool=true;
               hanteraOnline("Inloggningen");
             }else if(data===("namnfel")){
                inlaggen.innerHTML= data;
                onlineBool=false;
                hanteraOnline("Inloggningen");
             }
         });
         console.log("\nNamnvariabel: " + namn +
         "\nPasswordvariabel: " +pass);
         
   }else if (svarshantering===("")){
      console.log("Ingen svarshantering ännu: "+ svarshantering);
      onlineBool = false;
      hanteraOnline("Logga in befintlig användare");
   }else{
      console.log("FEL PÅ ANNAT SÄTT");
      onlineBool = false;   
      hanteraOnline("Logga in befintlig användare");
   }
   //  event.preventDefault();
});
$("#inlaggSkickaKnapp").click(function () {
   // skicka inlägg här
   let datum;
   let inlagg = document.getElementById('inlaggSkicka').value;
   let datumGenerator = function () {
      dt = new Date().toISOString().split(".")[0].replace(/[^\d]/gi, ""); // skapar datum utan symboler, bara siffror.
      helDatum = dt.substring(0, 8); // endast ååååmmdd
      helTid = dt.substring(8, 12);
      dagensDatum = helDatum+"-"+helTid;
      
      console.log(helDatum);
      console.log(helTid);
      console.log(dagensDatum);
      datum = dagensDatum;
   }
   datumGenerator();
   let inlaggJustering = function(){ 
      inlagg=validator.escape(inlagg);
   }
   inlaggJustering(inlagg);
   $.post("/inlagg", 
   {
      datum: datum,
      namn: namn,
      inlagg: inlagg
   },
   function (data, status) { 
      console.log(data); 
   });
   console.log(
   "\nDatum: " + dagensDatum +
   "\nNamn: " + namn +
   "\nInlägg" + inlagg
   );
   alert("Success! inlägget skapades!");
   //location.reload(); // laddar om hemsidan
});
LOGGAUT = function(){
   onlineBool = false;
   hanteraOnline("Logga Ut Knappen");
   alert("du loggas nu ut.");
}
loggaKnapp = function () {

   var loggaAnvForm = document.getElementById("loggaAnvForm");
   var skapAnvForm = document.getElementById("skapAnvFormular");

   if (!loggaAnvForm.style.display || loggaAnvForm.style.display==="none"){
      loggaAnvForm.style.display ="block";
      skapAnvForm.style.display = "none"

   } else {
      loggaAnvForm.style.display = "none";
   }
};
skapaKnapp = function () {
   var skapAnvForm = document.getElementById("skapAnvFormular");
   var loggaAnvForm = document.getElementById("loggaAnvForm");
   if (!skapAnvForm.style.display || skapAnvForm.style.display==="none"){
      skapAnvForm.style.display ="block";
      loggaAnvForm.style.display = "none"
   } else {
      skapAnvForm.style.display = "none";
   }
};
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
});
// AJAX-RELATERAT HÄR OVANFÖR
