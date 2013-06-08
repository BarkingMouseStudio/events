(function(backgroundContext) {

  var eventsQueue = [];

  // init bridge
  var devtoolsPanelPort;

  console.warn('background init');

  // devtools ready
  chrome.extension.onConnect.addListener(function(port) {
    if (port.name !== 'devtools') {
      return;
    }

    devtoolsPanelPort = port;
    devtoolsPanelPort.onDisconnect.addListener(function(port) {
      devtoolsPanelPort = null;
    });

    // send queued messages
    var evt;
    while (evt = eventsQueue.shift()) {
      // panel <= devtools
      devtoolsPanelPort.postMessage(evt);
    }
  });
})(window);
