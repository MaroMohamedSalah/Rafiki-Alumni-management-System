/* eslint-disable no-restricted-globals */
const CACHE_NAME = "FCAI-v2";
const assist = [
	"/",
	"/index.html",
	"../src/components/Backbtn.js",
	"./favicon.ico",
	"./icon-192x192.png",
	"./manifest.json",
	"../src/imgs/Alumni img.png",
	"../src/pages/AlumniSignup.js",
	"../src/pages/HRSignup.js",
	"../src/pages/CurrantStudentSignup.js",
	"../src/pages/AdminProfile.js",
	"../src/pages/HRprofile.js",
	"../src/pages/StudentProfile.js",
	"../src/pages/AlumniProfile.js",
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

// // fetch sw
// self.addEventListener("fetch", (fetchEvent) => {
// 	console.log("fetch done");
// 	fetchEvent.respondWith(
// 		caches
// 			.match(fetchEvent.request)
// 			.then((res) => {
// 				return (
// 					res ||
// 					fetch(fetchEvent.request)
// 						.then((fetchRes) => {
// 							if (!(fetchEvent.request.url.indexOf("http") === 0)) return;
// 							return caches.open(CACHE_NAME).then((cache) => {
// 								cache.put(fetchEvent.request, fetchRes.clone());
// 								return fetchRes;
// 							});
// 						})
// 						.catch((err) => {
// 							console.error("Error fetching:", err);
// 						})
// 				);
// 			})
// 			.catch((err) => {
// 				console.error("Error caching:", err);
// 			})
// 	);
// });
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
