/* eslint-disable no-restricted-globals */
const CACHE_NAME = "FCAI-v4";
const assist = [
	"/",
	"/index.html",
	"../src/components/Backbtn.js",
	"./favicon.ico?time=" + Date.now(),
	"./icon-192x192.png?time=" + Date.now(),
	"./manifest.json?time=" + Date.now(),
	"../src/imgs/Alumni img.png?time=" + Date.now(),
	"../src/pages/AlumniSignup.js?time=" + Date.now(),
	"../src/pages/HRSignup.js?time=" + Date.now(),
	"../src/pages/CurrantStudentSignup.js?time=" + Date.now(),
	"../src/pages/AdminProfile.js?time=" + Date.now(),
	"../src/pages/HRprofile.js?time=" + Date.now(),
	"../src/pages/StudentProfile.js?time=" + Date.now(),
	"../src/pages/AlumniProfile.js?time=" + Date.now(),
];

// add assist in the caches
self.addEventListener("install", (event) => {
	console.log("installed");
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(assist))
			.catch((err) => console.log(err))
	);
});

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

				caches.open(CACHE_NAME).then(function (cache) {
					cache.put(event.request, responseToCache);
				});

				return response;
			});
		})
	);
});

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

// Activate sw
self.addEventListener("activate", function (event) {
	console.log("activated");
	event.waitUntil(
		caches.keys().then((cacheName1s) => {
			return Promise.all(
				cacheName1s.map((cache) => {
					if (CACHE_NAME !== cache && cache.startsWith("FCAI")) {
						// delete any old cache
						return caches.delete(cache);
					}
				})
			);
		})
	);
});
