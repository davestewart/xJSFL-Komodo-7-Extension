if(window.Shortcuts)
{
	Shortcuts.dispose()
}

Shortcuts =
{
	// ----------------------------------------------------------------------------------------------------
	// variables
	
		hash:window.Shortcuts ? window.Shortcuts.hash : null, // borrow hash from previous hash if it exists
		
		
	// ----------------------------------------------------------------------------------------------------
	// setup
	
		initialize:function()
		{
			if( ! this.hash )
			{
				// initialize hash
					this.hash = {};
					
				// bind "this" scope for future calls to this (Shortcuts) and create interim handler 
					var manager = this;
					function handler(event)
					{
						manager.handler.call(manager, event);
					}
					
				// add the dispose method here so the interim handler can be successfully removed
					this.dispose = function()
					{
						this.removeAll();
						window.removeEventListener('keypress', handler, true);
					}
					
				// add the interim event handler
					window.addEventListener('keypress', handler, true);
			}
			
		},
		
		dispose:function()
		{
			// dummy method, will be replaced by the one created in initialize
		},
		
		
	// ----------------------------------------------------------------------------------------------------
	// public methods
	
		add:function(id, callback, keyCode, ctrlKey, shiftKey, altKey, scope)
		{
			if( ! this.hash[keyCode] )
			{
				this.hash[keyCode] = {};
			}
			var shortcut = new this.Shortcut(callback, keyCode, ctrlKey, shiftKey, altKey, scope);
			this.hash[keyCode][id] = shortcut;
		},
		
		remove:function(id)
		{
			for(var keyCode in this.hash)
			{
				var group = this.hash[keyCode];
				for(var groupId in group)
				{
					if(id === groupId)
					{
						delete group[id];
						return true;
					}
				}
			}
			return false;
		},
		
		removeAll:function()
		{
			for(var keyCode in this.hash)
			{
				var group = this.hash[keyCode];
				for(var groupId in group)
				{
					delete group[groupId];
				}
				delete this.hash[group];
			}
			delete this.hash;
		},
		
		
	// ----------------------------------------------------------------------------------------------------
	// internal
	
		/**
		 * Handles keyboard events
		 * @param	{Event}	event		A DOM Event
		 * @returns	{Boolean}			True of false if a shortcut was called
		 */
		handler:function(event)
		{
			/** @type {Shortcut} A Shortcut handler */
			var handler;
			var handlers = this.hash[event.keyCode];
			for each(handler in handlers)
			{
				if(handler.assert(event))
				{
					var state = handler.execute();
					if(state === false)
					{
						event.preventDefault();
						event.stopPropagation();
						return false;
					}
				}
			}
			return true;
		},
		
		Shortcut:function(callback, keyCode, ctrlKey, shiftKey, altKey, scope)
		{
			ctrlKey 	= !!ctrlKey;
			shiftKey	= !!shiftKey;
			altKey		= !!altKey;
			
			this.assert = function(event)
			{
				return event.ctrlKey === ctrlKey && event.shiftKey === shiftKey && event.altKey === altKey;
			}
			
			this.execute = function()
			{
				return callback.call(scope || callback || window);
			}
		
			this.toString = function()
			{
				return '[object Shortcut keyCode="' +keyCode+ '"  ctrlKey="' +ctrlKey+ '" shiftKey="' +shiftKey+ '" altKey="' +altKey+ '"]';
			}
		},
		
		toString:function()
		{
			return '[object Shortcuts]';
		}
}