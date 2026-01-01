<script setup lang="ts">
const sections = [
	{ name: "Profile", id: "profile", icon: "i-carbon-user-avatar" },
	{ name: "Projects", id: "projects", icon: "i-carbon-cube" },
	{ name: "Products", id: "products", icon: "i-carbon-shopping-cart" },
	{ name: "Shop", id: "shop", icon: "i-carbon-store" },
	{ name: "Blog", id: "blog", icon: "i-carbon-blog" },
];

const { activeSection } = useNavState();

const scrollTo = (id: string) => {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({ behavior: "smooth" });
	}
};
</script>

<template>
	<div class="sticky top-0 z-40 bg-gray-900/70 backdrop-blur-lg py-2 border-b border-gray-800 mb-8">
		<nav class="container mx-auto -mb-px flex space-x-6 overflow-x-auto">
			<a
				v-for="section in sections"
				:key="section.id"
				:href="`#${section.id}`"
				class="flex items-center gap-2 px-1 py-3 border-b-2 border-transparent text-gray-400 hover:text-white hover:border-gray-500 transition-colors whitespace-nowrap font-medium"
				:class="{ '!border-primary !text-primary': activeSection === section.id }"
				@click.prevent="scrollTo(section.id)"
			>
				<span :class="section.icon" class="text-xl"></span>
				<span>{{ section.name }}</span>
			</a>
		</nav>
	</div>
</template>
