// SÅHÄR BLEV DET FÄRDIGA RESULTATET:
$(document).ready(function () { // samma som window.onload = function
    $("#submit").click(function () { // vid klick på knappen, skicka.
        $.post("/request", // post-request, obs här i klientskript.
           {// Användaren fyller i på sidan,trycker submit lr vad det står.
            // Det här skriptet gör om innehållet i formulär-rutorna till textsträng i json-format även fast det inte ser så ut..
            //..men document.getElementById('namn').value är samma sak som "Svalbard Målvaktsson" i vårt exempel...
              namn: document.getElementById('namn').value, //..istället för exempel-strängen name: "viSion",
              mobil: document.getElementById('mobil').value,// obs alla inputs i html är av type="text" än så länge, ska ändras.
              email: document.getElementById('email').value,// denna ska va type="email"
              inlagg: document.getElementById('inlagg').value,// denna är textarea men de andra är type= text
              pass: document.getElementById('pass').value// denna är pass, // kom ihåg "pass.on(blur)"" vid behov vid validering.
           },
           function (data, status) { // Här sker någon form av level 8 svartkonst. Ska be Macke ringa och fråga åklagarn.
              console.log(data); // men den skriver iaf ut data i das consöl.
           });
           
           // Här är en fiffig grej som underlättar förståelsen hoppas jag, skriver ut i konsol vad det är för typ av...
           // ...input man orsakat, notera tex Inläggvariabeln="textarea" i konsölla.
           console.log("Namnvariabel: " + namn +
           "\nMobilvariabel: "+ mobil + 
           "\nEmailvariabel: "+ email + 
           "\nInläggvariabel: " + inlagg +
           "\nPasswordvariabel: " +pass);
           // Detta console.log skrev även ut exakt inmatning när man hade document.getElementByID('namn tex')...
           //...men för att koden ska bli så kort som möjligt så är rubbet gröntext.
     });
});// Älskar alla alzheimers-krumelurer som dyker upp överallt...

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