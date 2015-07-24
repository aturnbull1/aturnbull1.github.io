if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(reg) {
    // registration worked
    console.log('Registration succeeded.');
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
};
