const cacheName = 'SveltyCache';
self.addEventListener('install', (e) => e.waitUntil(caches.open(cacheName)));
self.addEventListener('fetch', async (e) => {
    const { url } = e.request;
    const { pathname } = new URL(url);
    if (pathname.startsWith('/assets')) {
        e.respondWith(
            caches.open(cacheName).then((cache) =>
                cache.match(e.request).then((cached) => {
                    if (cached) return cached;
                    return fetch(url).then((fetched) => {
                        cache.put(e.request, fetched.clone());
                        return fetched;
                    });
                })
            )
        );
    } else {
        return;
    }
});
