/* closure to wrap a desktop dropdown menu
 *
 * settings contain
 * parent: jQuery Div
 * id: id of the dropdown-group
 * labelText: 
 * titleText: the button's default value
 * listValues: a JSON-Object with visible values as keys and internal representations values to the respective key
 * width: css property
 * onChange: event listener that is called if something changes
 *
 * */
function createDropdowndesktop(settings)
{
	
	var mContainer;
	var mMenu;
	var mButton;
	var mButtonText;
	var mLastValue="";
	var mLabel;
	var mHint;
	
	inflate();
	setupCSS();
	
	function inflate()
	{
		mContainer=$("<div/>");
		mContainer.css("width",settings.width);
		
		mLabel=$("<label/>").text(settings.labelText);
		var dropdown=$("<div/>").addClass("dropdown");
		mButton=$("<button/>").addClass("btn text-left dropdown-toggle");
		mButton.attr("id",settings.id+"-button");
		mButton.attr("type","button").attr("data-toggle","dropdown");
		
		mButtonText=$("<span/>").text(settings.titleText);
		mButtonText.attr("data-text",settings.titleText);		
		mButton.append(mButtonText);
		
		//var icon=$("<img/>").attr("src","https://my-pergola24.elaspix.de/elaspix/konfigurator/pics/dark_hds.svg");
		//icon.css("width","12px").css("position","absolute").css("right","0px");
		//icon.css("margin","8px").css("margin-right","12px");
		mMenu=$("<div/>").addClass("dropdown-menu w-100");
		
		
		mContainer.append(mLabel);
		mContainer.append(dropdown);
		dropdown.append(mButton);
		//mButton.append(icon);
		dropdown.append(mMenu);
		//mGroupsDiv.append(group);
		
		mHint=$("<small/>").text(settings.hintText);
		mContainer.append(mHint);
		settings.parent.append(mContainer);
		//var groupStructure={"group":mContainer,"button":button,"buttonText":buttonText,"menu":menu,"onChange":settings.onChange,"lastValue":""};
		//mDropDownGroups[aId]=groupStructure;
		setValues(settings.listValues);
	}
	
	function setValues(aValues)
	{		
			settings.listValues=aValues;
			mMenu.empty();			
			$.each(Object.keys(aValues),function(index,key){
				
				var entry=$("<div/>").addClass("dropdown-item").text(key);
				entry.on("click",function(){onValueSelect(key);});
				entry.css("cursor","pointer").css("user-select","none");
				entry.css("word-wrap","break-word");
				entry.css("overflow","hidden");			
				mMenu.append(entry);			
			});
	}
	
	function onValueSelect(aKey)
	{
		internalValue=settings.listValues[aKey];
		console.log("onValueSelect with Value "+internalValue);
		mButtonText.text(aKey);
		mButtonText.attr("data-text",internalValue);
		
		if ((mLastValue!=internalValue) && (settings.onChange!=undefined))
		{
			mLastValue=internalValue;//only fire if the value is new
			settings.onChange(internalValue);
		}else{
			clearHint();
		}
	}
	
	function setupCSS()
	{
		mHint.addClass("form-text text-muted");
		mButton.addClass("btn-dropdown");//style now handled in css section
		// mButton.css("border-radius",".25rem");//default bootstrap is overwritten by elementor
		// mButton.css("background-color","white");//default bootstrap is overwritten by elementor
		// mButton.hover(
				// function(){mButton.css("background-color","#333333");console.log("hover");},
				// function(){mButton.css("background-color","white");}
				// );
		
	}
	
	function getValue()
	{
		return mButtonText.attr("data-text");
	}
	
	function selectValue(aValue){
		
		mButtonText.text(aValue);
		mButtonText.attr("data-text", aValue);
		mLastValue = aValue;
		
	}
	
	function setLabelText(aText){
		mLabel.text(aText);
	}
	
	function setHintText(aText)
	{
		mHint.text(aText);
	}
	
	function setHintTextHTML(aHTML)
	{
		mHint.html(aHTML);
	}
	
		//aHintObjects is a list of tuples with hint:text and click:function-Properties
	function setHint(aHintObjects)
	{
		mHint.empty();
		$.each(aHintObjects,function(index,hintObject){
					var span=$("<span/>").text(hintObject.hint);
					if (hintObject.hasOwnProperty("click"))
					{
						span.css("text-decoration","underline").css("cursor","pointer");
						span.on("click",hintObject.click);
					}
					
					if (hintObject.hasOwnProperty("cssClass"))
					{
						span.addClass(hintObject.cssClass);
					}
					mHint.append(span);
				});
	}
	
	function setHintClass(aClass)
	{
		mHint.removeClass();
		mHint.addClass("form-text");//padding
		
		mHint.addClass(aClass);
		if (aClass!="text-danger" && aClass!="text-warning" && aClass!="text-success")
		{//show gray color only if text-danger is not given which forces to show text in red
			mHint.addClass("text-muted");//gray
		}
	
	}
	
	function clearHint()
	{
		mHint.text("");
		setHintClass("");//uses text-muted
	}
	
	function fadeOut()
	{
		mContainer.fadeOut("slow",function(){mContainer.hide("slow");});		
	}
	
	function hide()
	{
		mContainer.css("display","none");
	}
	
	function show()
	{
		mContainer.show("fast");
		//mContainer.css("display","block");
	}
	
	return {
		"setValues":setValues,
		"getValue":getValue,
		"selectValue":selectValue,
		"setLabelText":setLabelText,
		"setHintText":setHintText,
		"setHintTextHTML":setHintTextHTML,
		"setHint":setHint,//replaces the html content and appends the passed jQuery-Object
		"clearHint":clearHint,
		"setHintClass":setHintClass,
		"hide":hide,
		"fadeOut":fadeOut,
		"show":show
	};
	
	
}
