// This line makes sure that setUpDodgyToolbar will be called when the main window is
// done loading.
window.addEventListener("load", setUpDodgyToolbar, false);

function setUpDodgyToolbar() {
  let navBar = document.getElementById("nav-bar");

  let clickHandler = function(event) {
    let reorderedList = [];
    // Take all the children out, and...
    while (navBar.firstChild) {
      let index = Math.floor(Math.random() * navBar.childNodes.length);
      let aChild = navBar.childNodes[ index ];
      reorderedList.push(aChild);
      navBar.removeChild(aChild);
    }

    // ...put them back in.
    for (let i = 0; i < reorderedList.length; i++) {
      navBar.appendChild(reorderedList[i]);
    }
  };

  // Set up clickHandler to be called whenever any navbar element is clicked.
  let children = navBar.childNodes;
  for (let i = 0; i < children.length; i++)
  {
    children[i].onclick = clickHandler;
  };

  // TODO: try writing code here that looks at all the children of some
  // XUL element and prints out all of their IDs.
}

