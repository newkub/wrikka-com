<script setup lang="ts">
const colorMode = useColorMode();
const [isMobileMenuOpen, toggleMobileMenu] = useToggle(false);

const navLinks = [
	{ to: "/", text: "Profile" },
	{ to: "/blog", text: "Blog" },
	{ to: "/projects", text: "Projects" },
	{ to: "/shop", text: "Shop" },
];

function toggleColorMode() {
	colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>

<template>
	<header class="sticky top-0 z-50 bg-surface/80 dark:bg-surface-dark/80 border-b border-surface-200 dark:border-surface-800 backdrop-blur-lg">
		<nav class="container mx-auto flex justify-between items-center p-4">
			<NuxtLink
				to="/"
				class="text-2xl font-bold text-primary dark:text-primary-dark"
			>Wrikka</NuxtLink>

			<!-- Desktop Menu -->
			<div class="hidden md:flex items-center gap-6">
				<NuxtLink
					v-for="link in navLinks"
					:key="link.to"
					:to="link.to"
					class="text-secondary hover:text-accent transition-colors font-medium"
					active-class="!text-accent"
				>{{ link.text }}</NuxtLink>
				<button
					@click="toggleColorMode"
					class="text-secondary hover:text-accent transition-colors cursor-pointer"
					aria-label="Toggle color mode"
				>
					<Icon
						v-if="colorMode.value === 'dark'"
						name="mdi:white-balance-sunny"
						class="text-xl"
					/>
					<Icon v-else name="mdi:weather-night" class="text-xl" />
				</button>
			</div>

			<!-- Mobile Menu Button -->
			<div class="md:hidden flex items-center">
				<button
					@click="toggleColorMode"
					class="text-secondary hover:text-accent transition-colors mr-4 cursor-pointer"
					aria-label="Toggle color mode"
				>
					<Icon
						v-if="colorMode.value === 'dark'"
						name="mdi:white-balance-sunny"
						class="text-xl"
					/>
					<Icon v-else name="mdi:weather-night" class="text-xl" />
				</button>
				<button
					@click="toggleMobileMenu()"
					class="text-secondary hover:text-accent"
					aria-label="Open menu"
				>
					<Icon name="mdi:menu" class="text-2xl" />
				</button>
			</div>
		</nav>

		<!-- Mobile Menu -->
		<div
			v-if="isMobileMenuOpen"
			class="md:hidden bg-surface/90 dark:bg-surface-dark/90 backdrop-blur-lg"
		>
			<div class="container mx-auto flex flex-col items-center gap-4 py-4">
				<NuxtLink
					v-for="link in navLinks"
					:key="link.to"
					:to="link.to"
					class="text-secondary hover:text-accent transition-colors text-lg"
					active-class="!text-accent font-semibold"
					@click="toggleMobileMenu(false)"
				>{{ link.text }}</NuxtLink>
			</div>
		</div>
	</header>
</template>
