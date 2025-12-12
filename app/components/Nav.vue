<script setup lang="ts">
import { useTheme } from "~/composables/theme";

const { toggleDark } = useTheme();
</script>

<template>
	<nav class="bg-card dark:bg-card-dark shadow-lg sticky top-0 z-50 border-b border-surface-200 dark:border-surface-200-dark backdrop-blur-md">
		<div class="container mx-auto px-6 py-4">
			<div class="flex items-center justify-between">
				<!-- Title - Clickable Logo -->
				<NuxtLink
					to="/"
					class="text-2xl font-bold text-primary dark:text-primary-dark tracking-tight hover:text-accent dark:hover:text-accent-dark transition-colors"
				>
					Wrikka
				</NuxtLink>

				<!-- Menu Items -->
				<div class="flex items-center gap-8">
					<NuxtLink
						to="/blog"
						class="text-secondary dark:text-secondary-dark hover:text-menu-blog transition-colors font-medium"
					>
						Blog
					</NuxtLink>
					<NuxtLink
						to="/projects"
						class="text-secondary dark:text-secondary-dark hover:text-menu-project transition-colors font-medium"
					>
						Project
					</NuxtLink>
					<a
						href="https://learn.wrikka.com/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-secondary dark:text-secondary-dark hover:text-menu-learn transition-colors font-medium flex items-center gap-1"
					>
						Learn
						<div class="i-mdi-open-in-new w-3 h-3" />
					</a>
				</div>

				<!-- Theme Toggle -->
				<button
					@click="toggleDark = !toggleDark"
					class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-100-dark transition-all duration-200 group"
					aria-label="Toggle dark mode"
				>
					<div class="i-mdi-white-balance-sunny dark:i-mdi-moon-waning-crescent w-5 h-5 text-secondary dark:text-secondary-dark group-hover:text-accent dark:group-hover:text-accent-dark group-hover:scale-110 transition-all" />
				</button>
			</div>
		</div>
	</nav>
</template>
