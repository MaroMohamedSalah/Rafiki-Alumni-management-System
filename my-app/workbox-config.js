module.exports = {
	globDirectory: "build/",
	globPatterns: ["**/*.{js,css,html,png,jpg,gif,json,svg}"],
	swDest: "build/sw.js",
	runtimeCaching: [
		{
			urlPattern: /^https:\/\/my-api\.com/,
			handler: "StaleWhileRevalidate",
			options: {
				cacheName: "api-cache",
			},
		},
	],
};
