// ------------------------------------------------------------------------------------------------------------------------
//
//           ██ ██████ ██████ ██          ██████
//           ██ ██     ██     ██          ██  ██
//  ██ ██    ██ ██     ██     ██          ██  ██ ████ █████
//  ██ ██    ██ ██████ █████  ██          ██████ ██   ██ ██
//   ███     ██     ██ ██     ██          ██     ██   ██ ██
//  ██ ██    ██     ██ ██     ██          ██     ██   ██ ██
//  ██ ██ █████ ██████ ██     ██████      ██     ██   █████
//
// ------------------------------------------------------------------------------------------------------------------------
// xJSFL Pro extension for Komodo

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

				trace('testing');

			// execute XUL or JSFL files only
				if(/\.(jsfl|xul)$/.test(uri))
				{
					trace('save file')
					var saved = xjsflLib.views.save(view);
					if(saved)
					{
						trace('saved...')
						// check for XUL dialog
							if(/\.xul$/.test(uri))
							{
								if(/<dialog\b/.test(view.scimoz.text))
								{
									ko.statusBar.AddMessage('Previewing XUL dialog...', 'xJSFL', 3000);
									xjsfl.file.run(uri, 'xul');
									return true;
								}
							}

						// otherwise, run JSFL file
							else
							{
								ko.statusBar.AddMessage('Running JSFL script...', 'xJSFL', 3000);
								xjsfl.file.run(uri, 'file');
								xjsfl.file.debug();
								return true;
							}
					}
				}

			// return
				return false;
		},

		project:function()
		{
			// get ordered views
				var views 		= xjsflLib.views.getAll();
				var uri			= null;

			// loop through views and save, grabbing first JSFL document
				for(var i = 0; i < views.length; i++)
				{
					// save document
						var view = views[i];
						xjsflLib.views.save(view);

					// grab first document
						var _uri = (view.document || view.koDoc).file.URI
						if(uri == null && /\.jsfl$/.test(_uri))
						{
							uri = _uri;
						}

				}

			// run the first view
				if(uri)
				{
					ko.statusBar.AddMessage('Running xJSFL project...', 'xJSFL', 3000);
					xjsfl.file.run(uri, 'file');
					return true;
				}
				else
				{
					ko.statusBar.AddMessage('Cannot run xJSFL project! At least one tab needs to be a .jsfl file', 'xJSFL', 2000, true);
				}

			// return
				return false;
		},

		items:function()
		{
			// variables
				var view	= ko.views.manager.currentView;
				var saved	= xjsflLib.views.save(view);
				var uri		= (view.document || view.koDoc).file.URI;

			// variables
				if(saved && /.jsfl$/.test(uri))
				{
					ko.statusBar.AddMessage('Running JSFL script on selected library items...', 'xJSFL', 3000);
					xjsfl.execute.file(uri, 'items');
					return true;
				}

			// return
				return false;
		}

	};

// ----------------------------------------------------------------------------------------------------
// settings

	if( ! window.xjsfl.settings.pro )
	{
		// "pro" settings
			window.xjsfl.settings.pro = true;
	
			xjsfl.toString = function()
			{
				return '[object xJSFLPro]';
			}

		// add pro keyboard bindings
			xjsfl.settings.shortcuts.push
			(
				[
					{
						combo		:'ctrl+shift+enter',
						id			:'xjsfl.exec.project',
						callback	:xjsfl.exec.project,
					},
					{
						combo		:'ctrl+shift+alt+enter',
						id			:'xjsfl.exec.items',
						callback	:xjsfl.exec.items
					},
				]
			);
	}

// ----------------------------------------------------------------------------------------------------
// Events

	/**
	 * Runs a JSFL file, then checks the temp folder for errors and displays the debugger window
	 *
	 * @param		{String}		uri		The URI of the file to test
	 */
	xjsfl.file.debug = function()
	{
		// callback
			function loadErrors()
			{
				// load error
					var error = errorFile.read();

				// do something with errors
					if(error)
					{
						// onLoad callback
							function build(event)
							{
								win.build(data);
							}

						// set up the data and open the window
							var data	= xjsflLib.JSON.decode(error);
							var win		= window.open("chrome://xjsflpro/content/debugger/debugger.xul", "window", "chrome,resizable=1,alwaysraised=1");
							win.addEventListener('load', build);

						// feedback and cleanup
							ko.statusBar.AddMessage(data.message, 'xJSFL', 3000, true);
							errorFile.remove();
					}
					else
					{
						ko.statusBar.AddMessage('No errors!', 'xJSFL', 3000);
					}
			}

		// variables
			var xjsflPath	= xjsfl.tools.getXJSFLPath();
			var errorPath	= xjsflPath + 'core/jsfl/run/temp/error.txt'
			var errorFile	= new xjsflLib.File(errorPath);

		// set a small timeout to let Flash do its thing before checking for errors
		// could put this on a small setInterval delay instead
			window.setTimeout(loadErrors, 3000);
	};


// ----------------------------------------------------------------------------------------------------
// tools

	xjsfl.tools.extend
	(
		xjsfl.tools.extend,
		{
			copyViewURI:function()
			{
				var doc		= xjsflLib.views.getCurrent(true);
				var uri		= doc.file ? this.getURI(doc.file.URI) : doc.file.name;
				xjsflLib.Clipboard.copyString("'" + uri + "'");
			},

			launchDebugger:function()
			{
				function build(event)
				{
					win.build(data);
				}

				var win	= window.open("chrome://xjsfl/content/xjsflpro/debugger/debugger.xul", "window", "chrome,resizable=1,alwaysraised=1");
				win.addEventListener('load', build)
			}

		}
	);
