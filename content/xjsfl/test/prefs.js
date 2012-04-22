
	// --------------------------------------------------------------------------------
	// globals
	
		var pref		= 'xjsfl.exec.test';
		var KO			= window.ko || parent.opener.ko;
		var checkbox;
	
		if(parent && parent.opener)
		{
			var clear		= window.clear || parent.opener.clear || function(){ };
			var trace		= window.trace || parent.opener.trace || function(){ };
			var xjsfl		= parent.opener.xjsfl;
			var xjsflLib	= parent.opener.xjsflLib;
		}

	// --------------------------------------------------------------------------------
	// handlers
	
		function onLoad()
		{
			// set variables
				checkbox = document.getElementById('checkbox') || {};
				
			// get any previously-set value
				var value;
				if(KO.prefs.hasBooleanPref(pref))
				{
					value = KO.prefs.getBooleanPref(pref);
				}
				alert('value loaded as: ' + value);
				
			// update the UI
				if(typeof value !== 'undefined')
				{
					checkbox.checked = value;
				}
				
			// call parent method
				if(parent.hPrefWindow)
				{
					//parent.hPrefWindow.onpageload();
				}
		}
		
		function OnPreferencePageOK()
		{
			// grab the value from the UI
				var value = checkbox.checked;
				alert('checkbox checked is: ' + value);
				
			// save the value
				try
				{
					KO.prefs.setBooleanPref(pref, value)
				}
				catch(err)
				{
					alert(err);
				}
				
			// double-check the value was saved
				alert('value saved as: ' + KO.prefs.getBooleanPref(pref))
				
			// return
				return true;
		}

if( ! parent.opener )
{
	onLoad();
	checkbox.checked = true;
	OnPreferencePageOK();
}

