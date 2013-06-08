(function(panelContext) {

  panelContext.receiveEvent = function(event) {
    document.body.textContext += '\n' + JSON.stringify(event)
  };
})(window);
