const CACHE_NAME = "gojekpwa";
var urlsToCache = [
    "/",
    "/manifest.json",
    "/gojek-icon.png",
    "/gojek-icon-192x192.png",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/services.html",
    "/pages/contact.html",
    "/css/style.css",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/images/foto-gojek.jpg",
    "/images/gojek-1.jpg",
    "/images/gojek-2.jpg",
    "/images/gojek-3.jpg",
    "/images/gojek-4.jpg",
    "/images/gojek-5.jpg",
    "/images/gojek-map.jpg",
    "/images/goride_vertical.svg",
    "/images/gocar_vertical.svg",
    "/images/gosend_vertical.svg",
    "/images/gobox_vertical.svg",
    "/images/gofood_vertical.svg",
    "/images/gomed_vertical.svg",
    "/images/gomart_vertical.svg",
    "/images/gopay_vertical.svg",
    "/images/gobillsvertical.svg",
    "/images/gopoints_vertical.svg",
    "/images/paylater_vertical.svg",
    "/images/gopulsa_vertical.svg",
    "/images/golife_vertical.svg",
    "/images/gomassage_vertical.svg",
    "/images/goclean_vertical.svg",
    "/images/goplay_vertical.svg",
    "/images/gotix_vertical.svg",
    "/images/gobiz_vertical.svg",
    "/images/speed.svg",
    "/images/innovation.svg",
    "/images/social-impact.svg"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});