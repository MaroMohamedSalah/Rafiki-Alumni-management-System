/* eslint-disable no-restricted-globals */
const CACHE_VERSION = "FCAI-v17"; // Update the cache version whenever you make changes to the cache
const CACHE_NAME = CACHE_VERSION + "-static";

const staticAssets = [
	"./icon-192x192.png",
	"./icon-256x256.png",
	"./icon-384x384.png",
	"./icon-512x512.png",
	"./index.html",
	"./manifest.json",
];

// Precache static assets
self.addEventListener("install", (event) => {
	console.log("installed");
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(staticAssets))
			.catch((err) => console.log(err))
	);
});

// Fetch event handler
self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			// Cache hit - return response
			if (response) {
				return response;
			}

			// Clone the request
			var fetchRequest = event.request.clone();

			return fetch(fetchRequest).then(function (response) {
				// Check if we received a valid response
				if (!response || response.status !== 200 || response.type !== "basic") {
					return response;
				}

				// Clone the response
				var responseToCache = response.clone();

				// Open the cache and store the response
				caches.open(CACHE_NAME).then(function (cache) {
					cache.put(event.request, responseToCache);
				});

				return response;
			});
		})
	);
});

// Push event handler for notifications
self.addEventListener("push", function (event) {
	if (event.data) {
		showNotification(event.data.text());
	}
});

function showNotification(message) {
	self.registration.showNotification("My App", {
		body: message,
		icon: "/icon-192x192.png",
	});
}

// Activate event handler to clean up old caches
self.addEventListener("activate", function (event) {
	console.log("activated");
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cache.startsWith("FCAI-v") && cache !== CACHE_NAME) {
						// Delete any old cache
						return caches.delete(cache);
					}
				})
			);
		})
	);
});
