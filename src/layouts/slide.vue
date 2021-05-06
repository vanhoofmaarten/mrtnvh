<template>
	<Nuxt />
</template>

<script>
import Seo from "~/lib/Seo";
import pkg from "../../package.json";

export default {
	head() {
		return Seo({ siteUrl: pkg.homepage });
	},
};
</script>
