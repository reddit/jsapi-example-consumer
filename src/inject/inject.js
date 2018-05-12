
// ----------------------------------------------------------
// This part of the script triggers when page is done loading
// ----------------------------------------------------------
console.log("Hello. This message was sent from scripts/inject.js");

const NAME = "test";

const addElement = (e) => {
  acknowledge(e);

  const element = document.createElement('span');
  element.textContent = '⚠';
  element.title = e.detail.type;
  
  e.target.querySelector(`[data-name="${NAME}"]`).appendChild(element);
};

var acknowledge = (e) => {
  console.log(e)
};

const main = () => {
  document.addEventListener('reddit', addElement, true);
  document.addEventListener('reddit.urlChanged', acknowledge, true);

  var meta = document.createElement('meta');
  meta.name = 'jsapi.consumer';
  meta.content = NAME;
  document.head.appendChild(meta);
  meta.dispatchEvent(new CustomEvent("reddit.ready"));
};

main();
