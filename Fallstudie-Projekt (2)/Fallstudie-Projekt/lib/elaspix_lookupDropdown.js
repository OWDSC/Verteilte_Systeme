/*closure
 *a Dropdown with editable filter
 *to be used with Bootstrap 4 "Buttons with Dropdowns"
 *		https://getbootstrap.com/docs/4.0/components/input-group/#buttons-with-dropdowns
 **/


/**
 *settings must contain
 *	inputtext 		an text filt to edit the filter text
 *	dropdownlist 	hosts the clickable values
 *	dropdownbutton 	after click openes the dropdownlist
 *	placeholder		the string that is used as placeholder if inputtext is empty
 *	ondropdownclick	click event handler that accepts a string of the clicked dropdown entry
 *	onkeyup			keyboard event handler that accepts a string of the curent text-input value
 *	help			small-Tag to show help messages
 **/
function createLookupDropdown(settings)
{
	var mInput=settings.inputtext;
	var mList=settings.dropdownlist;
	var mButton=settings.dropdownbutton;
	var mEntries=[];//stores the list of dropdown values
	//var mDropdownShown;//states whether dropdown is shown or not
	var mHelp=settings.help;
	var mPlaceholder=settings.placeholder;
	var mHelpText="";
	
	
	function setup()
	{	
		mInput.attr("placeholder",mPlaceholder);
		mInput.keyup(onStoffeInputChange);
		mDropdownShown=false;
		
		//notify the status variable that the dropdown was manipulated by user
		//mList.parent().on('show.bs.dropdown', function () {
		//mDropdownShown=true;mList.show();	});
		//mList.parent().on('hide.bs.dropdown', function () {
		//mDropdownShown=false;mList.hide();});		
	}
	
	
	//user clicks on dropdown entry
	function onEntryClick(aText)
	{
		mButton.text(aText);
		
		//if (mDropdownShown==true)
		//{
		//	mList.hide();
		//	mDropdownShown=false;
		//	
		//}
		settings.ondropdownclick(aText);//external clickListener
	}
	
	//user enters text in the input-text
	function onStoffeInputChange()
	{
		
		var filter=updateDropdownList();
		//if (mDropdownShown==false)
		//{
		//	mList.show();
		//	mList.dropdown("toggle");
		//	console.log("show dropdown");
		//	mDropdownShown=true;
		//}
		
		if (settings.onkeyup!=undefined)
		{
			settings.onkeyup(filter);
		}
		
	}
	
	function updateDropdownList()
	{
		
		var filter=getFilterPrefix();
		var numberShown=0;
		var numberNotShown=0;
		
		
		$.each(mEntries,function(index,aEntry)
			   {
						if (aEntry.text().toLowerCase().indexOf(filter)>-1)
						{
							aEntry.show();
							numberShown=numberShown+1;
						}else
						{							
							aEntry.hide();
							numberNotShown=numberNotShown+1;
						}
				});
		
		mHelp.text(mHelpText+" ("+numberShown+" von "+(numberNotShown+numberShown)+" in der Liste)");
		
		return filter;
	}
	
	
	setup();
	
	//public methods
	function fill(aList)
	{
		$.each(aList,function(key,aText)
			   {
				
					var entry=$("<a/>").addClass("dropdown-item");
					entry.attr("href","#").click(function(){onEntryClick(aText);}).text(aText);
					//entry.attr("data-toggle","dropdown");
					mList.append(entry);
					mEntries.push(entry);
				
				
				});
		updateDropdownList();//hide items that do not match the placeholder
	}
	
	function getValue()
	{
		return mButton.text().trim();
	}
	
	function setValue(aValue)
	{
		mButton.text(aValue);
		
	}
	
	function setPlaceholder(aValue)
	{
		mPlaceholder=aValue;
		mInput.attr("placeholder",mPlaceholder);
		mInput.val("");//clear inputField
	}
	
	function setHelpText(aText)
	{
		mHelpText=aText;
		mHelp.text(mHelpText);
	}
	
	function getFilterPrefix()
	{
		var filter=mInput.val().toLowerCase();
		if (filter==""){filter=mPlaceholder.toLowerCase();}//placeholder default 
		return filter;
	}
	
	
	return {
		"list":mInput,
		"fill":fill, //fills the dropdown list with strings
		"getValue":getValue, //get the value of the button
		"setHelpText":setHelpText,
		"setValue":setValue,
		"setPlaceholder":setPlaceholder,
		"getFilterPrefix":getFilterPrefix //return the actual filter prefix
	};
}