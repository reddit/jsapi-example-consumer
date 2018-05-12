
	// ----------------------------------------------------------
	// This part of the script triggers when page is done loading
console.log("Hello. This message was sent from scripts/inject.js");
	// ----------------------------------------------------------
  const NAME = "test";

  var modifyDiv = (e) => {
    var container;
    const doc = e.target;
    console.log(doc.childNodes);
    console.log(e);
    if (!doc.childNodes) {
      return false;
    }
    for (var i = 0; i < doc.childNodes.length; i++) {
      if (doc.childNodes[i].dataset.name === NAME) {
        container = doc.childNodes[i];
        break;
      }        
    }
    container.innerHTML = e.detail.type + "1";
  }
  var acknowledge = (e) => {
    console.log(e)
  }
  document.addEventListener('reddit', modifyDiv, true);
  document.addEventListener('reddit.urlChanged', acknowledge, true);
  var event = new CustomEvent("reddit.ready", { detail: { name: NAME } })
  document.dispatchEvent(event)