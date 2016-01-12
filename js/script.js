// if browser supports serviceworker
   if ('serviceWorker' in navigator) {
     // Let's register our serviceworker
     navigator.serviceWorker.register('/sw.js', {
       scope: '/'
     }).then(function(registration) {
       console.log("Service Worker Registered :)")
     }).catch(function(err) {
       console.log('Service Worker Registration Failed: ',  err);
     });

   }
