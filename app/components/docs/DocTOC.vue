<script setup lang="ts">
import type { TOCItem } from "#shared/types/ui";

const props = defineProps<{
	content: string;
}>();

const tocItems = computed<TOCItem[]>(() => {
	if (!props.content) return [];

	const headingRegex = /^#{2,4}\s+(.+)$/gm;
	const items: TOCItem[] = [];
	let match;

	while ((match = headingRegex.exec(props.content)) !== null) {
		const text = match[1]?.trim() || "";
		const level = match[0]?.match(/^#+/)?.[0].length || 2;
		const id = text
			.toLowerCase()
			.replace(/[^\w\s-]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-");

		items.push({ id, text, level });
	}

	return items;
});

const activeId = ref<string>("");

onMounted(() => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeId.value = entry.target.id;
				}
			});
		},
		{ rootMargin: "-20% 0px -70% 0px" },
	);

	tocItems.value.forEach((item) => {
		const element = document.getElementById(item.id);
		if (element) {
			observer.observe(element);
		}
	});

	onUnmounted(() => {
		observer.disconnect();
	});
});

const scrollTo = (id: string) => {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({ behavior: "smooth" });
	}
};
</script>

<template>
	<aside class="fixed top-0 right-0 w-[280px] h-screen overflow-y-auto border-l border-border bg-background p-6 hidden xl:block">
		<div class="text-sm font-semibold text-foreground mb-4 pb-2 border-b border-border">
			On this page
		</div>
		<nav>
			<ul v-if="tocItems.length > 0" class="list-none p-0 m-0">
				<li
					v-for="item in tocItems"
					:key="item.id"
					:class="[
						'mb-1',
						item.level === 3 ? 'pl-4' : '',
						item.level === 4 ? 'pl-8' : '',
						{ 'text-primary font-medium': activeId === item.id },
					]"
				>
					<NavLink
						:to="`#${item.id}`"
						class="w-full text-left py-1.5 px-2 border-none bg-transparent text-sm text-muted-foreground cursor-pointer transition-all hover:text-foreground hover:bg-accent rounded"
						:class="{ 'text-primary font-medium': activeId === item.id }"
					>
						{{ item.text }}
					</NavLink>
				</li>
			</ul>
			<p v-else class="text-sm text-muted-foreground">No headings found</p>
		</nav>
	</aside>
</template>
