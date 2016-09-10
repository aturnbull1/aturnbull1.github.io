// Here comes the install event!
// This only happens once, when the browser sees this
// version of the ServiceWorker for the first time.

self.addEventListener('install', function(event) {
  // We pass a promise to event.waitUntil to signal how
  // long install takes, and if it failed

  event.waitUntil(
    // We open a cache…
    caches.open('simple-sw-v1').then(function(cache) {
      // And add resources to it
      return cache.addAll([
        '/',
        'index.html',
        'results.html',
        'images/foot_logotranslink.png',
        'images/logo.jpg',
        'images/Translink_logo.png',
        'images/translinklogo.png',
        'images/train.png',
        'js/index.js',
        'js/jquery-3.1.0.min.js',
        'materialize/css/materialize.css',
        'materialize/css/materialize.min.css',
        'materialize/fonts/roboto/Roboto-Bold.ttf',
        'materialize/fonts/roboto/Roboto-Bold.woff2',
        'materialize/fonts/roboto/Roboto-Light.woff',
        'materialize/fonts/roboto/Roboto-Medium.ttf',
        'materialize/fonts/roboto/Roboto-Medium.woff2',
        'materialize/fonts/roboto/Roboto-Regular.woff',
        'materialize/fonts/roboto/Roboto-Thin.ttf',
        'materialize/fonts/roboto/Roboto-Thin.woff2',
        'materialize/fonts/roboto/Roboto-Bold.woff',
        'materialize/fonts/roboto/Roboto-Light.ttf',
        'materialize/fonts/roboto/Roboto-Light.woff2',
        'materialize/fonts/roboto/Roboto-Medium.woff',
        'materialize/fonts/roboto/Roboto-Regular.ttf',
        'materialize/fonts/roboto/Roboto-Regular.woff2',
        'materialize/fonts/roboto/Roboto-Thin.woff',
        'materialize/js/materialize.js',
        'materialize/js/materialize.min.js'

      ]);
    })

  );


});


// The fetch event happens for the page request with the
// ServiceWorker's scope, and any request made within that
// page
self.addEventListener('fetch', function(event) {
  // Calling event.respondWith means we're in charge
  // of providing the response. We pass in a promise
  // that resolves with a response object
  event.respondWith(
    // First we look for something in the caches that
    // matches the request
    caches.match(event.request).then(function(response) {
      // If we get something, we return it, otherwise
      // it's null, and we'll pass the request to
      // fetch, which will use the network.
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  var title = 'Hey, you stop is coming up soon!';
  var body = 'Get ready :)';
  var icon = 'images/logo.png';
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag
    })
  );
});


self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("/results.html"));
});
