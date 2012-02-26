What this extension does:

 Reverses the names of all the menus in the menu bar.

Why:

 It demonstrates how a XUL overlay can be used to not only add elements, but to alter existing elements too.

 It shows how to overlay the main menu bar.

How:

 Take a look at menubar-madness/chrome/content/browser.xul

   <menu id="file-menu" label="eliF"/>

An element with id="file-menu" already exists in the original XUL file (i.e., the Firefox File menu).  Therefore, an overlay like the one above is interpreted not as "add a new element with id=file-menu", but instead as "get the element with id=file-menu and change its label attribute".  The label attribute determines the string that is used to display the menu in the menu bar.

You can use the same pattern to change any attribute of any XUL tag in firefox -- as long as the original XUL tag has an ID.


How to learn more:

  Using XUL overlays to do anything useful requires finding the ids of the elements you want to overlay.  This can be tricky, but there are a couple of methods.

  1. DOM Inspector
  2. Search the source code

Documentation about how XUL overlays work is at https://developer.mozilla.org/en/XUL_Overlays