<script setup lang="ts">
const route = useRoute();

const tabs = [
	{ name: "Profile", path: "/profile", icon: "i-carbon-user-avatar" },
	{ name: "Projects", path: "/projects", icon: "i-carbon-cube" },
	{ name: "Products", path: "/products", icon: "i-carbon-shopping-cart" },
	{ name: "Blog", path: "/blog", icon: "i-carbon-blog" },
];

const isTabActive = (tabPath: string) => {
	if (tabPath === "/profile") return route.path === tabPath;
	return route.path.startsWith(tabPath);
};
</script>

<template>
	<div class="border-b border-gray-800 mb-8">
		<nav class="-mb-px flex space-x-6 overflow-x-auto">
			<NuxtLink
				v-for="tab in tabs"
				:key="tab.path"
				:to="tab.path"
				class="flex items-center gap-2 px-1 py-3 border-b-2 border-transparent text-gray-400 hover:text-white hover:border-gray-500 transition-colors whitespace-nowrap font-medium"
				:class="{ '!border-primary !text-primary': isTabActive(tab.path) }"
			>
				<span :class="tab.icon" class="text-xl"></span>
				<span>{{ tab.name }}</span>
			</NuxtLink>
		</nav>
	</div>
</template>
