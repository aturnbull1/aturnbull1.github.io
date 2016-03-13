importScripts('js/index.js');

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  'index.html',
  'css/materialize.min.css',
  'images/causeway.jpg',
  'images/resturant.jpg',
  'images/train.jpg',
  'images/boat.jpg',
  'images/titanic.jpg',
  'images/',
  'js/index.js',
  'data.json',
  'js/attractions.js',
  'attractions.html',
  'js/jquery-2.1.4.js',
  'restaurants.html',
  'js/restaurants.js',
  'attractiondetail.html',
  'js/attractionDetail.js',
  'font',
  'js/utils.js',
  'js/materialize.min.js',
  'report.html',
  'js/report.js',
  'images/pothole.jpg',
  'jquery.easyWizard.js',
  'report.html?'

];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );

});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request);
      }
    )
  );
});
