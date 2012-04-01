// ------------------------------------------------------------------------------------------------------------------------
//
//  ██████ ██ ██       
//  ██        ██       
//  ██     ██ ██ █████ 
//  █████  ██ ██ ██ ██ 
//  ██     ██ ██ █████ 
//  ██     ██ ██ ██    
//  ██     ██ ██ █████ 
//
// ------------------------------------------------------------------------------------------------------------------------
// File

	// ----------------------------------------------------------------------------------------------------
	// setup
	
		if( ! ko.extensions )ko.extensions = {};
		if( ! ko.extensions.xjsfl )ko.extensions.xjsfl = {};
		if( ! ko.extensions.xjsfl.classes )ko.extensions.xjsfl.classes = {};
	
	// ----------------------------------------------------------------------------------------------------
	// class
	
		/**
		 * File object - reads and writes text files to disk
		 */
		ko.extensions.xjsfl.classes.File = function(pathOrURI, content)
		{
			// constructor
				this.koFileEx		= Components.classes["@activestate.com/koFileEx;1"].createInstance(Components.interfaces.koIFileEx);
				this.koFileEx.path	= ko.uriparse.URIToPath(pathOrURI);
		
			// write to the file if content is supplied
				if(content)
				{
					this.write(content);
				}
		}
		
		ko.extensions.xjsfl.classes.File.prototype =
		{
			/** @type {Components.interfaces.koIFileEx} */
			koFileEx:null,
			
			read:function()
			{
				this.koFileEx.open("r");
				var data = this.koFileEx.readfile();
				this.koFileEx.close();
				return data;
			},
		
			write:function(data, append)
			{
				this.koFileEx.open(append ? 'a' : 'w');
				this.koFileEx.puts(data);
				this.koFileEx.close();
				return true
			},
		
			run:function()
			{
				var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
				file.initWithPath(this.koFileEx.path);
				return file.launch();
			},
			
			remove:function()
			{
				this.koFileEx.remove();
			},
			
			get exists()
			{
				return this.koFileEx && this.koFileEx.exists;
			},
		
			toString:function()
			{
				return '[object File path="' +this.koFileEx.path+ '" exists="' +this.exists+ '"]';
			}
		}
