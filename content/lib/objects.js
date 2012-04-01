// ------------------------------------------------------------------------------------------------------------------------
//
//  ██████ ██      ██              ██         
//  ██  ██ ██                      ██         
//  ██  ██ █████   ██ █████ █████ █████ █████ 
//  ██  ██ ██ ██   ██ ██ ██ ██     ██   ██    
//  ██  ██ ██ ██   ██ █████ ██     ██   █████ 
//  ██  ██ ██ ██   ██ ██    ██     ██      ██ 
//  ██████ █████   ██ █████ █████  ████ █████ 
//                 ██                         
//               ████                         
//
// ------------------------------------------------------------------------------------------------------------------------
// Objects

	// ----------------------------------------------------------------------------------------------------
	// setup
	
		if( ! ko.extensions )ko.extensions = {};
		if( ! ko.extensions.xjsfl )ko.extensions.xjsfl = {};
		if( ! ko.extensions.xjsfl.lib )ko.extensions.xjsfl.lib = {};
		
	// ----------------------------------------------------------------------------------------------------
	// objects
	
		ko.extensions.xjsfl.lib.objects =
		{
			json:			Components.classes["@mozilla.org/dom/json;1"].createInstance(Components.interfaces.nsIJSON),
			clipboard:		Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper),
		}
