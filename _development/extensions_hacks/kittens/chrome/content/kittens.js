window.addEventListener("load", function() { kittenLoader.init(); }, false);

var kittenLoader = {
  _images: [],

  init: function() {
    kittenLoader.getImages();
    var appcontent = document.getElementById("appcontent");   // browser
    if(appcontent)
      appcontent.addEventListener("DOMContentLoaded",
                                  kittenLoader.onPageLoad, true);
  },

  getImages: function() {
    var url = "http://feeds2.feedburner.com/ICanHasCheezburger?format=xml";
    var req = new XMLHttpRequest();

    req.open('GET', url, true);
    req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
        if(req.status == 200) {
          var xmldoc = req.responseXML;
          var images = xmldoc.getElementsByTagName('media:content');
          for each (let elem in images) {
            if (!elem.getAttribute)
              continue;
            let imgUrl = elem.getAttribute("url");
            if (imgUrl.indexOf("funny-pictures") != -1)
              kittenLoader._images.push(imgUrl);
          }
        } else {
          dump("Error " + req.status + " loading page\n");
        }
      }
    };
    req.send(null);
  },

  onPageLoad: function(aEvent) {
    var doc = aEvent.originalTarget;
    // doc is document that triggered "onload" event

    var numImages = kittenLoader._images.length;
    var index = Math.floor(Math.random() * numImages);
    var replacementImageUrl = kittenLoader._images[index];

    var images = doc.getElementsByTagName("img");
    for each (var image in images) {
      image.src = replacementImageUrl;
    }
  }
}
