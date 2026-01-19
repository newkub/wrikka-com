<script setup lang="ts">
interface Heading {
	id: string;
	text: string;
	level: number;
}

const props = defineProps<{
	content: string;
}>();

const headings = ref<Heading[]>([]);

const excludedHeadings = [
	"Code Splitting และ Lazy Loading",
	"การใช้ useFetch อย่างมีประสิทธิภาพ",
	"Bundle Analysis และ Optimization ใน `nuxt.config.ts`:",
	"Preloading และ Prefetching",
	"Caching Strategies",
	"Performance Monitoring",
	"CSS Optimization",
];

const extractHeadings = () => {
	if (!props.content) {
		headings.value = [];
		return;
	}

	// Extract headings from markdown using regex
	const headingRegex = /^(#{2,4})\s+(.+)$/gm;
	const matches = Array.from(props.content.matchAll(headingRegex));

	headings.value = matches
		.map((match) => {
			const level = match[1]?.length || 2; // ## = 2, ### = 3, #### = 4
			const text = match[2]?.trim() || "";
			const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
			return { id, text, level };
		})
		.filter((heading) => !excludedHeadings.includes(heading.text));
};

const activeHeading = ref<string>("");

onMounted(() => {
	extractHeadings();

	// Set up scroll spy using IntersectionObserver
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeHeading.value = entry.target.id;
				}
			});
		},
		{
			rootMargin: "-20% 0% -70% 0%",
			threshold: [0, 0.5, 1],
		},
	);

	// Observe headings after they're rendered
	nextTick(() => {
		document.querySelectorAll("h2, h3, h4").forEach((heading) => {
			observer.observe(heading);
		});
	});

	onUnmounted(() => {
		observer.disconnect();
	});
});

watch(() => props.content, () => {
	extractHeadings();
}, { immediate: true });

const scrollToHeading = (id: string) => {
	if (!id) return;
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({ behavior: "smooth" });
		// Update URL hash without jumping
		history.replaceState(null, "", `#${id}`);
	}
};
</script>

<template>
	<div v-if="headings.length > 0" class="table-of-contents">
		<h3 class="text-1rem font-600 mb-1rem text-foreground flex items-center gap-0.5rem">
			<Icon name="mdi:table-of-contents" class="w-1rem h-1rem" />
			Table of Contents
		</h3>
		<nav class="space-y-0.5rem">
			<a
				v-for="heading in headings"
				:key="heading.id"
				:href="`#${heading.id}`"
				@click.prevent="scrollToHeading(heading.id)"
				class="block text-0.875rem no-underline transition-all-0.2s hover:text-primary"
				:class="[
					'text-muted-foreground',
					{
						'text-primary font-600': activeHeading === heading.id,
						'pl-0': heading.level === 2,
						'pl-1rem': heading.level === 3,
						'pl-2rem': heading.level === 4,
					},
				]"
			>
				{{ heading.text }}
			</a>
		</nav>
	</div>
</template>


