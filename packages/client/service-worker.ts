const CACHE_NAME = 'cache-v-1'
const URLS = [
  '/',
  '/login',
  '/registration',
  '/profile',
  '/game',
  '/forum',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
]

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(URLS)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  )
})

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()
      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache)
        })
        return response
      })
    })
  )
})

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name)))
    })
  )
})
