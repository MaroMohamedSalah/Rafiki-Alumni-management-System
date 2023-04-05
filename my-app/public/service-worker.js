/* eslint-disable no-restricted-globals */
const CACHE_NAME = "my-app-cache";
const urlsToCache = [
	"/",
	"/index.html",
	"/manifest.json",
	// Add the URLs of your app's assets here
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then((response) => response || fetch(event.request))
	);
});
