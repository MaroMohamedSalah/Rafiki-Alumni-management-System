const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = function override(config, env) {
	config.plugins.push(
		new WorkboxWebpackPlugin.InjectManifest({
			swSrc: "./src/sw.js",
			swDest: "sw.js",
		})
	);
	return config;
};
