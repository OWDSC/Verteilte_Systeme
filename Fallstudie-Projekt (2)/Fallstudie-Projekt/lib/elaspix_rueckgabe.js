/* closure for maintainance
 *
 * settings contains
 * parent: a jQuery Div  
 * onRueckgabeBike: event lister that is called when a bike is to be createded 
 * */
 
 
 
function createRueckgabe(settings)
{
	
	var mContainer;		
	
	var mEmailInput;
	var mPasswordInput;	
	
	var mRueckgabeButton;
	var mBusyIcon;
	
	var mStationDropdown;
	var mBikeID;
	
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
		
		mBikeID=createInputtext({"parent":row2.col2,"id":"bike-id","width":"100%",
										  "labelText":"Bike-id","inputPlaceholder":"ID des neuen Fahrrads","inputType":"text",
										  "hintText":"Fahrrad-ID eingeben"
										 });
		
		
		var row3=createAppendRowColumns();

		mRueckgabeButton=$("<button/>").attr("type","button").text("Fahrrad ausleihen");		
		row3.col1.append(mRueckgabeButton);
		mRueckgabeButton.on("click",onAusleiheButton);
		
		
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
		mRueckgabeButton.addClass("btn btn-secondary");		
		
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
		
		if (settings.onRueckgabeBike!=undefined)
		{
			settings.onRueckgabeBike(mEmailInput.getValue(),mPasswordInput.getValue(),mStationDropdown.getValue(),mBikeID.getValue());
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

