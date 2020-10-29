import path from "path";
import pkg from "./package.json";
import { createSitemapRoutes } from "./src/lib/Sitemap";

export default {
	env: {
		cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
	},
	target: "static",
	srcDir: "src",
	modern: process.env.NODE_ENV === "production",
	pageTransition: "fade",
	modules: [
		"@nuxt/content",
		"portal-vue/nuxt",
		"@nuxtjs/sitemap",
		"@nuxtjs/sentry",
	],
	plugins: ["~/plugins/elementQuery"],
	buildModules: [
		"@nuxtjs/pwa",
		"@nuxtjs/svg",
		["@nuxtjs/eslint-module", { fix: true }],
		["@nuxtjs/stylelint-module", { fix: true }],
	],
	build: {
		extend(config, { isDev }) {
			return {
				...config,
				...(isDev && { devtool: "source-?map" }),
			};
		},
	},
	content: {
		dir: path.resolve(__dirname, "content"),
	},
	pwa: {
		meta: {
			theme_color: "#95FF00",
		},
		manifest: {
			display: "browser",
		},
		workbox: {
			runtimeCaching: [
				{
					urlPattern: "https?://res.cloudinary.com/mrtnvh/.*",
					handler: "StaleWhileRevalidate",
				},
			],
		},
	},
	sitemap: {
		hostname: pkg.homepage,
		gzip: true,
		routes: createSitemapRoutes,
	},
	sentry: {
		lazy: true,
	},
	head: {
		script: [
			{
				async: true,
				defer: true,
				"data-domain": "mrtnvh.com",
				src: "https://plausible.io/js/plausible.js",
			},
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
	},
	css: ["normalize.css", "./assets/styles/app.css"],
};
