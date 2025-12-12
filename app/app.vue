<template>
	<div class="flex flex-col h-screen bg-surface dark:bg-surface-dark text-primary dark:text-primary-dark">
		<Nav />
		<main class="flex-1 overflow-auto">
			<NuxtPage />
		</main>
	</div>
</template>

<script setup lang="ts">
import { useDark } from "@vueuse/core";

// Prevent theme flash by applying theme immediately
useHead({
	script: [
		{
			innerHTML: `
        ;(function() {
          try {
            const stored = localStorage.getItem('wrikka-theme')
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            const theme = stored || (prefersDark ? 'dark' : 'light')
            
            // Apply theme immediately to prevent flash
            const html = document.documentElement
            if (theme === 'dark') {
              html.classList.add('dark')
              html.classList.remove('light')
              html.style.colorScheme = 'dark'
            } else {
              html.classList.add('light') 
              html.classList.remove('dark')
              html.style.colorScheme = 'light'
            }
            
            // Store the applied theme
            localStorage.setItem('wrikka-theme', theme)
          } catch (e) {
            // Fallback to dark theme if localStorage is not available
            document.documentElement.classList.add('dark')
            document.documentElement.style.colorScheme = 'dark'
          }
        })()
      `,
			type: "text/javascript",
		},
	],
	htmlAttrs: {
		style: "color-scheme: dark;", // Default to dark to prevent initial flash
	},
});

// Initialize dark mode with default to dark
const isDark = useDark({
	selector: "html",
	attribute: "class",
	valueDark: "dark",
	valueLight: "light",
	storageKey: "wrikka-theme",
	initialValue: "dark",
});

// Provide global access to theme toggle
provide("toggleTheme", () => {
	isDark.value = !isDark.value;
});
</script>
