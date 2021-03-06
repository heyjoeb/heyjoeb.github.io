"use strict";

console.log('WORKER: executing.');

/* A version number is useful when updating the worker logic,
   allowing you to remove outdated cache entries during the update.
*/
var version = 'v1::';

/* These resources will be downloaded and cached by the service worker
   during the installation process. If any resource fails to be downloaded,
   then the service worker won't be installed either.
*/
var offlineFundamentals = [
  '',
  'styles/main.css',
  'scripts/main.js',
  'scripts/vendor.js',
  'fonts/fontawesome-webfont.ttf',
  'images/marker-icon.png',
  'images/hoyoSoplador.jpg',
  'images/ubicacion.png',
  'images/intro.png',
  'images/img03.png',
  'images/img04.png',
  'images/img05.png',
  'images/img06.png',
  'images/img07.png',
  'images/img08.png',
  'images/img09.png',
  'images/img10.png',
  'images/img11.png',
  'images/icon-historico.png',
  'images/icon-cultura.png',
  'images/icon-bote.png',
  'images/icon-historia.png',
  'images/icon-catboat.png',
  'images/icon-pozos.png',
  'images/icon-fair.png',
  'images/icon-humedal.png',
  'images/icon-historico.png',
  'images/icon-recreacion.png',
  'images/icon-actividades.png',
  'images/icon-naturaleza.png',
  'images/icon-agua.png',
  'images/icon-freshwater-bay.png',
  'images/icon-freshwater-dam.png',
  'images/icon-softball-maracaibo.png',
  'images/icon-coliseo-black-sand-bay.png',
  'images/icon-casa-cultura-santa-isabel.png',
  'images/icon-casa-ludica.png',
  'images/icon-casa-musica.png',
  'images/icon-iglesia-catolica-central.png',
  'images/icon-iglesia-catolica-lazy-hill.png',
  'images/icon-iglesia-catolica-rocky-point.png',
  'images/icon-iglesia-bauista-central.png',
  'images/icon-iglesia-bautista-salt-creek.png',
  'images/icon-iglesia-bautista-rocky-point.png',
  'images/icon-iglesia-adventista-rocky-point.png',
  'images/icon-iglesia-bautista-bottom-house.png',
  'images/icon-iglesia-catolica-bottom-house.png',
  'images/icon-iglesia-catolica-santa-catalina.png',
  'images/icon-caballos-southwest-bay.png',
  'images/icon-fair-table-mountain.png',
  'images/icon-fair-table-old-town.png',
  'images/icon-fair-table-lazy-hill.png',
  'images/icon-fair-table-southwest-bay.png',
  'images/icon-southwest-bay.png',
  'images/icon-mancheel-bay.png',
  'images/icon-old-town.png',
  'images/icon-pesca-cayo-roncador.png',
  'images/icon-pesca-banco-serrana.png',
  'images/icon-pesca-banco-quitasueno.png',
  'images/icon-navegacion-catboats.png',
  'images/icon-manglar-santa-catalina.png',
  'images/icon-mcbean-lagoon.png',
  'images/icon-manglar-southwest-bay.png',
  'images/icon-the-peak.png',
  'images/icon-aeropuerto-el-embrujo.png',
  'images/icon-fuerte-warwick.png',
  'images/icon-constant-spring.png',
  'images/icon-velodia-well.png',
  'images/icon-simpson-well.png',
  'images/icon-lynval-well.png',
  'images/icon-jack-pond.png',
  'images/icon-big-pond.png',
  'images/icon-miss-kenny-pond.png',
  'images/icon-little-pond.png',
  'images/icon-manuel-pond.png',
  'images/icon-casa-cisterna.png',
  'images/icon-estadio-baseball.png',
  'images/icon-softball-sound-bay.png',
  'images/icon-ballfield-brooks-hill.png',
  'images/icon-coliseo-ginnie-bay.png',
  'images/icon-tamarind-tree-cultural-center.png',
  'images/icon-the-ranch.png',
  'images/icon-casa-cultura.png',
  'images/icon-primera-iglesia-bautista.png',
  'images/icon-iglesia-bautista-christian-mission.png',
  'images/icon-catedral-sagrada-familia.png',
  'images/icon-iglesia-catolica-san-luis.png',
  'images/icon-iglesia-adventista-la-loma.png',
  'images/icon-iglesia-adventista-san-luis.png',
  'images/icon-iglesia-adventista-septimo-dia.png',
  'images/icon-mezquita.png',
  'images/icon-horse-track.png',
  'images/icon-caballos-sound-bay.png',
  'images/icon-gallos-san-luis.png',
  'images/icon-fair-table-perry-hill.png',
  'images/icon-fair-table-orange-hill.png',
  'images/icon-fair-table-barrack.png',
  'images/icon-fair-table-schooner-bight.png',
  'images/icon-domino-primera-iglesia.png',
  'images/icon-domino-sarie-bay.png',
  'images/icon-spratt-bight.png',
  'images/icon-sound-bay.png',
  'images/icon-slave-hill.png',
  'images/icon-battle-alley.png',
  'images/icon-orange-hill.png',
  'images/icon-barrack.png',
  'images/icon-duppy-gully.png',
  'images/icon-schooner-bight.png',
  'images/icon-molienda-cana.png',
  'images/icon-pesca-cayo-bolivar.png',
  'images/icon-pesca-cayo-alburbeque.png',
  'images/icon-navegacion-schooner-bight.png',
  'images/icon-humedal-centro.png',
  'images/icon-humedal-san-luis.png',
  'images/icon-cueva-morgan.png',
  'images/icon-morris-landing-cave.png',
  'images/icon-the-cliff.png',
  'images/icon-cocoplum-bay.png',
  'images/icon-hooker-bay.png',
  'images/icon-aeropuerto-gustavo.png',
  'images/icon-hoyo-soplador.png',
  'images/icon-jardin-botanico-nacional.png',
  'images/icon-la-piscinita.png',
  'images/icon-centro-cultural-banco.png',
  'images/no-marker.png',
  'images/01constant-spring.png',
  'images/02velodia-well.png',
  'images/03simpson-well.png',
  'images/04lynvall-well.png',
  'images/05jack-pond.png',
  'images/06big-pond.png',
  'images/07miss-kenny-pond.png',
  'images/08little-pond.png',
  'images/09manuel-pond.png',
  'images/10casa-cisterna.png',
  'images/11estadio-baseball.png',
  'images/12softball-soundbay.png',
  'images/13ballfield-brooks-hill.png',
  'images/14coliseo-ginnie-bay.png',
  'images/15tamarind-tree.png',
  'images/16the-ranch.png',
  'images/17casa-cultura.png',
  'images/18primera-bautista.png',
  'images/19bautista-christian.png',
  'images/20catedral-sagrada.png',
  'images/21catolica-san-luis.png',
  'images/22adventista-la-loma.png',
  'images/23adventista-san-luis.png',
  'images/24adventista-septimo.png',
  'images/25mezquita.png',
  'images/26horse-track.png',
  'images/27caballos-sound-bay.png',
  'images/28gallos-san-luis.png',
  'images/29fair-table-perry-hill.png',
  'images/30fair-table-orange-hill.png',
  'images/31fair-table-barrack.png',
  'images/32fair-table-schooner-bight.png',
  'images/33domino-primera-bautista.png',
  'images/34domino-sarie-bay.png',
  'images/35spratt-bight.png',
  'images/36sound-bay.png',
  'images/37slave-hill.png',
  'images/38battle-alley.png',
  'images/39orange-hill.png',
  'images/40barrack.png',
  'images/41duppy-gully.png',
  'images/42schooner-bight.png',
  'images/43molienda.png',
  'images/44pesca-cayo-bolivar.png',
  'images/45pesca-cayo-alburbeque.png',
  'images/46navegacion-schooner.png',
  'images/47humedal-centro.png',
  'images/48humedal-san-luis.png',
  'images/49cueva-morgan.png',
  'images/50morris-landing-cave.png',
  'images/51the-cliff.png',
  'images/52cocoplum-bay.png',
  'images/53hooker-bay.png',
  'images/54aeropuerto-gustavo.png',
  'images/55hoyo-soplador.png',
  'images/56jardin-botanico-nacional.png',
  'images/57la-piscinita.png',
  'images/58centro-cultural-banco.png',
  'images/01freshwater-bay.png',
  'images/02freshwater-dam.png',
  'images/03softball-maracaibo.png',
  'images/04coliseo-black.png',
  'images/05cultura-santa-isabel.png',
  'images/06casa-ludica.png',
  'images/07casa-musica.png',
  'images/08catolica-central.png',
  'images/09catolica-lazy-hill.png',
  'images/10catolica-rocky-point.png',
  'images/11bautista-central.png',
  'images/12bautista-salt-creek.png',
  'images/13bautista-rocky-point.png',
  'images/14adventista-rocky-point.png',
  'images/15bautista-bottom-house.png',
  'images/16catolica-bottom-house.png',
  'images/17catolica-santa-catalina.png',
  'images/18caballos-southwest.png',
  'images/19fair-table-mountain.png',
  'images/20fair-table-old-town.png',
  'images/21fair-table-lazy-hill.png',
  'images/22fair-table-southwest-bay.png',
  'images/23southwest-bay.png',
  'images/24manchneel-bay.png',
  'images/25old-town.png',
  'images/26pesca-cayo-roncador.png',
  'images/27pesca-banco-serrana.png',
  'images/28pesca-banco-quitasueno.png',
  'images/29carreras-catboats.png',
  'images/30manglar-santa-catalina.png',
  'images/31mc-bean-lagoon.png',
  'images/32manglar-southwest-bay.png',
  'images/33the-peak.png',
  'images/34aeropuerto-embrujo.png',
  'images/35fuerte-warwick.png'
];

/* The install event fires when the service worker is first installed.
   You can use this event to prepare the service worker to be able to serve
   files while visitors are offline.
*/
self.addEventListener("install", function(event) {
  console.log('WORKER: install event in progress.');
  /* Using event.waitUntil(p) blocks the installation process on the provided
     promise. If the promise is rejected, the service worker won't be installed.
  */
  event.waitUntil(
    /* The caches built-in is a promise-based API that helps you cache responses,
       as well as finding and deleting them.
    */
    caches
      /* You can open a cache by name, and this method returns a promise. We use
         a versioned cache name here so that we can remove old cache entries in
         one fell swoop later, when phasing out an older service worker.
      */
      .open(version + 'fundamentals')
      .then(function(cache) {
        /* After the cache is opened, we can fill it with the offline fundamentals.
           The method below will add all resources in `offlineFundamentals` to the
           cache, after making requests for them.
        */
        return cache.addAll(offlineFundamentals);
      })
      .then(function() {
        console.log('WORKER: install completed');
      })
  );
});

/* The fetch event fires whenever a page controlled by this service worker requests
   a resource. This isn't limited to `fetch` or even XMLHttpRequest. Instead, it
   comprehends even the request for the HTML page on first load, as well as JS and
   CSS resources, fonts, any images, etc.
*/
self.addEventListener("fetch", function(event) {
  console.log('WORKER: fetch event in progress.');

  /* We should only cache GET requests, and deal with the rest of method in the
     client-side, by handling failed POST,PUT,PATCH,etc. requests.
  */
  if (event.request.method !== 'GET') {
    /* If we don't block the event as shown below, then the request will go to
       the network as usual.
    */
    console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
    return;
  }
  /* Similar to event.waitUntil in that it blocks the fetch event on a promise.
     Fulfillment result will be used as the response, and rejection will end in a
     HTTP response indicating failure.
  */
  event.respondWith(
    caches
      /* This method returns a promise that resolves to a cache entry matching
         the request. Once the promise is settled, we can then provide a response
         to the fetch request.
      */
      .match(event.request)
      .then(function(cached) {
        /* Even if the response is in our cache, we go to the network as well.
           This pattern is known for producing "eventually fresh" responses,
           where we return cached responses immediately, and meanwhile pull
           a network response and store that in the cache.

           Read more:
           https://ponyfoo.com/articles/progressive-networking-serviceworker
        */
        var networked = fetch(event.request)
          // We handle the network request with success and failure scenarios.
          .then(fetchedFromNetwork, unableToResolve)
          // We should catch errors on the fetchedFromNetwork handler as well.
          .catch(unableToResolve);

        /* We return the cached response immediately if there is one, and fall
           back to waiting on the network as usual.
        */
        console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
        return cached || networked;

        function fetchedFromNetwork(response) {
          /* We copy the response before replying to the network request.
             This is the response that will be stored on the ServiceWorker cache.
          */
          var cacheCopy = response.clone();

          console.log('WORKER: fetch response from network.', event.request.url);

          caches
            // We open a cache to store the response for this request.
            .open(version + 'pages')
            .then(function add(cache) {
              /* We store the response for this request. It'll later become
                 available to caches.match(event.request) calls, when looking
                 for cached responses.
              */
              cache.put(event.request, cacheCopy);
            })
            .then(function() {
              console.log('WORKER: fetch response stored in cache.', event.request.url);
            });

          // Return the response so that the promise is settled in fulfillment.
          return response;
        }

        /* When this method is called, it means we were unable to produce a response
           from either the cache or the network. This is our opportunity to produce
           a meaningful response even when all else fails. It's the last chance, so
           you probably want to display a "Service Unavailable" view or a generic
           error response.
        */
        function unableToResolve () {
          /* There's a couple of things we can do here.
             - Test the Accept header and then return one of the `offlineFundamentals`
               e.g: `return caches.match('/some/cached/image.png')`
             - You should also consider the origin. It's easier to decide what
               "unavailable" means for requests against your origins than for requests
               against a third party, such as an ad provider.
             - Generate a Response programmaticaly, as shown below, and return that.
          */

          console.log('WORKER: fetch request failed in both cache and network.');

          /* Here we're creating a response programmatically. The first parameter is the
             response body, and the second one defines the options for the response.
          */
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
      })
  );
});

/* The activate event fires after a service worker has been successfully installed.
   It is most useful when phasing out an older version of a service worker, as at
   this point you know that the new worker was installed correctly. In this example,
   we delete old caches that don't match the version in the worker we just finished
   installing.
*/
self.addEventListener("activate", function(event) {
  /* Just like with the install event, event.waitUntil blocks activate on a promise.
     Activation will fail unless the promise is fulfilled.
  */
  console.log('WORKER: activate event in progress.');

  event.waitUntil(
    caches
      /* This method returns a promise which will resolve to an array of available
         cache keys.
      */
      .keys()
      .then(function (keys) {
        // We return a promise that settles when all outdated caches are deleted.
        return Promise.all(
          keys
            .filter(function (key) {
              // Filter by keys that don't start with the latest version prefix.
              return !key.startsWith(version);
            })
            .map(function (key) {
              /* Return a promise that's fulfilled
                 when each outdated cache is deleted.
              */
              return caches.delete(key);
            })
        );
      })
      .then(function() {
        console.log('WORKER: activate completed.');
      })
  );
});
