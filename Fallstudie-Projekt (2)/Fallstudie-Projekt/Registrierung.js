var User = {};



function Registrierung () {

    var firstName = $("#vorname").val();
    var lastName = $("#nachname").val();
    var email = $("#emailInput").val();
    var password =$("#passwordInput").val();
    var passwordRepeat = $("#passwordRepeatInput").val();

    if (firstName && lastName && email && password && passwordRepeat) {
        
        
                
                if (password == passwordRepeat) {

                    User = JSON.stringify({"vorname": firstName, "nachname" : lastName,"email": email, "passwort": password});
            
                    let owner = "s192293_customer";
                    let token = "jv6vgD_7Pg4IfNdLclaWVwCW_9w_";
                    $.get("https://webtechlecture.appspot.com/cloudstore/add?owner="+owner+"&token="+token+"&jsonstring="+encodeURIComponent(JSON.stringify({"vorname": firstName, "nachname" : lastName,"email": email, "passwort": password}))+"&key="+email, function(response){
                    console.log(response);
                    });
            
                    console.log(User);
                    window.alert("Registrierung erfolgreich!");
                    window.location.replace("inspireme_login.html");
                    }
                else {
                    window.alert("Fehler bei Passworteingabe! Erneut eingeben!");
                }
                
                }
            }
       

        
