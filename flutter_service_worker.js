'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "09e297535a8747787fda7c7f447fd071",
"assets/assets/images/charicoin.png": "d5941351abeac2fce4035317a50491c6",
"assets/assets/images/manager_logo.png": "bc2ea333031cf907ebf8eeba5f4c81b3",
"assets/assets/images/manager_logo_text.png": "cb255ac7042313b8fd6dff3d35095bf4",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "ea5664f00b9a531e118197e31ab3a53e",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flutter_google_places/assets/google_black.png": "97f2acfb6e993a0c4134d9d04dff21e2",
"assets/packages/flutter_google_places/assets/google_white.png": "40bc3ae5444eae0b9228d83bfd865158",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"icons/android-icon-144x144.png": "89a527f59ec8ee79841afb8eae2e0df2",
"icons/android-icon-192x192.png": "bb38626be1d8b3a950f73d409d9af250",
"icons/android-icon-36x36.png": "5a8162057bf0b50bc4e109e4460c6b10",
"icons/android-icon-48x48.png": "dcd6e796e0fb38b76ab121613d6d5b13",
"icons/android-icon-72x72.png": "3e33272ab320bf3ea30483d78add7316",
"icons/android-icon-96x96.png": "7b5c50443fbbf8feb3c8399fdbaff229",
"icons/apple-icon-114x114.png": "0d5cc9683e4625678871a5a2e7f97f1f",
"icons/apple-icon-120x120.png": "2741ce0a70d0942a66f9e1c617959aa6",
"icons/apple-icon-144x144.png": "89a527f59ec8ee79841afb8eae2e0df2",
"icons/apple-icon-152x152.png": "402354d8981ed06579a0530ba7d9564d",
"icons/apple-icon-180x180.png": "2dfcd79228b3bad29196902f918c8b67",
"icons/apple-icon-57x57.png": "f4de42e3a3f6eb3a94e9e58ca5e3f538",
"icons/apple-icon-60x60.png": "fd0939b78e47b84264d1d207b1661f9b",
"icons/apple-icon-72x72.png": "3e33272ab320bf3ea30483d78add7316",
"icons/apple-icon-76x76.png": "74f0f74d6c6d5353c81379b42a7ca417",
"icons/apple-icon-precomposed.png": "d48ce56ad5817c2ce48c73addfc228db",
"icons/apple-icon.png": "d48ce56ad5817c2ce48c73addfc228db",
"icons/browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"icons/favicon-16x16.png": "29081e7eb4592eb69a08a651f1e06ec3",
"icons/favicon-32x32.png": "bb0b7be8746478d9b4aa05a4279b600e",
"icons/favicon-96x96.png": "7b5c50443fbbf8feb3c8399fdbaff229",
"icons/favicon.ico": "e28c3ecb9b7c5364bab8f7471abcae84",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/manifest.json": "b58fcfa7628c9205cb11a1b2c3e8f99a",
"icons/ms-icon-144x144.png": "89a527f59ec8ee79841afb8eae2e0df2",
"icons/ms-icon-150x150.png": "429de3e50d5297dedcce52a0a394b11e",
"icons/ms-icon-310x310.png": "4ec1ad91bc95cb20895e78b1bf74728f",
"icons/ms-icon-70x70.png": "a9d671bc54611553a734d1536cbacf28",
"index.html": "5275a8286799ee36442e31d67c2a8f3c",
"/": "5275a8286799ee36442e31d67c2a8f3c",
"main.dart.js": "81237618b9a1cfb0f5aec556161da894",
"manifest.json": "24cf454e130d7ba44155e7378e6772b9",
"version.json": "a03299e865fec2d8483042f21e742661"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
