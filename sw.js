const cacheName = 'SvelteCache';
self.addEventListener('install', (e) => e.waitUntil(caches.open(cacheName)));
self.addEventListener('fetch', async (e) => {
    const { url } = e.request;
    const { pathname } = new URL(url);
    console.log({ pathname });
    if (pathname.startsWith('/assets')) {
        e.respondWith(
            caches.open(cacheName).then((cache) => {
                return cache.match(e.request).then((cachedResponse) => {
                    return (
                        cachedResponse ||
                        fetch(url).then((fetchedResponse) => {
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
