clear()

function prefs()
{
	var id = 'xjsfl-runFile';
	Prefs.set(id, true)
	var value = Prefs.get(id)
	trace(value)
}


function shortcuts()
{
	
	function test()
	{
		alert(this);
	}
	
	if(window.shortcuts)
	{
		//inspect(shortcuts);
		shortcuts.destroy();
	}
	
	shortcuts = new Shortcuts();
	shortcuts.add('test', test, 39, false, false, true);
	
}



function json()
{
	var obj		= {a:1};
	var json	= Objects.json.encode(obj);
	var root	= 'E:/05 - Commercial Projects/xJSFL/3 - development/Komodo Extensions/Komodo xJSFL Extension/_development/Temp/';
	var file	= new ko.extensions.xjsfl.classes.File(root + 'test.txt', json);
	var obj		= Objects.json.decode(file.read());
	trace(obj.a)
}


function exists()
{
	var root	= 'E:/05 - Commercial Projects/xJSFL/3 - development/Komodo Extensions/Komodo xJSFL Extension/_development/Temp/';
	var file	= new ko.extensions.xjsfl.classes.File(root + 'test.txt');
	trace(file.exists)
}

var data ='{"message":"ReferenceError: The variable \\\"data\\\" is undefined"}';

var obj = ko.extensions.xjsfl.classes.JSON.decode(data)

trace(obj)
		
		