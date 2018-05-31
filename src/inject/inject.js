
// ----------------------------------------------------------
// This part of the script triggers when page is done loading
// ----------------------------------------------------------
console.log("Hello. This message was sent from scripts/inject.js");

const NAME = "test";

const addElement = (e) => {
  acknowledge(e);

  const target = e.target.querySelector(`[data-name="${NAME}"]`);

  // Events are received that are intended for all consumers. 
  // In case the JSAPI hasn't finished registering this consumer yet.
  if(!target) {
    return;
  }

  // This container has already been handled by this extension before.
  // To avoid duplicates it will be ignored. 
  if(target.classList.contains(`${NAME}-handled`)) {
    return;
  }

  requestAnimationFrame(function() {
    // Add a class so the extension on refire can tell this target has been handled before.
    target.classList.add(`${NAME}-handled`);

    // Create element that will be inserted in the container.
    const element = document.createElement('span');
    element.textContent = `⚠ ${e.detail.type}`;

    // Pretty printed detail information the jsAPI send for this container.
    element.title = JSON.stringify(e.detail, null, 4);
    target.appendChild(element);
  });
};

const acknowledge = (e) => {
  console.log(e)
};

const main = () => {
  if (!document.querySelector('meta[name="jsapi"]')) {
    return;
  }

  // Will listen for dom elements being added or updated.
  document.addEventListener('reddit', addElement, true);
  // Will listen for page change events.
  document.addEventListener('reddit.urlChanged', acknowledge, true);

  // Register extension as JSAPI consumer.
  const meta = document.createElement('meta');
  meta.name = 'jsapi.consumer';
  meta.content = NAME;
  document.head.appendChild(meta);
  meta.dispatchEvent(new CustomEvent("reddit.ready"));
};

main();
