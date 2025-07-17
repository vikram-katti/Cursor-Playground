// Service Worker for GYG Supplier Dashboard
const CACHE_NAME = 'gyg-dashboard-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/data.js',
    '/demo.html',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js'
];

// Install Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .catch(function(error) {
                console.error('Service Worker: Error caching files', error);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
            .catch(function(error) {
                console.error('Service Worker: Fetch failed', error);
                // Return offline page or basic response
                return new Response('Offline - Please check your connection', {
                    status: 503,
                    statusText: 'Service Unavailable'
                });
            })
    );
});

// Handle errors
self.addEventListener('error', function(event) {
    console.error('Service Worker: Error', event.error);
});

// Handle unhandled promise rejections
self.addEventListener('unhandledrejection', function(event) {
    console.error('Service Worker: Unhandled promise rejection', event.reason);
});