


$(function () {
    $.get("https://webtechlecture.appspot.com/cloudstore/listkeys?owner=s192293_products", function(response) {
        console.log(response);
    });
})


var mitarbeiterDropdown;
var shirtDropdown;
var hoseDropdown;
var schuheDropdown;

//var mitarbeiterListe = [];

function mitarbeiterLoad () {
  var mitarbeiterListe = [];
$.get("https://webtechlecture.appspot.com/cloudstore/listkeys?owner=s192293_products", function(response){
console.log(response);
$.each(response, function(i, mitarbeiter) {
  mitarbeiterListe.push(mitarbeiter.key);
});
mitarbeiterDropdown.fill(mitarbeiterListe);
shirtDropdown.fill(mitarbeiterListe);
hoseDropdown.fill(mitarbeiterListe);
schuheDropdown.fill(mitarbeiterListe);
})
};


$( function(){
mitarbeiterLoad();

     var settingsLookupDropdown={};
  settingsLookupDropdown.inputtext=$("#mitarbeiter-input");
  settingsLookupDropdown.dropdownlist=$("#mitarbeiter-dropdown");
  settingsLookupDropdown.dropdownbutton=$("#mitarbeiter-button");
  settingsLookupDropdown.placeholder="Name";
  settingsLookupDropdown.ondropdownclick=onDropdownClick;
  settingsLookupDropdown.help=$("#mitarbeiter-help");		  
  mitarbeiterDropdown=createLookupDropdown(settingsLookupDropdown);

  var settingsLookupDropdown2={};
  settingsLookupDropdown2.inputtext=$("#shirt-input");
  settingsLookupDropdown2.dropdownlist=$("#shirt-dropdown");
  settingsLookupDropdown2.dropdownbutton=$("#shirt-button");
  settingsLookupDropdown2.placeholder="Name";
  settingsLookupDropdown2.ondropdownclick=onDropdownClick2;
  settingsLookupDropdown2.help=$("#shirt-help");		  
  shirtDropdown=createLookupDropdown(settingsLookupDropdown2);

  var settingsLookupDropdown3={};
  settingsLookupDropdown3.inputtext=$("#hose-input");
  settingsLookupDropdown3.dropdownlist=$("#hose-dropdown");
  settingsLookupDropdown3.dropdownbutton=$("#hose-button");
  settingsLookupDropdown3.placeholder="Name";
  settingsLookupDropdown3.ondropdownclick=onDropdownClick3;
  settingsLookupDropdown3.help=$("#hose-help");		  
  hoseDropdown=createLookupDropdown(settingsLookupDropdown3);

  var settingsLookupDropdown4={};
  settingsLookupDropdown4.inputtext=$("#schuhe-input");
  settingsLookupDropdown4.dropdownlist=$("#schuhe-dropdown");
  settingsLookupDropdown4.dropdownbutton=$("#schuhe-button");
  settingsLookupDropdown4.placeholder="Name";
  settingsLookupDropdown4.ondropdownclick=onDropdownClick4;
  settingsLookupDropdown4.help=$("#schuhe-help");		  
  schuheDropdown=createLookupDropdown(settingsLookupDropdown4);


//hier die Dropdownliste befüllen	
  //mitarbeiterDropdown.fill(mitarbeiterListe);

});




var kopfbedeckung;
var nameKopfbedeckung;




function onDropdownClick(aName)
{
    //hier die Analyse für den gewählten Mitarbeiter ausführen
    console.log("click "+aName);
$.get("https://webtechlecture.appspot.com/cloudstore/get?owner=s192293_products&key="+aName, function(data){
console.log(data.bildURL);
kopfbedeckung = data.bildURL;
nameKopfbedeckung = aName;


document.getElementById("bild-kopfbedeckung").src= kopfbedeckung;

})
};


var shirt;
var nameShirt;

function onDropdownClick2(aName)
{
    //hier die Analyse für den gewählten Mitarbeiter ausführen
    console.log("click "+aName);
$.get("https://webtechlecture.appspot.com/cloudstore/get?owner=s192293_products&key="+aName, function(data){
console.log(data.bildURL);
shirt = data.bildURL;
nameShirt = aName;


document.getElementById("bild-shirt").src= shirt;

})
};

var hose;
var nameHose;

function onDropdownClick3(aName)
{
    //hier die Analyse für den gewählten Mitarbeiter ausführen
    console.log("click "+aName);
$.get("https://webtechlecture.appspot.com/cloudstore/get?owner=s192293_products&key="+aName, function(data){
console.log(data.bildURL);
hose = data.bildURL;
nameHose = aName;


document.getElementById("bild-hose").src= hose;

})
};

var schuhe;
var nameSchuhe;

function onDropdownClick4(aName)
{
    //hier die Analyse für den gewählten Mitarbeiter ausführen
    console.log("click "+aName);
$.get("https://webtechlecture.appspot.com/cloudstore/get?owner=s192293_products&key="+aName, function(data){
console.log(data.bildURL);
schuhe = data.bildURL;
nameSchuhe= aName;

document.getElementById("bild-schuh").src= schuhe;

})
};


function saveStyle () {
  
  var likes =0;

  var owner = "s192293_styles";
  var token = "RsjW57_AbZiCN_AOZBz_TJVh1pg_";

  var max = 100000000000000;
  var min = 10;
  var x = Math.round(Math.random() * (max - min)) + min;

 if (localStorage.getItem(validate)) {

   $.get("https://webtechlecture.appspot.com/cloudstore/add?owner="+owner+"&token="+token+"&jsonstring="+ encodeURIComponent(JSON.stringify({"email": localStorage.getItem(angemeldeteMail), "gespeicherteProdukte": { "Kopfbedeckung" : nameKopfbedeckung, "Shirt" : nameShirt, "Hose": nameHose, "Schuhe" : nameSchuhe}, "Likes" : likes }))+"&key="+x,function (gespeichert){
       console.log(gespeichert);
       if (gespeichert) {

         var ownerCode = "s192293_codes";
         var tokenCode = "w7Yi4XWG7arNipcmH4XOpUaWgbU_";

         $.get("https://webtechlecture.appspot.com/cloudstore/get?owner="+ownerCode+"&token="+tokenCode+"&key="+localStorage.getItem(angemeldeteMail), function (response) {
           if (response.hasOwnProperty("email")) {
             var codes = [response.Identifizierungscodes];
             codes.push(x)
             $.get("https://webtechlecture.appspot.com/cloudstore/add?owner="+ownerCode+"&token="+tokenCode+"&jsonstring="+encodeURIComponent(JSON.stringify({"email": localStorage.getItem(angemeldeteMail), "Identifizierungscodes": codes}))+"&key="+localStorage.getItem(angemeldeteMail), function(hinzugefügt) {
               console.log(hinzugefügt);
               window.alert("Ihr Style wurde erfolgreich unter dem Code "+x+" gespeichert!");
             });
             
           }
           else {
             $.get("https://webtechlecture.appspot.com/cloudstore/add?owner="+ownerCode+"&token="+tokenCode+"&jsonstring="+encodeURIComponent(JSON.stringify({"email": localStorage.getItem(angemeldeteMail), "Identifizierungscodes": x}))+"&key="+localStorage.getItem(angemeldeteMail), function(verknüpft) {
               console.log(verknüpft);
               window.alert("Ihr Style wurde erfolgreich unter dem Code "+x+" gespeichert!");
             
             });
           }
         })
       };
   })
   
   


 }

 else {
     console.log("Sie sind nicht eingeloggt!");
     window.alert("Sie sind nicht eingeloggt!");
             
 }
 
 
 

 console.log(localStorage.getItem(validate), localStorage.getItem(angemeldeteMail));

   
}



function searchStyle () {

  code = $("#input-code").val();
  
  var styleowner = "s192293_styles";
  var styletoken = "RsjW57_AbZiCN_AOZBz_TJVh1pg_";
  var productowner = "s192293_products";
  var producttoken = "dSX6uJHoF9eliRe6xvEyxWgBSbw_";

  $.get("https://webtechlecture.appspot.com/cloudstore/get?owner="+styleowner+"&token="+styletoken+"&key="+code, function(style) {
      console.log(style);
      var kopf = style.gespeicherteProdukte.Kopfbedeckung;
      var shirt = style.gespeicherteProdukte.Shirt;
      var hose = style.gespeicherteProdukte.Hose;
      var schuhe = style.gespeicherteProdukte.Schuhe;
      console.log(kopf);
      console.log(shirt);
      console.log(hose);
      console.log(schuhe);
      $.get("https://webtechlecture.appspot.com/cloudstore/get?owner="+productowner+"&token="+producttoken+"&key="+kopf, function(response) {
          console.log(response.bildURL);
          var kopfLink = response.bildURL;
          document.getElementById("bild-kopfbedeckung").src= kopfLink;
      })
      $.get("https://webtechlecture.appspot.com/cloudstore/get?owner="+productowner+"&token="+producttoken+"&key="+shirt, function(response) {
          console.log(response.bildURL);
          var shirtLink = response.bildURL;
          document.getElementById("bild-shirt").src= shirtLink;
      })
      $.get("https://webtechlecture.appspot.com/cloudstore/get?owner="+productowner+"&token="+producttoken+"&key="+hose, function(response) {
          console.log(response.bildURL);
          var hoseLink = response.bildURL;
          document.getElementById("bild-hose").src= hoseLink;
      })
      $.get("https://webtechlecture.appspot.com/cloudstore/get?owner="+productowner+"&token="+producttoken+"&key="+schuhe, function(response) {
          console.log(response.bildURL);
          var schuheLink = response.bildURL;
          document.getElementById("bild-schuh").src= schuheLink;
      })

  });






}


function neuesBild () {
 
  artikelBezeichnung = $("#artikelName").val();
  artikelURL = $("#artikelURL").val();

  if (artikelBezeichnung&&artikelURL) {
    console.log(artikelURL,artikelBezeichnung)
      var owner = "s192293_products";
      var token = "dSX6uJHoF9eliRe6xvEyxWgBSbw_";

      produktName = artikelBezeichnung;
      bildURL = artikelURL;

      $.get("https://webtechlecture.appspot.com/cloudstore/add?owner="+owner+"&token="+token+"&jsonstring="+encodeURIComponent(JSON.stringify({"ProduktName": produktName, "bildURL": bildURL}))+"&key="+encodeURI(produktName), function(response){
          console.log(response);
          if (response) {
            aktualisieren();
          }
      });
  }
}

function aktualisieren (){
  produkteLoad();

     var settingsLookupDropdown={};
  settingsLookupDropdown.inputtext=$("#mitarbeiter-input");
  settingsLookupDropdown.dropdownlist=$("#mitarbeiter-dropdown");
  settingsLookupDropdown.dropdownbutton=$("#mitarbeiter-button");
  settingsLookupDropdown.placeholder="Name";
  settingsLookupDropdown.ondropdownclick=onDropdownClick;
  settingsLookupDropdown.help=$("#mitarbeiter-help");		  
  mitarbeiterDropdown=createLookupDropdown(settingsLookupDropdown);

  var settingsLookupDropdown2={};
  settingsLookupDropdown2.inputtext=$("#shirt-input");
  settingsLookupDropdown2.dropdownlist=$("#shirt-dropdown");
  settingsLookupDropdown2.dropdownbutton=$("#shirt-button");
  settingsLookupDropdown2.placeholder="Name";
  settingsLookupDropdown2.ondropdownclick=onDropdownClick2;
  settingsLookupDropdown2.help=$("#shirt-help");		  
  shirtDropdown=createLookupDropdown(settingsLookupDropdown2);

  var settingsLookupDropdown3={};
  settingsLookupDropdown3.inputtext=$("#hose-input");
  settingsLookupDropdown3.dropdownlist=$("#hose-dropdown");
  settingsLookupDropdown3.dropdownbutton=$("#hose-button");
  settingsLookupDropdown3.placeholder="Name";
  settingsLookupDropdown3.ondropdownclick=onDropdownClick3;
  settingsLookupDropdown3.help=$("#hose-help");		  
  hoseDropdown=createLookupDropdown(settingsLookupDropdown3);

  var settingsLookupDropdown4={};
  settingsLookupDropdown4.inputtext=$("#schuhe-input");
  settingsLookupDropdown4.dropdownlist=$("#schuhe-dropdown");
  settingsLookupDropdown4.dropdownbutton=$("#schuhe-button");
  settingsLookupDropdown4.placeholder="Name";
  settingsLookupDropdown4.ondropdownclick=onDropdownClick4;
  settingsLookupDropdown4.help=$("#schuhe-help");		  
  schuheDropdown=createLookupDropdown(settingsLookupDropdown4);

  function produkteLoad () {
    var mitarbeiterListe = [];
  $.get("https://webtechlecture.appspot.com/cloudstore/listkeys?owner=s192293_products", function(response){
  console.log(response);
  $.each(response, function(i, mitarbeiter) {
    mitarbeiterListe.push(mitarbeiter.key);
  });
  mitarbeiterDropdown.fill(mitarbeiterListe);
  shirtDropdown.fill(mitarbeiterListe);
  hoseDropdown.fill(mitarbeiterListe);
  schuheDropdown.fill(mitarbeiterListe);
  })
  };
}







