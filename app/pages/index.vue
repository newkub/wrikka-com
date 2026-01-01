<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";

const { activeSection } = useNavState();

const sectionIds = ["profile", "projects", "products", "shop", "blog"];
const sectionRefs = ref<Record<string, HTMLElement | null>>({});

sectionIds.forEach(id => {
	useIntersectionObserver(
		() => sectionRefs.value[id],
		([entry]) => {
			if (entry && entry.isIntersecting) {
				activeSection.value = id;
			}
		},
		{
			rootMargin: "-50% 0px -50% 0px",
			threshold: 0,
		},
	);
});

const setRef = (el: any, id: string) => {
	if (el) {
		sectionRefs.value[id] = el;
	}
};
</script>

<template>
	<div class="container mx-auto p-4 sm:p-6 lg:p-8">
		<div class="space-y-24">
			<section
				v-for="id in sectionIds"
				:key="id"
				:id="id"
				:ref="(el) => setRef(el, id)"
			>
				<component
					:is="`Sections${id.charAt(0).toUpperCase() + id.slice(1)}Section`"
				/>
			</section>
		</div>
	</div>
</template>
