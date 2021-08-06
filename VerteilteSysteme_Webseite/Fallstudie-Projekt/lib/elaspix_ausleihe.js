/* closure for maintainance
 *
 * settings contains
 * parent: a jQuery Div  
 * onAusleiheBike: event lister that is called when a bike is to be createded 
 * */
 
 
 
function createAusleihe(settings)
{
	
	var mContainer;		
	
	var mEmailInput;
	var mPasswordInput;	
	
	var mAusleiheButton;
	var mBusyIcon;
	
	var mStationDropdown;
	var mAnzahlDropdown;
	
	inflate();
	setup();
	setupCSS();
	
	
	
	
	function inflate()
	{
		mContainer=$("<div/>").addClass("container verwaltung-container");		
		settings.parent.append(mContainer);
		
		var row1=createAppendRowColumns();
		
		 mEmailInput=createInputtext({"parent":row1.col1,"id":"register-email","width":"100%",
										  "labelText":"Email*","inputPlaceholder":"Ihre eMail","inputType":"email",
										  "hintText":"Geben Sie eine Email ein!",
										  });
		
		
		 mPasswordInput=createInputtext({"parent":row1.col2,"id":"register-password","width":"100%",
										  "labelText":"Passwort*","inputPlaceholder":"Ihr Passwort","inputType":"password",
										  "hintText":"",
										  });

	
		
		var row2=createAppendRowColumns();
		
		mStationDropdown=createDropdowndesktop({
							"id":"station-dropdown",
							"parent":row2.col1,
							"labelText":"Station",
							"titleText":"bitte Station wählen",
							"listValues":[],
							"width":"100%"					
							
		});
		
		mAnzahlDropdown=createDropdowndesktop({
							"id":"anzahl-dropdown",
							"parent":row2.col2,
							"labelText":"Anzahl",
							"titleText":"bitte Anzahl wählen",
							"listValues":{"ein Fahrrad":1,"zwei Fahrräder":2,"drei Fahrräder":3,"vier Fahrräder":4},
							"width":"100%"
							
		});
		
		
		var row3=createAppendRowColumns();

		mAusleiheButton=$("<button/>").attr("type","button").text("Fahrrad ausleihen");		
		row3.col1.append(mAusleiheButton);
		mAusleiheButton.on("click",onAusleiheButton);
		
		
		//mCreateStationButton.attr("disabled",true);
		mBusyIcon=$("<img/>").attr("src","pics/loading.gif");
		mBusyIcon.hide();		 
		row1.col2.append(mBusyIcon);
		
	}
	
	function setup()
	{
		
		
	}
	
	
	
	function setupCSS()
	{
		
		mContainer.css("font-size","16px");				
		mAusleiheButton.addClass("btn btn-secondary");		
		
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
	
	function onChangeStation(aStation)
	{
		console.log("selected station",aStation);
	}
		
	
	function onKeypress()
	{
		//just reset the warning message in case of input
		
		
	}
	
	
	
	
	
	
	function onAusleiheButton()
	{
		
		if (settings.onAusleiheBike!=undefined)
		{
			settings.onAusleiheBike(mEmailInput.getValue(),mPasswordInput.getValue(),mStationDropdown.getValue(),mAnzahlDropdown.getValue());
		}
		
	}	
	

	
	
	function fadeOut()
	{
		mContainer.fadeOut("slow",function(){mContainer.hide("slow");});		
		mStationName.fadeOut();
	}
	
	function hide()
	{
		
		mContainer.hide();
		
		
	}
	
	function show()
	{
		
		mContainer.show();
		
	}
	
	function setStations(aList)
	{
		mStationDropdown.setValues(aList);
	}
	
	
	
	return {
		"hide":hide,
		"fadeOut":fadeOut,
		"show":show,
		"setStations":setStations
		
	};
}

