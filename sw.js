const cacheName = 'SvelteCache';
self.addEventListener('install', (e) => e.waitUntil(caches.open(cacheName)));
self.addEventListener('fetch', async (e) => {
    console.log({ url: e.request.url });
    if (e.request.url.startsWith('/assets')) {
        e.respondWith(
            caches.open(cacheName).then((cache) => {
                return cache.match(e.request).then((cachedResponse) => {
                    return (
                        cachedResponse ||
                        fetch(e.request.url).then((fetchedResponse) => {
                            cache.put(e.request, fetchedResponse.clone());
                            return fetchedResponse;
                        })
                    );
                });
            })
        );
    } else {
        return;
    }
});
