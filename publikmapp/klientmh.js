// SÅHÄR BLEV DET FÄRDIGA RESULTATET:

$(document).ready(function () { // samma som window.onload
   let onlineBool = false;
   var inlaggSkickaRuta = document.getElementById("inlaggSkicka");
   if(onlineBool === false){
      inlaggSkickaRuta.style.display = "none";
   }
   $("#skickaUpp").click(function () { //obs! knappen i html har id="submit"
      let datumGenerator = function () {
         dt = new Date().toISOString().split(".")[0].replace(/[^\d]/gi, ""); // skapar datum utan symboler, bara siffror.
         dagensdatum = dt.substring(0, 12); // endast ååååmmddhhmm
         console.log(dagensdatum);
   };
         let namn = document.getElementById('namn').value;
         let mobil = document.getElementById('mobil').value;
         let email = document.getElementById('email').value;
         let pass = document.getElementById('pass').value;

         var namnLabel = document.getElementById('namnLabel');
         var mobilLabel = document.getElementById('mobilLabel');
         var emailLabel = document.getElementById('emailLabel');
         var passLabel = document.getElementById('passLabel');

         var regexName = /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i; // namn
         
         let namnTest = function(reg,str) {
            if (reg.test(str)) {          
               namnLabel.innerHTML="Namn OK!"; 
               return true; 
            }else{
               namnLabel.innerHTML="Fel namninput! Försök igen"; 
               return false; // obvious shit.
            }
         }
         let mobilTest = function(){ 
            if(validator.isMobilePhone(mobil,'sv-SE')){
               mobilLabel.innerHTML = "Nr OK!";
               return true;
            }else{
               mobilLabel.innerHTML = "Fel nummer! Kan du inte ditt egen nr eller är du bara sopslut?";
               return false;
            }
         }
         let emailTest = function(){
            if(validator.isEmail(email)){ 
               emailLabel.innerHTML="Mail OK!"; 
               return true;
            }else{
               emailLabel.innerHTML="Fel format, försök igen!"; 
               return false;
            }
         }
         let passTest = function(){
            if(validator.isStrongPassword(pass)){ 
               passLabel.innerHTML="Lösenord OK!"; 
               return true; 
            }else{
               passLabel.innerHTML="Fel format på lösenord!";
               return false;
            }
         }
         if(
         namnTest(regexName,namn) == true && 
         mobilTest(mobil) == true &&
         emailTest() == true &&
         passTest() == true
         )
         {
         //inlaggJustering();
         datumGenerator(); 
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
          //location.reload(); // laddar om hemsidan
      }else{
         // event.preventDefault();
         console.log("Något stämmer inte. Har ej skickats.");
      }
});
$("#inlaggPost").click(function () {
   // skicka inlägg här
   let dagensDatum = "";
   let inlagg = document.getElementById('inlagg').value; 
   let datumGenerator = function () {
      dt = new Date().toISOString().split(".")[0].replace(/[^\d]/gi, ""); // skapar datum utan symboler, bara siffror.
      dagensDatum = dt.substring(0, 12); // endast ååååmmddhhmm
      console.log(dagensDatum);
   };
   let inlaggJustering = function(){ 
      inlagg=validator.escape(inlagg);
   }
   inlaggJustering();
   $.post("/inlagg", 
   {
      datum: dagensDatum,
      inlagg: inlagg
   },
   function (data, status) { 
      console.log(data); 
   });

   console.log(
   "\nNamn: " + namn +
   "\nInlägg" + inlagg
   );
   alert("Success! inlägget skapades!");
   //location.reload(); // laddar om hemsidan
});

loggaKnapp = function () {
   var loggaAnvKnapp = document.getElementById("anvLogKnapp");
   var loggaAnvForm = document.getElementById("loggaAnvForm");
   var eller = document.getElementById("eller");
   var skapAnvKnapp = document.getElementById("anvSkapKnapp");
   var skapAnvForm = document.getElementById("skapAnvFormular");


   if (!loggaAnvForm.style.display || loggaAnvForm.style.display==="none"){
      loggaAnvForm.style.display ="block";
      skapAnvForm.style.display = "none"

   } else {
      loggaAnvForm.style.display = "none";
   }
}
skapaKnapp = function () {

   var skapAnvKnapp = document.getElementById("anvSkapKnapp");
   var skapAnvForm = document.getElementById("skapAnvFormular");
   var loggaAnvKnapp = document.getElementById("anvLogKnapp");
   var loggaAnvForm = document.getElementById("loggaAnvForm");
   var eller = document.getElementById("eller");
   if (!skapAnvForm.style.display || skapAnvForm.style.display==="none"){
      skapAnvForm.style.display ="block";
      loggaAnvForm.style.display = "none"
   } else {
      skapAnvForm.style.display = "none";
   }
}

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
