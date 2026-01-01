<script setup lang="ts">
const colorMode = useColorMode();
const [isMobileMenuOpen, toggleMobileMenu] = useToggle(false);

const navLinks = [
	{ to: "/", text: "Home" },
	{ to: "/blog", text: "Blog" },
	{ to: "/projects", text: "Projects" },
	{ to: "/products", text: "Products" },
];

function toggleColorMode() {
	colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>

<template>
	<header class="sticky top-0 z-50 bg-gray-900/70 border-b border-gray-800 backdrop-blur-lg">
		<nav class="container mx-auto flex justify-between items-center p-4">
			<NuxtLink to="/" class="text-2xl font-bold text-white">Wrikka</NuxtLink>

			<!-- Desktop Menu -->
			<div class="hidden md:flex items-center gap-6">
				<NuxtLink
					v-for="link in navLinks"
					:key="link.to"
					:to="link.to"
					class="text-gray-400 hover:text-white transition-colors font-medium"
					active-class="!text-primary"
				>{{ link.text }}</NuxtLink>
				<button
					@click="toggleColorMode"
					class="text-gray-400 hover:text-white transition-colors"
					aria-label="Toggle color mode"
				>
					<span
						v-if="colorMode.value === 'dark'"
						class="i-carbon-sun text-xl"
					></span>
					<span v-else class="i-carbon-moon text-xl"></span>
				</button>
			</div>

			<!-- Mobile Menu Button -->
			<div class="md:hidden flex items-center">
				<button
					@click="toggleColorMode"
					class="text-gray-400 hover:text-white transition-colors mr-4"
					aria-label="Toggle color mode"
				>
					<span
						v-if="colorMode.value === 'dark'"
						class="i-carbon-sun text-xl"
					></span>
					<span v-else class="i-carbon-moon text-xl"></span>
				</button>
				<button
					@click="toggleMobileMenu()"
					class="text-gray-400 hover:text-white"
					aria-label="Open menu"
				>
					<span class="i-carbon-menu text-2xl"></span>
				</button>
			</div>
		</nav>

		<!-- Mobile Menu -->
		<div
			v-if="isMobileMenuOpen"
			class="md:hidden bg-gray-900/90 backdrop-blur-lg"
		>
			<div class="container mx-auto flex flex-col items-center gap-4 py-4">
				<NuxtLink
					v-for="link in navLinks"
					:key="link.to"
					:to="link.to"
					class="text-gray-300 hover:text-white transition-colors text-lg"
					active-class="!text-primary font-semibold"
					@click="toggleMobileMenu(false)"
				>{{ link.text }}</NuxtLink>
			</div>
		</div>
	</header>
</template>
