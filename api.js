(function(tabContext) {

  // api => content
  tabContext.ConsoleEvents = {
    Track: function(event, properties) {
      tabContext.postMessage({
        event: event,
        properties: properties
      }, '*');
    }
  };
})(window);
