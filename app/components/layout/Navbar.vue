<script setup lang="ts">
const route = useRoute();
const colorMode = useColorMode();

const navigation = [
	{ name: "Blog", path: "/blog", icon: "mdi:file-document-outline" },
	{ name: "Docs", path: "/docs", icon: "mdi:book-open-variant-outline" },
	{ name: "Project", path: "/projects", icon: "mdi:folder-outline" },
	{ name: "Course", path: "/course", icon: "mdi:school-outline" },
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
	<nav class="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
		<div class="max-w-1200px mx-auto px-1.5rem py-1rem flex items-center justify-between gap-2rem md:px-1rem md:py-0.75rem md:gap-1rem">
			<div class="flex items-center">
				<NuxtLink
					to="/"
					class="flex items-center gap-0.5rem no-underline text-foreground transition-opacity-0.2s hover:opacity-80"
				>
					<Icon name="mdi:rocket-launch" class="w-1.5rem h-1.5rem" />
					<span class="font-600 text-1.25rem md:text-1.125rem">Wrikka</span>
				</NuxtLink>
			</div>

			<div class="hidden md:flex items-center gap-1.5rem">
				<PrimitiveNavLink
					v-for="item in navigation"
					:key="item.path"
					:to="item.path"
					:icon="item.icon"
					:active="isActive(item.path)"
				>
					{{ item.name }}
				</PrimitiveNavLink>
			</div>

			<div class="flex items-center gap-1rem md:hidden">
				<PrimitiveNavLink
					v-for="item in navigation"
					:key="item.path"
					:to="item.path"
					:icon="item.icon"
					:active="isActive(item.path)"
				>
					{{ item.name }}
				</PrimitiveNavLink>
			</div>

			<button
				type="button"
				@click="toggleTheme"
				class="flex items-center justify-center w-2.5rem h-2.5rem rounded-0.375rem transition-all-0.2s hover:bg-muted text-foreground"
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


