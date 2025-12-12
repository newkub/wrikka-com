<script setup lang="ts">
import { useStory } from "~/composables/story";

// Initialize the story composable to make it available for components
useStory();

// SEO Meta
useHead({
	title: "Wrikka | Full-Stack Developer",
	meta: [
		{
			name: "description",
			content: "Full-Stack Developer ที่หลงใหลในการสร้างสรรค์เว็บไซต์และแอปพลิเคชัน",
		},
		{ property: "og:title", content: "Wrikka | Full-Stack Developer" },
		{
			property: "og:description",
			content: "Full-Stack Developer ที่หลงใหลในการสร้างสรรค์เว็บไซต์และแอปพลิเคชัน",
		},
	],
});
</script>

<template>
	<div class="h-full bg-surface dark:bg-surface-dark relative overflow-hidden">
		<!-- Background decoration -->
		<div class="absolute inset-0 opacity-5 dark:opacity-10">
			<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse">
			</div>
			<div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-menu-learn rounded-full blur-3xl animate-pulse delay-1000">
			</div>
			<div class="absolute top-3/4 left-1/2 w-64 h-64 bg-menu-project rounded-full blur-3xl animate-pulse delay-2000">
			</div>
		</div>

		<!-- Main Content Container -->
		<div class="relative z-10 w-full max-w-6xl mx-auto px-6 h-full flex items-center">
			<div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start min-h-[600px]">
				<!-- Left Column - Profile Info -->
				<HomeProfileCard />

				<!-- Right Column - About Me -->
				<HomeAboutMe />
			</div>
		</div>

		<!-- Instagram Style Story Modal -->
		<StoryModal />
	</div>
</template>
