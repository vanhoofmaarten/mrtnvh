<template>
	<article id="project" class="container">
		<header>
			<div class="sticky">
				<h1 class="title outline">{{ page.title }}</h1>
				<div class="subtitle">{{ page.subtitle }}</div>
			</div>
		</header>
		<figure class="media">
			<Thumbnail
				:src="page.thumbnail"
				:alt="page.title"
				class="image"
				width="1600"
				height="900"
			/>
		</figure>
		<div :class="['body']">
			<nuxt-content :document="page" />
		</div>
	</article>
</template>

<script>
import mixins from "./mixins";
import Image from "~/components/Image/Image.vue";

export default {
	components: {
		Thumbnail: Image,
	},

	mixins: [mixins],
};
</script>

<style scoped>
.container {
	padding-top: var(--grid-gap-y);
	padding-bottom: var(--grid-gap-y);
	display: flex;
	flex-direction: column;

	@media (min-width: 800px) {
		display: grid;
		grid-template-columns: 30.5% 69.5%;
		grid-template-areas: "header media" "header body";
		grid-column-gap: var(--grid-gap-x);
		width: calc(100% - (var(--grid-gap-x)));
	}
}

header {
	grid-area: header;
	margin-bottom: var(--grid-gap-y);

	@media (max-width: 799px) {
		order: 2;
		margin-top: calc(var(--grid-gap) * -2.5);
		margin-left: var(--grid-gap);
	}
}

.sticky {
	position: sticky;
	z-index: var(--project-header-zindex);
	top: var(--project-header-top-position);
}

.title {
	font-size: var(--project-title-size);
	margin: var(--project-title-margin);
	text-transform: uppercase;
	line-height: 0.66em;
}

.media {
	grid-area: media;

	@media (max-width: 799px) {
		order: 1;
	}
}

.body {
	grid-area: body;
	order: 3;
}
</style>
