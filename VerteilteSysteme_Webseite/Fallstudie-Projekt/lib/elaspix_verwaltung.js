/* closure for maintainance
 *
 * settings contains
 * parent: a jQuery Div 
 * onCreateStation: event lister that is called when a station is to be createds
 * onCreateBike: event lister that is called when a bike is to be createded 
 * */
 
 
 
function createVerwaltung(settings)
{
	
	var mContainer;		
	
	var mStationName;
	var mBikeID;
	
	
	var mCreateStationButton;
	var mCreateBikeButton;
	var mBusyIcon;
	
	var mStationDropdown;
	
	inflate();
	setup();
	setupCSS();
	
	
	
	
	function inflate()
	{
		mContainer=$("<div/>").addClass("container verwaltung-container");		
		settings.parent.append(mContainer);
		
		var row1=createAppendRowColumns();
		 mStationName=createInputtext({"parent":row1.col1,"id":"verwaltung-stationsname","width":"100%",
										  "labelText":"Stationsname","inputPlaceholder":"Name der Station","inputType":"text",
										  "hintText":"Stationsnamen eingeben"
										  });
		
		mCreateStationButton=$("<button/>").attr("type","button").text("Station anlegen");		
		row1.col2.append(mCreateStationButton);
		mCreateStationButton.on("click",onStationCreateButton);
		
						
		
		var row2=createAppendRowColumns();
		
		mStationDropdown=createDropdowndesktop({
							"id":"station-dropdown",
							"parent":row2.col2,
							"labelText":"Station",
							"titleText":"bitte Station wählen",
							"listValues":[],
							"width":"100%",
							"onChange":onChangeStation
		});
		
		mBikeID=createInputtext({"parent":row2.col1,"id":"bike-id","width":"100%",
										  "labelText":"Bike-id","inputPlaceholder":"ID des neuen Fahrrads","inputType":"text",
										  "hintText":"Fahrrad-ID eingeben"
										 });
		var row3=createAppendRowColumns();

		mCreateBikeButton=$("<button/>").attr("type","button").text("Fahrrad anlegen");		
		row3.col1.append(mCreateBikeButton);
		mCreateBikeButton.on("click",onCreateBikeButton);
		
		
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
		mCreateStationButton.addClass("btn btn-secondary");		
		mCreateStationButton.css("margin-top","2em");		
		
		mCreateBikeButton.addClass("btn btn-secondary");		
		
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
	
	
	
	function onStationCreateButton()
	{
		
		if (settings.onCreateStation!=undefined)
		{
			settings.onCreateStation(mStationName.getValue());
		}
		
	}	
	
	
	function onCreateBikeButton()
	{
		
		if (settings.onCreateBike!=undefined)
		{
			settings.onCreateBike(mBikeID.getValue(),mStationDropdown.getValue());
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

