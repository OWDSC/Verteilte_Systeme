/* closure for login dialoge
 *
 * settings contains
 * parent: a jQuery Div 
 * onRegister: event lister that is called when the user wants to register   
 * */
 
 var docs;//debugging
 
function createRegister(settings)
{
	
	var mContainer;		
	var mFirstnameInput;
	var mLastnameInput;	
	var mEmailInput;
	var mPasswordInput;	
	var mClock;
	var mRegisterButton;
	var mBusyIcon;
	
	inflate();
	setup();
	setupCSS();
	
	
	
	
	function inflate()
	{
		mContainer=$("<div/>").addClass("container login-container");		
		settings.parent.append(mContainer);
		
		
		
		
		
		var rowLogin=createAppendRowColumns();
		 mEmailInput=createInputtext({"parent":rowLogin.col1,"id":"register-email","width":"100%",
										  "labelText":"Email*","inputPlaceholder":"Ihre eMail","inputType":"email",
										  "hintText":"Geben Sie eine Email ein!",
										  "onKeypress":onKeypress});
		
		
		 mPasswordInput=createInputtext({"parent":rowLogin.col2,"id":"register-password","width":"100%",
										  "labelText":"Passwort*","inputPlaceholder":"Ihr Passwort","inputType":"password",
										  "hintText":"",
										  "onKeypress":onKeypress});
										  
		
		
		
		var row2=createAppendRowColumns();
		
		
		
		mFirstnameInput=createInputtext({"parent":row2.col1,"id":"register-firstname","width":"100%",
										  "labelText":"Vorname*","inputPlaceholder":"","inputType":"text",
										  "hintText":"",
										  "onKeypress":onKeypress
										  });
										  
		mLastnameInput=createInputtext({"parent":row2.col2,"id":"register-lastname","width":"100%",
										  "labelText":"Nachname*","inputPlaceholder":"","inputType":"text",
										  "hintText":"",
										  "onKeypress":onKeypress
										  });

						
		
		var rowLast=createAppendRowColumns();
		mRegisterButton=$("<button/>").attr("type","button").text("REGISTRIEREN");
		
		rowLast.col1.append(mRegisterButton);
		mRegisterButton.on("click",onRegisterButton);
		mRegisterButton.attr("disabled",true);
		mBusyIcon=$("<img/>").attr("src","pics/loading.gif");
		mBusyIcon.hide();		 
		rowLast.col1.append(mBusyIcon);
		
	}
	
	function setup()
	{
		mClock=createEventclock({"event":onTimeUp,"cycle":1000});
		
	}
	
	
	
	function setupCSS()
	{
		
		mContainer.css("font-size","16px");		
		mRegisterButton.addClass("btn btn-secondary");		
	}	
	
	function createAppendRowColumns()
	{
		var row=$("<div/>").addClass("row form-group");
		mContainer.append(row);
		row.css("margin-top","20px");
		
		var col1=$("<div/>").addClass("col-lg-6 col-sm-12");
		var col2=$("<div/>").addClass("col-lg-6 col-sm-12");
		row.append(col1);
		row.append(col2);
		col1.css("margin-top","20px");
		col2.css("margin-top","20px");
		function hide(){
			row.css("display", "none");
		}
		function show(){
			row.show("slow");
		}
		
		return {"col1":col1,"col2":col2, "hide":hide, "show":show};
	}
		
	
	function onKeypress()
	{
		//just reset the warning message in case of input
		
		mClock.start();
	}
	
	function onTimeUp()
	{
		console.log("check state");
		checkValidityInputs();
	}
	
	function onRegisterButton()
	{
		var missingData=checkValidityInputs();		
		if (missingData==false)
		{//check account
			if (settings.onRegister!=undefined)
			{
				settings.onRegister(getData());
			}
		}
	}	
	
	function checkValidityInputs()
	{
		var missingData=false;
		var email=mEmailInput.getValue();
		mEmailInput.clearHint();
		if (email==undefined || email.length<2 || email.indexOf("@")<0)
		{
			mEmailInput.setHintText("bitte geben Sie eine gültige Email ein!");
			mEmailInput.setHintClass("text-danger");
			missingData=true;
		}
		
		var password=mPasswordInput.getValue();		
		mPasswordInput.clearHint();
		if (password==undefined || password.length<2)
		{
			mPasswordInput.setHintText("bitte geben Sie ein Passwort ein!");
			mPasswordInput.setHintClass("text-danger");
			missingData=true;
		}		
		
		mFirstnameInput.clearHint();
		if(mFirstnameInput.getValue().length==0){
			mFirstnameInput.setHintText("bitte geben Sie einen Vornamen ein!");
			mFirstnameInput.setHintClass("text-danger");
			missingData=true;
		}
		
		mLastnameInput.clearHint();
		if(mLastnameInput.getValue().length==0){
			mLastnameInput.setHintText("bitte geben Sie einen Nachnamen ein!");
			mLastnameInput.setHintClass("text-danger");
			missingData=true;
		}
		
		
		if (missingData==false)
		{
			mRegisterButton.removeAttr("disabled");
		}else
		{
			mRegisterButton.attr("disabled",true);
		}
		return missingData;
	}
	
	
	function fadeOut()
	{
		mContainer.fadeOut("slow",function(){mContainer.hide("slow");});		
		mEmailInput.fadeOut();
	}
	
	function hide()
	{
		
		mContainer.hide();
		
		
	}
	
	function show()
	{
		
		mContainer.show();
		
	}
	
	
	
	
	
	function getEmail()
	{
		return mEmailInput.getValue();
	}
	
	function getPassword()
	{
		return mPasswordInput.getValue();
	}
	
	
	function getData(){
		
		
		var data = {
			"email": mEmailInput.getValue(),
			"password": $.md5(mPasswordInput.getValue()),
			"firstName": mFirstnameInput.getValue(),
			"lastName": mLastnameInput.getValue()
		}
		return data;
	}
	
	return {
		"hide":hide,
		"fadeOut":fadeOut,
		"show":show,		
		"getData":getData,				
	};
}

