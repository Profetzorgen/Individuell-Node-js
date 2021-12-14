$(document).ready(function () { // samma som window.onload
   let currentDate = new Date(); // skapar och formaterar tid och datum till läsligt format.
   let time = currentDate.getHours() + ":" + currentDate.getMinutes();
   let cDay = currentDate.getDate();
   let cMonth = currentDate.getMonth() + 1; // för att inga nollor ska försvinna i den binära etern.
   let cYear = currentDate.getFullYear();
   let datum =  cYear + "/" + cMonth + "/" + cDay +" - "+ time; // tid,datum som sträng.
   var onlineBool = false;
   var nick=""; // nick är odefinierat tills input per kodstycke.
   let UppdateraRespons = function(){ // Denna ajaxar fram inläggen när det behövs uppdateras.
      let forfragan = new XMLHttpRequest(); // skapar nytt request.
      forfragan.open("GET", "/andratextmedajax2"); // be servern om innehållet 
      forfragan.onload = function(){ // det här startar när vi fått innehållet 
      console.log("Ajax2:");
      console.log(this.response); // all radda med text i console beror på den här.
      $('#Respons').html(this.response); // och blir såhär när det skrivs ut.
      } // det skrivs på en Label, finns garanterat smidigare sätt att göra men nu vill jag ha in uppgiften.
      forfragan.send();// ovanstående förberedelser klara, skicka förfrågan om innehållet.
   }
   let hanteraOnline = function(vem){ // Inloggad eller inte? "vem" är för att se i konsollen VAR bool blev False;
      if(onlineBool === false){ //denna hanterar vad som visas av:
         $('#users').show(); // "logga in"/"skapa användare"/"gör ett inlägg"
         $('#inlaggSkickaRuta').hide();
         $('#Respons').html("Du måste vara online för att se eller göra inlägg");
         console.log("onlinebool: "+onlineBool + "\n  FRÅN:"+vem);
      }
      else if (onlineBool===true){
         $('#users').hide(); // om man är inloggad behöver man inte logga in etc.
         $('#inlaggSkickaRuta').show();
         console.log("onlinebool: "+onlineBool +"\n  FRÅN: "+vem);
         UppdateraRespons(); // hämta mer inlägg om det finns.
      }
   };
   hanteraOnline("Window.onload"); // inloggad=False, syns i konsollen
   let namnTest = function(namn) { // namntest, som det låter.
      let regexName = /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i;
      if (regexName.test(namn)) {          
         $('#namnLabel').html("Namnet OK!"); // "skapa ny användare" har tester, logga in har det inte!
         console.log("Namnet OK!");
         return true; 
      }else{
         $('#namnLabel').html("Fel på namnet! För och Efternamn!");
         console.log("Fel på namnet!");
         return false; 
      }
   };
   let passTest = function(pass){ // testar om det är ett starkt lösen, behövs inte för de som redan har inloggningar.
      if(validator.isStrongPassword(pass)){ 
         $('#passLabel').html("Lösenord är OK!");
         console.log("Lösenord är OK!");
         return true; 
      }else{
         $('#passLabel').html("Fel format på lösenord!");
         console.log("Fel format på lösenord!");
         return false;
      }
   };
   let mobilTest = function(mobil){ // alla tester både här och på gemensamma i klientskript är jag skyldig till..
      if(validator.isMobilePhone(mobil,'sv-SE')){ // därav den något krassliga designen.
         $('#mobilLabel').html("Mobilnr ok!");
         console.log("Mobilnr ok!");
         return true;
      }else{
         $('#mobilLabel').html("Mobilnr är fel");
         console.log("Mobilnr är fel");
         return false;
      }
   };
   let emailTest = function(email){
      if(validator.isEmail(email)){ 
         $('#emailLabel').html("Mail OK!") // som sagt, inga tester på logga in befintlig.
         console.log("Email är OK!");
         return true;
      }else{
         $('#emailLabel').html("Fel! har du @?");
         console.log("Fel på email!");
         return false;
      }
   };
   $("#skickaUpp").click(function () { // skapar ny användare
      nick=$('#nick').val(); // sätter den inloggades nick till detta
      if(namnTest($('#namn').val()) == true && // valideringar
         mobilTest($('#mobil').val()) == true &&
         emailTest($('#email').val()) == true &&
         passTest($('#pass').val()) == true){
         $.post("/createUser", // anropa routen på indexmh.js
          {
             nick: $('#nick').val(),
             namn: $('#namn').val(), 
             mobil: $('#mobil').val(), // skicka värdena ur formuläret, jQuery style.
             email: $('#email').val(), // slapp xAntal meter kod med detta ist för document.GetElementByID.......
             pass: $('#pass').val()
          },
          function (data, status) { 
            if(data==="1"){ // Här bekräftas att användaren är online, === jämförelse, sträng och etta.
               onlineBool = true;
               hanteraOnline("Från user create");
               // ? UppdateraRespons(); överflödig här
            } else if (data==="2"){ // servern säger = fel användarnamn/lösen via sträng-siffror.
               onlineBool=false;
               hanteraOnline("Från user create");
            }
          });
      }else{
         console.log("Något stämmer inte. Har ej skickats."); // när man rotar i koden är extra livrem bra att ha.
      }
      event.preventDefault();
});

$("#btnLogin").click(function () {
   kontroll="";
   nick = $('#loginNick').val(); // inloggningsrutan för nick
   if($('#loginPass').val()!=""){
      $.post("/loggaIn",{
         nick: $('#loginNick').val(), // från logga in befintlig
         pass: $("#loginPass").val()
         },
         function (data, status) {
            console.log(data);
            if(data==="1"){
               onlineBool = true;
               hanteraOnline("Från inloggningenn");
               UppdateraRespons();
            } else if (data==="2"){
               onlineBool=false;
               hanteraOnline("Från inloggningenn");
            }
         });
         console.log(kontroll);
         
   }else{
      alert("något valideringsfel!");
   }
  
   event.preventDefault();
});
$("#inlaggSkickaKnapp").click(function () { // id. för skicka inlägget knappen.
   
   $('#h3text').html("inlägg skickat!"); // visar tydligt.
   if($('#inlaggSkicka')){
      $.post("/inlagg",{
         datum: datum,
         nick: nick,
         inlagg: $('#inlaggSkicka').val() // jquery kortade ner koden en aning! ändå alldeles för lång men får duga.
         },
         function (data, status) {
            console.log(data);
            UppdateraRespons(); // att inlägget är skicka,
         });
         
   }else{
      $("#h3text").html("Skriv något");
   }
   event.preventDefault();

});
LOGGAUT = function(){ // anropas av själva knappen, i html.
   if(onlineBool!==false){
      onlineBool = false;
      hanteraOnline("Logga Ut Knappen"); // sätter onlineBool som false och berättar varifrån
      alert("du loggas nu ut."); // lite mysig pop-up.
      location.reload(); // ladda om sidan, det närmaste jag associerar med console.Clear() i c#
      
   }else{
      alert("du är redan utloggad!");
   }
}
loggaKnapp = function () { // gömmer/visar knappar så inte alla visas samtidigt etc. ej perfekt kod!
   $('#loggaAnvForm').show();
   $('#skapaAnvForm').hide();
};
skapaKnapp = function () {
   $('#skapaAnvForm').show();
   $('#loggaAnvForm').hide();
};
// AJAX-RELATERAT HÄR UNDER, den Holger visade.
let hamtaData = function(){
   let forfragan = new XMLHttpRequest(); // skapar nytt request.
   forfragan.open("GET", "/andratextmedajax"); // be servern om innehållet 
   forfragan.onload = function(){ // det här startar när vi fått innehållet 
      console.log("Ajax1:");
      console.log(this.response); // servern svarade med det här.
      $("#ajaxText").html(this.response);
   } // OVANFÖR: Ändrar texten under rubriken
   forfragan.send();
}
$("#h2refresh").click(function () { // Testknappen för ajax.
   hamtaData();
   hanteraOnline("Uppdateraknappen");

});
});
// AJAX-RELATERAT HÄR OVANFÖR
