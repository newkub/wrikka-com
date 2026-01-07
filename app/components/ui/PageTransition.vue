<script setup lang="ts">
// Breadcrumb navigation for better UX
const route = useRoute();

const breadcrumbs = computed(() => {
	const pathSegments = route.path.split("/").filter(Boolean);
	const breadcrumbs = [
		{ name: "Home", path: "/" },
	];

	let currentPath = "";
	pathSegments.forEach(segment => {
		currentPath += `/${segment}`;
		const name = segment.charAt(0).toUpperCase() + segment.slice(1);
		breadcrumbs.push({
			name,
			path: currentPath,
		});
	});

	return breadcrumbs;
});

// Page transitions
const pageTransition = {
	name: "page",
	mode: "out-in",
	onBeforeEnter: (el: Element) => {
		(el as HTMLElement).style.opacity = "0";
		(el as HTMLElement).style.transform = "translateY(10px)";
	},
	onEnter: (el: Element, done: () => void) => {
		const element = el as HTMLElement;
		element.style.transition = "all 0.3s ease";
		element.style.opacity = "1";
		element.style.transform = "translateY(0)";
		setTimeout(done, 300);
	},
	onLeave: (el: Element, done: () => void) => {
		const element = el as HTMLElement;
		element.style.transition = "all 0.2s ease";
		element.style.opacity = "0";
		element.style.transform = "translateY(-10px)";
		setTimeout(done, 200);
	},
};
</script>

<template>
	<div class="space-y-4">
		<!-- Breadcrumbs -->
		<nav
			v-if="route.path !== '/'"
			aria-label="Breadcrumb navigation"
			class="flex items-center space-x-2 text-sm text-secondary dark:text-secondary-dark"
		>
			<template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
				<NuxtLink
					:to="crumb.path"
					class="hover:text-accent transition-colors"
					:class="{ 'text-accent font-medium': index === breadcrumbs.length - 1 }"
					:aria-current="index === breadcrumbs.length - 1 ? 'page' : undefined"
				>
					{{ crumb.name }}
				</NuxtLink>
				<Icon
					v-if="index < breadcrumbs.length - 1"
					name="mdi:chevron-right"
					class="w-4 h-4 text-tertiary"
					aria-hidden="true"
				/>
			</template>
		</nav>

		<!-- Page content with transition -->
		<NuxtPage v-bind="pageTransition" />
	</div>
</template>
