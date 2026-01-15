<script setup lang="ts">
interface Heading {
	id: string
	text: string
	level: number
}

const props = defineProps<{
	content: string
}>()

const headings = ref<Heading[]>([])

const extractHeadings = () => {
	const parser = new DOMParser()
	const doc = parser.parseFromString(props.content, "text/html")
	const headingElements = doc.querySelectorAll("h2, h3, h4")

	headings.value = Array.from(headingElements).map((el) => ({
		id: el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
		text: el.textContent || "",
		level: el.tagName && el.tagName[1] ? parseInt(el.tagName[1]) : 2,
	}))
}

const activeHeading = ref<string>("")

onMounted(() => {
	extractHeadings()

	// Set up scroll spy using IntersectionObserver
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeHeading.value = entry.target.id
				}
			})
		},
		{
			rootMargin: "-20% 0% -70% 0%",
		},
	)

	// Observe headings after they're rendered
	nextTick(() => {
		document.querySelectorAll("h2, h3, h4").forEach((heading) => {
			observer.observe(heading)
		})
	})

	onUnmounted(() => {
		observer.disconnect()
	})
})

watch(() => props.content, () => {
	extractHeadings()
}, { immediate: true })

const scrollToHeading = (id: string) => {
	if (!id) return
	const element = document.getElementById(id)
	if (element) {
		element.scrollIntoView({ behavior: "smooth" })
	}
}
</script>

<template>
	<div v-if="headings.length > 0" class="table-of-contents">
		<h3 class="text-1rem font-600 mb-1rem text-gray-900 dark:text-gray-100 flex items-center gap-0.5rem">
			<Icon name="mdi:table-of-contents" class="w-1rem h-1rem" />
			Table of Contents
		</h3>
		<nav class="space-y-0.5rem">
			<a
				v-for="heading in headings"
				:key="heading.id"
				:href="`#${heading.id}`"
				@click.prevent="scrollToHeading(heading.id)"
				class="block text-0.875rem no-underline transition-all-0.2s hover:text-blue-600 dark:hover:text-blue-400"
				:class="[
					'text-gray-600 dark:text-gray-400',
					{
						'text-blue-600 dark:text-blue-400 font-600': activeHeading === heading.id,
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
