
window.localStorage 
validate=false;
var angemeldeteMail;

function Login() {
    
    localStorage.setItem(validate,false);
    var eMailLogin = $("#emailInput").val();
    var passwordLogin = $("#passwordInput").val();
    
    if (eMailLogin && passwordLogin) {

        var ownerKunden = "s192293_customer";
        var tokenKunden = "jv6vgD_7Pg4IfNdLclaWVwCW_9w_";
        //passwordLogin = $.md5(passwordLogin)
        $.get("https://webtechlecture.appspot.com/cloudstore/get?owner="+ownerKunden+"&token="+tokenKunden+"&key="+eMailLogin, function(response){
        //check if email is registered
        if (response.hasOwnProperty("email")){
            //compare password
            if (passwordLogin == response.passwort){
                //if correct password
                localStorage.setItem(angemeldeteMail,eMailLogin);
                localStorage.setItem(validate,true);
                window.alert("Sie sind eingeloggt!");
                validate = true;
                

                if (validate) {

                   
                    window.location.replace("landingpage-new.html");
                    
                }
                
        
                
                

            }
            else {
                window.alert("Passwort falsch!");
                return;
            }
        }
        else{
            console.log("Email oder Passwort falsch!");
            window.alert("Email oder Passwort falsch");
        }
        }

        )};


        
        /*if (validate) {
            console.log("Login successfull");
            loggedin = true;

        }
       
        else {
            console.log("Error, Mail oder Passwort falsch");

        }
    }

    else {
        buttonLogin.removeClass("btn-primary");
        buttonLogin.addClass("btn-danger");
    }*/
    
}


function angemeldet () {

    window.location.replace("landingpage-new.html");

}


