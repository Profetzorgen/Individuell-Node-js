
// SÅHÄR BLEV DET FÄRDIGA RESULTATET:
// fixa datumgeneratorn fast bättre
// spara inloggade användarens uppgifter tills loggar ut

$(document).ready(function () { // samma som window.onload
   let currentDate = new Date();
   let time = currentDate.getHours() + ":" + currentDate.getMinutes();
   let cDay = currentDate.getDate();
   let cMonth = currentDate.getMonth() + 1;
   let cYear = currentDate.getFullYear();
   let datum =  cYear + "/" + cMonth + "/" + cDay +" - "+ time;
   
   
   let inlaggSkickaRuta = document.getElementById("inlaggSkickaRuta");
   let usersPanelen = document.getElementById("users");
   var onlineBool = false;
   
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
   onlineBool = false;
   hanteraOnline("Window.onload")
   $("#skickaUpp").click(function () { // skapar ny användare
         
         let namn = document.getElementById('namn').value;
         let mobil = document.getElementById('mobil').value;
         let email = document.getElementById('email').value;
         let pass = document.getElementById('pass').value;

         let mobilLabel = document.getElementById('mobilLabel');
         let emailLabel = document.getElementById('emailLabel');
         let namnLabel = document.getElementById('namnLabel');
         let passLabel = document.getElementById('passLabel');
         let regexName = /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i;
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
          
          alert("Grattis! kontot skapades! och du är online.");
          onlineBool = true;
          hanteraOnline("Registera ny användare");
          
      }else{
         
         console.log("Något stämmer inte. Har ej skickats.");
      }
      
      preventDefault();
      
});

$("#btnLogin").click(function () {
   let namn = document.getElementById("loginUserName").value;
   let pass = document.getElementById("loginPass").value;
   
   let namnLabel = document.getElementById('anvLabel2');
   let passLabel = document.getElementById('passLabel2');
   let regexName = /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i;
   let kontroll = "";
   
   if(namnTest(namn,namnLabel,regexName)==true &&
   passTest(pass,passLabel)== true){
      let respons = document.getElementById("Respons");
      $.post("/loggaIn",{
         namn: namn,
         pass: pass
         },
         function (data, status) {
            respons.innerHTML = data,
            console.log(data);
            if(data==("OK")){
               onlineBool=true;
               hanteraOnline("Logga in befintlig användare");
            }else{
               onlineBool=false;
               hanteraOnline("Logga in befintlig användare");
            }
         });
   }else{
      alert("något valideringsfel!");
   }
   event.preventDefault();
});
$("#inlaggSkickaKnapp").click(function () {
   let namn = document.getElementById("loginUserName").value;
   let inlaggSkicka = document.getElementById("inlaggSkicka").value;
   if(inlaggSkicka.value!==null){
      $.post("/inlagg",{
         datum: datum,
         namn: namn,
         inlagg: inlaggSkicka
         },
         function (data, status) {
            console.log(data);
         });
   }else{
      alert("Något gick snett");
   }
   event.preventDefault();
});
LOGGAUT = function(){
   if(onlineBool!==false){
      onlineBool = false;
      hanteraOnline("Logga Ut Knappen");
      alert("du loggas nu ut.");
   }else{
      alert("du är redan utloggad!");
   }
}
loggaKnapp = function () {

   var loggaAnvForm = document.getElementById("loggaAnvForm");
   var skapAnvForm = document.getElementById("skapAnvForm");
   if (!loggaAnvForm.style.display || loggaAnvForm.style.display==="none"){
      loggaAnvForm.style.display ="block";
      skapAnvForm.style.display = "none"
   } else {
      loggaAnvForm.style.display = "none";
   }
};
skapaKnapp = function () {
   var skapAnvForm = document.getElementById("skapAnvForm");
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
let hamtaInlagg = function() {
   if(onlineBool===true){
      let forfragan = new XMLHttpRequest();
      forfragan.open("GET","/hämtainläggen");
      forfragan.onload = function () {
         document.getElementById("Respons").innerHTML = this.response;
      }
   }forfragan.send();
}
$("#h2refresh").click(function () { // knapp anropar
   hamtaData();
   hanteraOnline("Uppdateraknappen");
   hamtaInlagg();
});
});
// AJAX-RELATERAT HÄR OVANFÖR
