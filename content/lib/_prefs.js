// ------------------------------------------------------------------------------------------------------------------------
//
//  ██████             ████       
//  ██  ██             ██         
//  ██  ██ ████ █████  ██   █████ 
//  ██████ ██   ██ ██ █████ ██    
//  ██     ██   █████  ██   █████ 
//  ██     ██   ██     ██      ██ 
//  ██     ██   █████  ██   █████ 
//
// ------------------------------------------------------------------------------------------------------------------------
// Prefs

	// ----------------------------------------------------------------------------------------------------
	// setup
	
		if( ! ko.extensions )ko.extensions = {};
		if( ! ko.extensions.xjsfl )ko.extensions.xjsfl = {};
		if( ! ko.extensions.xjsfl.lib )ko.extensions.xjsfl.lib = {};

	// ----------------------------------------------------------------------------------------------------
	// code
	
		ko.extensions.xjsfl.lib.prefs =
		{
			// ----------------------------------------------------------------------------------------------------
			// getters
			
				/**
				 * Gets a preference
				 * @param	{String}	name	The preference name
				 * @returns	{Object}			The preference value, or undefined if it doesn't exist
				 */
				get:function(name)
				{
					var methods =
					[
						this.getString,
						this.getBoolean,
						this.getDouble,
						this.getLong,
					];
					
					for each(var method in methods)
					{
						var value = method(name);
						if(typeof value !== 'undefined')
						{
							return value;
						}
					}
					return undefined;
				},
				
				getString:function(name)
				{
					if(ko.prefs.hasStringPref(name))
					{
						return ko.prefs.getStringPref(name);
					}
					return undefined;
				},
				
				getBoolean:function(name)
				{
					if(ko.prefs.hasBooleanPref(name))
					{
						return ko.prefs.getBooleanPref(name);
					}
					return undefined;
				},
			
				getLong:function(name)
				{
					if(ko.prefs.hasLongPref(name))
					{
						return ko.prefs.getLongPref(name);
					}
					return undefined;
				},
			
				getDouble:function(name)
				{
					if(ko.prefs.hasDoublePref(name))
					{
						return ko.prefs.getDoublePref(name);
					}
					return undefined;
				},
			
			
			// ----------------------------------------------------------------------------------------------------
			// setters
			
				/**
				 * Sets a preference
				 * @param	{String}	name
				 * @param	{Value}	value
				 * @returns	{Prefs}
				 */
				set:function(name, value)
				{
					if(typeof value === 'boolean')
					{
						this.setBoolean(name, value);
					}
					else if(typeof value === 'number')
					{
						this.setLong(name, value);
					}
					else
					{
						this.setString(name, String(value));
					}
					return this;
				},
			
				setString:function(name, value)
				{
					return ko.prefs.setStringPref(name, value);
				},
				
				setBoolean:function(name, value)
				{
					return ko.prefs.setBooleanPref(name, value);
				},
			
				setLong:function(name, value)
				{
					return ko.prefs.setLongPref(name, value);
				},
		}