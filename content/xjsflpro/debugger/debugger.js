// ------------------------------------------------------------------------------------------------------------------------
//
//  █████        ██                                 
//  ██  ██       ██                                 
//  ██  ██ █████ █████ ██ ██ █████ █████ █████ ████ 
//  ██  ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██   
//  ██  ██ █████ ██ ██ ██ ██ ██ ██ ██ ██ █████ ██   
//  ██  ██ ██    ██ ██ ██ ██ ██ ██ ██ ██ ██    ██   
//  █████  █████ █████ █████ █████ █████ █████ ██   
//                              ██    ██            
//                           █████ █████            
//
// ------------------------------------------------------------------------------------------------------------------------
// Debugger
	
	// ----------------------------------------------------------------------------------------------------
	// variables
	
		// objects
			var ko				= this.opener ? this.opener.ko : ko;
					
		// elements		
			var tree			= document.getElementById('tree');
			var cols			= document.getElementById('tree-cols');
			var body			= document.getElementById('tree-body');
			var btnPrev			= document.getElementById('toolbar-prev-line');
			var btnNext			= document.getElementById('toolbar-next-line');
			var message			= document.getElementById('toolbar-message');
					
		// variables		
			var index			= 0;
			var data;

	// ----------------------------------------------------------------------------------------------------
	// actions
	
		function launch()
		{
			var uri				= data.stack[index].uri;
			var line			= data.stack[index].line;
			ko.open.URIAtLine(uri, line);
			ko.views.manager.currentView.setFocus();
			ko.views.manager.currentView.scimoz.isFocused = true;
			
			//window.setTimeout(function(){;}, 100);
		}
		
		function updateIndex()
		{
			btnPrev.disabled	= tree.currentIndex == 0;
			btnNext.disabled	= tree.currentIndex == data.stack.length - 1;
		}
		
		function selectLine(dir)
		{
			if(index + dir >= 0 && index + dir < data.stack.length)
			{
				index += dir;
				tree.view.selection.select(index);
				tree.focus();
				launch();
			}
		}
		
	// ----------------------------------------------------------------------------------------------------
	// handlers
	
		function onDoubleClick(event)
		{
			updateIndex();
			launch();
			opener.focus();
		}
		
		function onSelect(event)
		{
			updateIndex();
			launch();
		}
		
		function onKeyDown (event)
		{
			if(event.keyCode == 27)
			{
				self.close();
			}
		}
		
	// ----------------------------------------------------------------------------------------------------
	// build
	
		function addRow(body, uri, labels)
		{
			// elements
				var item		= document.createElement('treeitem');
				var row			= document.createElement('treerow');
				
			// attach row
				item.appendChild(row);
				body.appendChild(item);
				
			// add cells
				for each(var label in labels)
				{
					var cell = document.createElement('treecell');
					cell.setAttribute('label', label);
					if( ! isNaN(label) )
					{
						cell.setAttribute('class', 'numeric');
					}
					row.appendChild(cell);
				}
		}
		
		function build(data)
		{
			// variables
				this.data = data	= data || {};
			
			// message
				message.value		= data.message || 'There are currently no errors';
				
			// items
				var num				= 1;
				for each(var datum in data.stack)
				{
					var labels		= [num++, ko.uriparse.URIToPath(datum.uri), datum.line, datum.code];
					addRow(body, datum.uri, labels);
				}
				
			// height
				var colsHeight		= cols.scrollHeight + 1;
				var rowHeight		= tree.treeBoxObject.rowHeight + 1;
				var height			= colsHeight + (data.stack.length * rowHeight);
				
				//tree.style.height	= height + 'px';
				//tree.style.height = 100 + 'px'
		}