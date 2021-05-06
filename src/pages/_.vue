<template>
	<component :is="type" :page="page" />
</template>

<script>
import startCase from "lodash/startCase";
import Seo, { titleDefault } from "~/lib/Seo";
import About from "~/components/Page/Type/About.vue";
import Project from "~/components/Page/Type/Project.vue";
import Talks from "~/components/Page/Type/Talk.vue";
import Default from "~/components/Page/Type/Default.vue";

export default {
	layout({ params }) {
		const [dir] = params.pathMatch.split("/");
		if (dir === "talks") return "slide";
		return "default";
	},

	async asyncData({ $content, params, error }) {
		const pathSplit = params.pathMatch.split("/")[1];
		const slug = `${pathSplit || "index"}`;
		const [page] = await $content({ deep: true }).where({ slug }).fetch();

		if (!page) {
			return error({ statusCode: 404 });
		}

		return { page };
	},
	head() {
		const { title, description, subtitle, thumbnail } = this.page;
		const { path } = this.$route;
		const pathParts = this.page.dir
			.split("/")
			.filter((part) => part.length > 0)
			.map(startCase);

		return Seo({
			title,
			titleTemplate: [
				"%s",
				...(pathParts.length > 0 ? pathParts : []),
				titleDefault,
			].join(" \\\\ "),
			description: description || subtitle,
			path,
			image: thumbnail,
		});
	},
	computed: {
		type() {
			const { dir, slug } = this.page;
			if (dir.includes("/talks/")) return Talks;
			if (dir === "/projects") return Project;
			if (dir === "/" && slug === "about") return About;
			return Default;
		},
	},
};
</script>
