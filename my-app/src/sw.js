import { Workbox } from "workbox-window";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

const serviceWorker = () => {
	if ("serviceWorker" in navigator) {
		const wb = new Workbox("/sw.js");

		wb.addEventListener("installed", (event) => {
			if (event.isUpdate) {
				console.log("A new version has been installed.");
			} else {
				console.log("The Service Worker is installed for the first time.");
			}
		});

		wb.register();

		registerRoute(
			/\.(?:js|css|png|jpg|jpeg|gif|svg)$/,
			new CacheFirst({
				cacheName: "static-assets",
				plugins: [
					new ExpirationPlugin({
						maxEntries: 100,
						maxAgeSeconds: 30 * 24 * 60 * 60, // cache for 30 days
					}),
				],
			})
		);
	}
};

export default serviceWorker;
