(function(devtoolsContext) {

  // create devtools panel
  chrome.devtools.panels.create('Events', 'events.png', '../panel/panel.html', function(panel) {
    var panelContext;
    var eventsQueue = [];
    var devtoolsPanelPort = chrome.extension.connect({
      name: 'devtools'
    });

    // devtools => panel
    devtoolsPanelPort.onMessage.addListener(function(event) {
      if (!panelContext) {
        eventsQueue.push(event);
        return;
      }

      panelContext.receiveEvent(event);
    });

    panel.onShown.addListener(function onShown(context) {
      // only fire once
      panel.onShown.removeListener(onShown);
      panelContext = context;

      // send queued messages
      var event;
      while (event = eventsQueue.shift()) {
        // panel <= devtools
        panelContext.receiveEvent(event);
      }
    });
  });
})(window);
