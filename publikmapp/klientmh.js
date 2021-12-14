
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
   var onlineBool = false;
   var nick=""; //nick är odefinierat tills input per kodstycke.
    let UppdateraRespons = function(){
       let forfragan = new XMLHttpRequest(); // skapar nytt request.
       forfragan.open("GET", "/andratextmedajax2"); // be servern om innehållet 
       forfragan.onload = function(){ // det här startar när vi fått innehållet 
       console.log("Ajax2:");
       console.log(this.response); // servern svarade med det här.
      $('#Respons').html(this.response);
         
       } 
      forfragan.send();
    }
   let hanteraOnline = function(vem){
      if(onlineBool === false){
         $('#users').show();
         $('#inlaggSkickaRuta').hide();
         $('#h3text').html("Du måste vara online för att se eller göra inlägg");
         $('#Respons').html("Du måste vara online för att se eller göra inlägg");
         console.log("onlinebool: "+onlineBool + "\n  FRÅN:"+vem);
      
      }
      else if (onlineBool===true){
         $('#users').hide();
         $('#inlaggSkickaRuta').show();
         console.log("onlinebool: "+onlineBool +"\n  FRÅN: "+vem);
         UppdateraRespons();
         
      }
   };
   hanteraOnline("Window.onload");
   let namnTest = function(namn) {
      let regexName = /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i;
      if (regexName.test(namn)) {          
         $('#namnLabel').html("Namnet OK!");
         console.log("Namnet OK!");
         return true; 
      }else{
         $('#namnLabel').html("Fel på namnet! För och Efternamn!");
         console.log("Fel på namnet!");
         return false; 
      }
   };
   let passTest = function(pass){
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
   let mobilTest = function(mobil){ 
      if(validator.isMobilePhone(mobil,'sv-SE')){
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
         $('#emailLabel').html("Mail OK!")
         console.log("Email är OK!");
         return true;
      }else{
         $('#emailLabel').html("Fel! har du @?");
         console.log("Fel på email!");
         return false;
      }
   };
   $("#skickaUpp").click(function () { // skapar ny användare
      nick=$('#nick').val(); // sätter den inloggade nick till den man skapade med
      if(namnTest($('#namn').val()) == true &&
         mobilTest($('#mobil').val()) == true &&
         emailTest($('#email').val()) == true &&
         passTest($('#pass').val()) == true){
         $.post("/createUser", 
          {
             nick: $('#nick').val(),
             namn: $('#namn').val(), 
             mobil: $('#mobil').val(),
             email: $('#email').val(),
             pass: $('#pass').val()
          },
          function (data, status) { 
             $('#Respons').html(data); 
          });
      }else{
         console.log("Något stämmer inte. Har ej skickats.");
      }
      event.preventDefault();
});

$("#btnLogin").click(function () {
   kontroll="";
   nick = $('#loginNick').val(); // inloggningsrutan för nick
   if(passTest($("#loginPass").val())== true){
      $.post("/loggaIn",{
         nick: $('#loginNick').val(), // från logga in befintlig
         pass: $("#loginPass").val()
         },
         function (data, status) {
            console.log(data),
            kontroll += data;
            if(kontroll==="1"){
               onlineBool = true;
               hanteraOnline("Från inloggningenn");
            } else if (kontroll==="2"){
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
$("#inlaggSkickaKnapp").click(function () {
   
   $('#h3text').html("inlägg skickat!");
   if($('#inlaggSkicka').val("")){
      $.post("/inlagg",{
         datum: datum,
         nick: nick, // var-variabeln valdes vid inloggningsmetoden.
         inlagg: $('#inlaggSkicka').val()
         },
         function (data, status) {
            console.log(data);
         });
   }else{
      $("#h3text").html("Skriv något");
   }
   event.preventDefault();

});
LOGGAUT = function(){
   if(onlineBool!==false){
      onlineBool = false;
      hanteraOnline("Logga Ut Knappen");
      alert("du loggas nu ut.");
      location.reload();
      
   }else{
      alert("du är redan utloggad!");
   }
}
loggaKnapp = function () {
   $('#loggaAnvForm').show();
   $('#skapaAnvForm').hide();
};
skapaKnapp = function () {
   $('#skapaAnvForm').show();
   $('#loggaAnvForm').hide();
};
// AJAX-RELATERAT HÄR UNDER
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
$("#h2refresh").click(function () { // knapp anropar
   hamtaData();
   hanteraOnline("Uppdateraknappen");

});
});
// AJAX-RELATERAT HÄR OVANFÖR
