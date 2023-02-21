var cacheName = "afterschool-v1"
var cacheFiles = [
    'index.html',
    'lessons.js',
    'afterschool.webmanifest',
    'assets/book.png',
    'assets/clapperboard.png',
    'assets/coding.png',
    'assets/cooking.png',
    'assets/dance.png',
    'assets/education1.png',
    'assets/education2.png',
    'assets/idea.png',
    'assets/knitting.png',
    'assets/musical-note.png',
    'assets/pottery.png',
    'assets/science.png',
    'assets/singing.png'
    
]

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install')
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files')
            return cache.addAll(cacheFiles)
        })
    )
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then( function (r) {
            console.log('[Service Worker] Fetch resource' + e.request.url)
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone())
                    return response
                })
            })
        })
    )
    
})