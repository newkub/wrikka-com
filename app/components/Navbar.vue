<script setup lang="ts">
import NavLink from "./primitive/NavLink.vue";
const route = useRoute();
const colorMode = useColorMode();

const navigation = [
	{ name: "Blog", path: "/blog", icon: "mdi:file-document-outline" },
	{ name: "Project", path: "/projects", icon: "mdi:folder-outline" },
	{ name: "Facebook", path: "/facebook", icon: "mdi:facebook" },
	{ name: "YouTube", path: "/youtube", icon: "mdi:youtube" },
	{ name: "X", path: "/x", icon: "mdi:twitter" },
	{ name: "Contact", path: "/contact", icon: "mdi:email-outline" },
];

const isActive = (path: string) => route.path === path;

const toggleTheme = () => {
	colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
	<nav class="sticky top-0 z-100 backdrop-blur-8px border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80">
		<div class="max-w-1200px mx-auto px-1.5rem py-1rem flex items-center justify-between gap-2rem md:px-1rem md:py-0.75rem md:gap-1rem">
			<div class="flex items-center">
				<NuxtLink
					to="/"
					class="flex items-center gap-0.5rem no-underline text-gray-900 dark:text-gray-100 transition-opacity-0.2s hover:opacity-80"
				>
					<Icon name="mdi:rocket-launch" class="w-1.5rem h-1.5rem" />
					<span class="font-600 text-1.25rem md:text-1.125rem">Wrikka</span>
				</NuxtLink>
			</div>

			<div class="hidden md:flex items-center gap-1.5rem">
				<NavLink
					v-for="item in navigation"
					:key="item.path"
					:to="item.path"
					:icon="item.icon"
					:active="isActive(item.path)"
				>
					{{ item.name }}
				</NavLink>
			</div>

			<div class="flex items-center gap-1rem md:hidden">
				<NavLink
					v-for="item in navigation"
					:key="item.path"
					:to="item.path"
					:icon="item.icon"
					:active="isActive(item.path)"
				>
					{{ item.name }}
				</NavLink>
			</div>

			<button
				type="button"
				@click="toggleTheme"
				class="flex items-center justify-center w-2.5rem h-2.5rem rounded-0.375rem transition-all-0.2s hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
				aria-label="Toggle theme"
			>
				<Icon
					:name="colorMode.value === 'dark'
					? 'mdi:weather-sunny'
					: 'mdi:weather-night'"
					class="w-1.25rem h-1.25rem"
				/>
			</button>
		</div>
	</nav>
</template>
