<script setup lang="ts">
const colorMode = useColorMode();

function toggleColorMode() {
	colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>

<template>
	<nav class="p-4 bg-surface-100 dark:bg-surface-100-dark border-b border-surface-200 dark:border-surface-200-dark">
		<div class="container mx-auto flex justify-between items-center">
			<NuxtLink
				to="/"
				class="text-primary dark:text-primary-dark text-xl font-bold"
			>Wrikka</NuxtLink>
			<div class="flex gap-4 items-center">
				<NuxtLink
					to="/"
					class="text-secondary dark:text-secondary-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
					active-class="text-primary dark:text-primary-dark"
				>Home</NuxtLink>
				<NuxtLink
					to="/blog"
					class="text-secondary dark:text-secondary-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
					active-class="text-primary dark:text-primary-dark"
				>Blog</NuxtLink>
				<NuxtLink
					to="/projects"
					class="text-secondary dark:text-secondary-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
					active-class="text-primary dark:text-primary-dark"
				>Projects</NuxtLink>
				<NuxtLink
					to="/products"
					class="text-secondary dark:text-secondary-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
					active-class="text-primary dark:text-primary-dark"
				>Products</NuxtLink>
				<button
					@click="toggleColorMode"
					class="text-secondary dark:text-secondary-dark hover:text-primary dark:hover:text-primary-dark"
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
