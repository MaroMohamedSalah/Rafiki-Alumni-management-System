importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

workbox.setConfig({
	debug: false,
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
	({ url }) => url.origin === "https://yourdomain.com",
	new workbox.strategies.NetworkFirst()
);
