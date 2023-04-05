const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
	// ...
	plugins: [
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
		}),
	],
};
