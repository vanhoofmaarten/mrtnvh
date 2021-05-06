<template>
	<article id="talk" class="slide-wrapper">
		<header>
			<a href="../0"> A technical look at OpenAPI </a>
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://mrtnvh.com"
				>mrtnvh.com</a
			>
		</header>
		<main>
			<nuxt-content class="content" :document="activeSlide" />
		</main>
		<footer>
			<button v-if="activeSlideIndex !== 0" @click="handlePreviousSlide">
				Previous
			</button>
			<button
				v-if="activeSlideIndex !== slides.length"
				@click="handleNextSlide"
			>
				Next
			</button>
		</footer>
	</article>
</template>

<script>
import last from "lodash/last";
import mixins from "./mixins";

export default {
	mixins: [mixins],
	beforeRouteUpdate(to, from, next) {
		if (to.params.slideId) {
			this.activeSlideIndex = Number(to.params.slideId);
		}
		next();
	},
	data() {
		return {
			activeSlideIndex: 0,
		};
	},
	computed: {
		activeSlide() {
			return {
				...this.page,
				body: {
					...this.page.body,
					children: [this.slides[this.activeSlideIndex]],
				},
			};
		},
		slides() {
			return Object.freeze(
				this.page.body.children.filter(
					(child) => child.tag === "section",
				),
			);
		},
	},
	created() {
		this.activeSlideIndex =
			Number(last(this.$route.params.pathMatch.split("/"))) || 0;
	},
	mounted() {
		window.addEventListener("keydown", this.keyHandler);
	},
	beforeDestroy() {
		window.removeEventListener("keydown", this.keyHandler);
	},
	methods: {
		keyHandler(event) {
			if (event.keyCode === 37) {
				this.handlePreviousSlide();
			}
			if (event.keyCode === 39) {
				this.handleNextSlide();
			}
		},
		handleSlide(newIndex) {
			const { params, ...currentRoute } = this.$route;
			const oldPathMatch = params.pathMatch.split("/");
			if (this.activeSlideIndex > 0) oldPathMatch.pop();
			const pathMatch = (newIndex > 0
				? [...oldPathMatch, newIndex]
				: oldPathMatch
			).join("/");
			this.$router.push({ ...currentRoute, params: { pathMatch } });
		},
		handlePreviousSlide() {
			this.handleSlide(this.activeSlideIndex - 1);
		},
		handleNextSlide() {
			this.handleSlide(this.activeSlideIndex + 1);
		},
	},
};
</script>

<style lang="postcss" scoped>
.slide-wrapper {
	width: 100%;
	min-height: 100vh;
	display: grid;
	grid-template-columns: 1fr auto;
	letter-spacing: -0.01vw;
}

main,
.slide-wrapper::v-deep .nuxt-content-container,
.slide-wrapper::v-deep .content {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}

main {
	--font-size-base: 1.5vw;
	font-size: var(--font-size-base);
}

header {
	order: 2;
	writing-mode: vertical-rl;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	user-select: none;
	border-left: 1px solid var(--text-color);
	text-transform: uppercase;
	font-weight: var(--fat-font-weight);
	text-decoration: none;
	padding: 3rem 2rem;

	a {
		text-decoration: none;
	}
}

footer {
	position: absolute;
	bottom: 0;
	right: 3rem;
}
</style>
