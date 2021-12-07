// SÅHÄR BLEV DET FÄRDIGA RESULTATET:
//var validator = require('validator');



$(document).ready(function () { 
   
    $("#submit").click(function () { 

         // det går att ha let namn = doc.getbyID här sen namn i input i post.
         let namn = document.getElementById('namn').value;
         // let efternamn = document.getElementById('efternamn').value;
         let mobil = document.getElementById('mobil').value;
         let email = document.getElementById('email').value;
         let inlagg = document.getElementById('inlagg').value;
         let pass = document.getElementById('pass').value;
         var namnLabel = document.getElementById('namnLabel');
         let klartecken = false;

         
         var regexName = /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i; // Christers specialbrunto!
         
         let namnTest = function(reg,str) {
            if (reg.test(str)) {
               namnLabel.innerHTML="Namn OK!";
               klartecken = true;
            }else{
               namnLabel.innerHTML="Fel namninput! Försök igen";
               
               klartecken = false;
            }
         }
      
         // ovan hämtar alla inputs korrekt, nu ska validering göras på nåt vis under
         // console.log(validator.isAlpha(namn,'sv-SE')); funkar bara utan mellanslag, tillägget options har jag inte koll på ännu..
         namnTest(regexName,namn);
         if(klartecken == true){
         $.post("/request", 
          {
             namn: namn,
            //  efternamn: efternamn,
             mobil: mobil,
             email: email,
             inlagg: inlagg,
             pass: pass
          },
          function (data, status) {
             console.log(data); 
          });

          console.log("Namnvariabel: " + namn +
          "\nMobilvariabel: "+ mobil + 
          "\nEmailvariabel: "+ email + 
          "\nInläggvariabel: " + inlagg +
          "\nPasswordvariabel: " +pass);
      }    
});

// $(document).ready(function(){


// })
// $(document).ready(function () { 
   // namn: document.getElementById('namn').value,
   // mobil: document.getElementById('mobil').value,
   // email: document.getElementById('email').value,
   // inlagg: document.getElementById('inlagg').value,
   // pass: document.getElementById('pass').value,
//    $("#submit").click(function () { 



//        $.post("/request", 
//           {
//              namn: namn,
//              mobil: mobil,
//              email: email,
//              inlagg: inlagg,
//           },
//           function (data, status) {
//              console.log(data); 
//           });

//           console.log("Namnvariabel: " + namn +
//           "\nMobilvariabel: "+ mobil + 
//           "\nEmailvariabel: "+ email + 
//           "\nInläggvariabel: " + inlagg +
//           "\nPasswordvariabel: " +pass);
//     });
// });
// DET HÄR KOPIERADE JAG FRÅN NÄTET:
//  $(document).ready(function () {
//     $("#submit").click(function () {
//        $.post("/request",
//           {
//              name: "viSion",
//              designation: "Professional gamer"
//           },
//           function (data, status) {
//              console.log(data);
//           });
//     });
//  });name: 
// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
})