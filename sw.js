const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];

//install
self.addEventListener('install', evt => {
    // console.log('service worker has been installed'); 
    evt.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                console.log('caching');
                cache.addAll(assets);
        })
    );
    
});

//activate
self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys()
            .then(keys => {
                console.log(keys);  //sd
            })
    );
});

//fetch
self.addEventListener('fetch', evt => {
    // console.log('fetch ', evt);
    evt.respondWith(
        caches.match(evt.request)
            .then(cacheRes => {
                return cacheRes || fetch(evt.request);
            })
    )
});