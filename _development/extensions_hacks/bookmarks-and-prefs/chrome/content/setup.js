var Cc = Components.classes;
var Ci = Components.interfaces;


var historyService = Cc["@mozilla.org/browser/nav-history-service;1"]
                     .getService(Ci.nsINavHistoryService);


var bmsvc = Cc["@mozilla.org/browser/nav-bookmarks-service;1"]
              .getService(Ci.nsINavBookmarksService);

/* Maybe an extension that simply adds some bookmarks and sets some preferences
 * for your extension development convenience?
 */

var ios = Cc["@mozilla.org/network/io-service;1"]
                    .getService(Ci.nsIIOService);

var urlsToBookmark = [
  "https://developer.mozilla.org/En/NsINavHistoryService",
  "https://developer.mozilla.org/en/XPCOM_API_Reference",
  "https://developer.mozilla.org/en/Manipulating_bookmarks_using_Places",
  "https://developer.mozilla.org/En/Using_the_Places_history_service",
  "https://developer.mozilla.org/En/NsIPrefService"
];

var namesToCallThem = [
  "Mozilla documentation: NavHistoryService",
  "Mozilla documentation: XPCOM API reference",
  "Mozilla documentation: Manipulating bookmarks with Places",
  "Mozilla documentation: Using the Places history service",
  "Mozilla documentation: Pref Service"
];

for (let i = 0; i < urlsToBookmark.length; i++){
  let uriObject = ios.newURI(urlsToBookmark[i], null, null);
  if (!bmsvc.isBookmarked(uriObject)) {
    bmsvc.insertBookmark(bmsvc.toolbarFolder, uriObject,
                         bmsvc.DEFAULT_INDEX, namesToCallThem[i]);
  }
}

// Get the root preferences branch
var prefs = Cc["@mozilla.org/preferences-service;1"]
               .getService(Ci.nsIPrefBranch);

prefs.setBoolPref("browser.dom.window.dump.enabled", true);
prefs.setBoolPref("javascript.options.showInConsole", true);

// TODO use about:config to find the name of a preference, and try writing
// code here to dump out its value.  Also try setting its value!