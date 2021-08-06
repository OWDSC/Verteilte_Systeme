/**
 *closure for Bootstrap 4 Switches and Checkbox
 *updates the hint-text
 *
 **/


/**settigns must contain
 *	parent				jQuery Object	
 *	id					the id
 *	onChange			click event listener with one string parameter
 *	isclicked			string value if checkbox is clicked
 *	notclicked			string value if checkbox is not clicked
 *
 **/
function createSwitch(settings)
{
	var mContainer;
	var mCheckbox;
	var mHint
	var mLastValue;
	
	inflate();
	setup();
	setupCSS();
	
	
	function inflate()
	{
		mContainer=$("<div/>");
		settings.parent.append(mContainer);
		
		var div=$("<div/>").addClass("custom-control custom-switch");
		mContainer.append(div);
		mCheckbox=$("<input/>").attr("type","checkbox").addClass("custom-control-input").attr("id",settings.id);
		div.append(mCheckbox);
		mHint=$("<label/>").addClass("custom-control-label").attr("for",settings.id).text(settings.notclicked);
		//mHint.append(mCheckbox);
		div.append(mHint);
		
	}
	
	function setup(){
		mCheckbox.on("click",onClick);
		if (mCheckbox.is(":checked"))mLastValue=settings.isclicked;else mLastValue=settings.notclicked;
	}
	
	function setupCSS()
	{
		
	}
	
	//user clicks on dropdown entry
	function onClick()
	{
		updateLabel();
		
		
		if (settings.onChange!=undefined)
		{
			if (mCheckbox.is(":checked"))
			{
				settings.onChange(settings.isclicked);
			}else
			{
				settings.onChange(settings.notclicked);
			}
		}		
	}
	
	function updateLabel()
	{
		 if (mCheckbox.is(":checked"))
		 {
			mLastValue=settings.isclicked;
			mHint.text(settings.isclicked);
		 }else
		 {
			mLastValue=settings.notclicked;			
			mHint.text(settings.notclicked);			
		 }
	}
	
	
	
	
	//public methods
	
	function show()
	{
		mContainer.show();
	}
	
	function hide()
	{
		mContainer.hide();
	}
	
	
	function getValue()
	{
		return mLastValue.trim();
	}
	
	function setValue(aValue)
	{
		if (aValue==settings.isclicked)
		{
			mCheckbox.prop("checked",true);
		}
		
		if (aValue==settings.notclicked)
		{
			mCheckbox.prop("checked",false);
		}
		updateLabel();
	}
	
	return {		
		"getValue":getValue, //get the value of the button
		"hide":hide,
		"show":show,
		"setValue":setValue
	};
}