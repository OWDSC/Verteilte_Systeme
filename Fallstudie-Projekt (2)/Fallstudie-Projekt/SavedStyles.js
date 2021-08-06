
var mitarbeiterDropdown;




function loadsavedCodes () {
    var email = localStorage.getItem(angemeldeteMail);
    var ownerCode = "s192293_codes";
    var tokenCode = "w7Yi4XWG7arNipcmH4XOpUaWgbU_";
    var gespeicherteCodes = [];

    $.get("https://webtechlecture.appspot.com/cloudstore/get?owner="+ownerCode+"&token="+tokenCode+"&key="+email, function(geladen) {
        console.log(geladen);
        $.each(geladen.Identifizierungscodes, function(i, code){
            if(code.length>1){
                $.each(code, function(i, mehrereCodes){
                    console.log(mehrereCodes);
                    gespeicherteCodes.push(mehrereCodes);
                })
            }
            else {
                console.log(code);
                gespeicherteCodes.push(code);
            }
            console.log(gespeicherteCodes);
        })
        //loadStyles(gespeicherteCodes);
        mitarbeiterDropdown.fill(gespeicherteCodes);
    });

}

$(function(){
loadsavedCodes();

     var settingsLookupDropdown={};
  settingsLookupDropdown.inputtext=$("#mitarbeiter-input");
  settingsLookupDropdown.dropdownlist=$("#mitarbeiter-dropdown");
  settingsLookupDropdown.dropdownbutton=$("#mitarbeiter-button");
  settingsLookupDropdown.placeholder="Name";
  settingsLookupDropdown.ondropdownclick=onDropdownClick;
  settingsLookupDropdown.help=$("#mitarbeiter-help");		  
  mitarbeiterDropdown=createLookupDropdown(settingsLookupDropdown);

  

//hier die Dropdownliste befüllen	
  //mitarbeiterDropdown.fill(mitarbeiterListe);

});




function onDropdownClick(aName)
{
    //hier die Analyse für den gewählten Mitarbeiter ausführen
    window.alert("Dein Style-Code: "+aName);


};



