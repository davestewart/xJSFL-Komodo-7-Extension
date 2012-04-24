// ------------------------------------------------------------------------------------------------------------------------
//
//           ██ ██████ ██████ ██
//           ██ ██     ██     ██
//  ██ ██    ██ ██     ██     ██
//  ██ ██    ██ ██████ █████  ██
//   ███     ██     ██ ██     ██
//  ██ ██    ██     ██ ██     ██
//  ██ ██ █████ ██████ ██     ██████
//
// ------------------------------------------------------------------------------------------------------------------------
// xJSFL - library of functions needed to publish JSFL files

if( ! window.xjsfl )
{
	window.xjsfl =
	{
		shortcuts:null,

		settings:
		{
			shortcuts:
			[
				{
					id			:'xjsfl.exec.file',
					callback	:xjsfl.exec.file,
					combo		:'ctrl+enter',
				},
			],
		},

		onPrefs:function()
		{
			var prefs = new xjsflLib.Prefs(ko.prefs);
			for each(var shortcut in this.settings.shortcuts)
			{
				var enabled = prefs.get(shortcut.id);
				if(enabled)
				{
					xjsfl.shortcuts.add(shortcut.id, shortcut.callback, shortcut.combo);
				}
				else
				{
					xjsfl.shortcuts.remove(shortcut.id);
				}
			}
		},

		onLoad:function()
		{
			// event handlers
				var container		= (ko.views.manager ? ko.views.manager.topView : window);
				xjsfl.shortcuts		= new xjsflLib.Shortcuts(container);

			// initialize
				xjsfl.onPrefs();
		},

		toString:function()
		{
			return '[object xJSFL]';
		}

	}
	window.addEventListener('load',  xjsfl.onLoad, false);
}


// --------------------------------------------------------------------------------
// commands

	xjsfl.exec =
	{
		file:function()
		{
			//clear();
			// variables
				var view	= ko.views.manager.currentView;
				var uri		= view.item.url;

				trace('testing!');

			// execute XUL or JSFL files only
				if(/\.(jsfl)$/.test(uri))
				{
					trace('save file')
					var saved = xjsflLib.views.save(view);
					if(saved)
					{
						trace('saved...')
						ko.statusBar.AddMessage('Running JSFL script...', 'xJSFL', 1000);
						xjsfl.file.run(uri, 'file');
						return true;
					}
				}

			// return
				//return false;
		}
	},

// ----------------------------------------------------------------------------------------------------
// Events

	xjsfl.file =
	{
		/**
		 * Runs a JSFL file via the xJSFL file/run load process
		 *
		 * 1 - Saves the URI of the file to run to a text file
		 * 2 - launches the core/jsfl/run/{type}.jsfl file
		 * 3 - that file reads in the URI and does something with it
		 *
		 * @param	{String}	uri		The URI of the file to run
		 * @param	{String}	type	An optional type of file to run; valid values are jsfl, xul, lib
		 */
		run: function(uri, type)
		{
			// variables
				var xjsflPath = xjsfl.tools.getXJSFLPath();

			// run the file if xjsfl path is defined...
				if(xjsfl.tools.testPath(xjsflPath))
				{
					trace('Running file')
					// URIs
						var textPath	= xjsflPath + 'core/temp/uri.txt';
						var jsflPath	= xjsflPath + 'core/jsfl/run/' +type+ '.jsfl';

					// check run file exists
						if(xjsfl.tools.testPath(jsflPath))
						{
							// write the URI to the text file
								new xjsflLib.File(textPath, uri);

							// run the run file
								new xjsflLib.File(jsflPath).run();

							// start the debug process in motion
								this.debug();

							// return
								return true;
						}
						else
						{
							alert('There was a problem publishing the file.');
							return false;
						}
				}

			// ...if not, throw the user back to preferences
				else
				{
					alert('The xJSFL extenstion needs to know the location of your xJSFL installation folder in order to run.\n\nPlease go to Preferences > xJSFL and update the path.');
					ko.commands.doCommand('cmd_editPrefs')
					return false;
				}

		},

		debug:function()
		{
			return true;
		}

	}


// ----------------------------------------------------------------------------------------------------
// tools

	xjsfl.tools =
	{
		getXJSFLPath:function()
		{
			return xjsflLib.prefs.get('xjsfl.paths.xjsfl').replace(/\\/g, '/').replace(/\/*$/, '/');
		},

		/**
		 * Grabs the JSFL native URI format: file:///c|path/to/file.jsfl
		 * @param	{String}	pathOrURI	A path or uri
		 * @returns	{String}				A JSFL native URI
		 */
		getURI:function(pathOrURI)
		{
			var uri = pathOrURI.indexOf('file:///') === 0 ? pathOrURI : ko.uriparse.pathToURI(pathOrURI);
			return uri.replace(/\/(\w):/, '/$1|');
		},

		testPath:function(path)
		{
			return new xjsflLib.File(path).exists;
		},

		extend:function(src, trg)
		{
			for(var name in src)
			{
				trg[name] = src[name];
			}
		}

	}
