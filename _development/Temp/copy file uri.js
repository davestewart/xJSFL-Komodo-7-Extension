				var document	= xjsfl.document.current();
				var uri			= xjsfl.jsfl.getURI(document.file.URI);
				xjsfl.objects.clipboard.copyString("'" + uri + "'");
