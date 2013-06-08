(function(contentContext) {

  var contentAPIPort = chrome.extension.connect();

  // api => content
  contentContext.addEventListener('message', function(e) {
    console.warn('background <= api : message', e.data);

    if (e.source != contentContext) {
      return;
    }

    if ('event' in e.data) {
      if (devtoolsPanelPort) {
        devtoolsPanelPort.postMessage(e.data);
      } else {
        eventsQueue.push(e.data);
      }
    }
  }, false);

  // inject api
  var script = document.createElement('script');
  script.src = chrome.extension.getURL('api.js');
  script.onload = function() {
    this.parentNode.removeChild(this);
  };
  (document.head || document.documentElement).appendChild(script);
})(window);
