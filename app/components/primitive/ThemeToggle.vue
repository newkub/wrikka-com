<script setup lang="ts">
import { useTheme } from '~/composables/core/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
	<button
		@click="toggleTheme"
		class="flex items-center justify-center w-9 h-9 border-none bg-accent text-foreground rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground"
		:title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
		aria-label="Toggle theme"
	>
		<Icon v-if="isDark" name="mdi:weather-sunny" size="20" />
		<Icon v-else name="mdi:weather-night" size="20" />
	</button>
</template>


