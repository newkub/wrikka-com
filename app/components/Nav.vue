<script setup lang="ts">
const colorMode = useColorMode();

function toggleColorMode() {
	colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>

<template>
	<nav class="p-4 bg-surface-100 border-b border-surface-200">
		<div class="container mx-auto flex justify-between items-center">
			<NuxtLink
				to="/"
				class="text-primary text-xl font-bold"
			>Wrikka</NuxtLink>
			<div class="flex gap-4 items-center">
				<NuxtLink
					to="/"
					class="text-secondary hover:text-primary transition-colors"
					active-class="text-primary"
				>Home</NuxtLink>
				<NuxtLink
					to="/blog"
					class="text-secondary hover:text-primary transition-colors"
					active-class="text-primary"
				>Blog</NuxtLink>
				<NuxtLink
					to="/projects"
					class="text-secondary hover:text-primary transition-colors"
					active-class="text-primary"
				>Projects</NuxtLink>
				<NuxtLink
					to="/products"
					class="text-secondary hover:text-primary transition-colors"
					active-class="text-primary"
				>Products</NuxtLink>
				<button
					@click="toggleColorMode"
					class="text-secondary hover:text-primary"
				>
					<Icon
						v-if="colorMode.value === 'dark'"
						name="mdi:weather-sunny"
						size="20"
					/>
					<Icon v-else name="mdi:weather-night" size="20" />
				</button>
			</div>
		</div>
	</nav>
</template>
