self.addEventListener('message', function(e) {
    e.data[0].value = 100;
    self.postMessage(e.data);
}, false);
