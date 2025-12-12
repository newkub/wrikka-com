<script setup lang="ts">
import { useStory } from "~/composables/story";

const { openStory } = useStory();

const techStack = [
	{ name: "Vue.js", icon: "i-mdi-vuejs", color: "text-tech-vue" },
	{ name: "Nuxt.js", icon: "i-mdi-nuxt", color: "text-tech-nuxt" },
	{
		name: "TypeScript",
		icon: "i-mdi-language-typescript",
		color: "text-tech-typescript",
	},
	{ name: "Node.js", icon: "i-mdi-nodejs", color: "text-tech-nodejs" },
	{ name: "Python", icon: "i-mdi-language-python", color: "text-tech-python" },
	{ name: "PostgreSQL", icon: "i-mdi-database", color: "text-tech-database" },
];

const socialLinks = [
	{
		name: "GitHub",
		icon: "i-mdi-github",
		href: "#",
		color: "hover:text-social-github dark:hover:text-social-github-dark",
	},
	{
		name: "Twitter",
		icon: "i-mdi-twitter",
		href: "#",
		color: "hover:text-social-twitter",
	},
	{
		name: "LinkedIn",
		icon: "i-mdi-linkedin",
		href: "#",
		color: "hover:text-social-linkedin",
	},
];
</script>

<template>
	<div class="space-y-8">
		<!-- Avatar & Profile -->
		<div class="text-center lg:text-left">
			<!-- Avatar -->
			<div
				class="w-32 h-32 mx-auto lg:mx-0 mb-6 relative cursor-pointer"
				@click="openStory"
			>
				<div class="w-full h-full bg-gradient-to-br from-accent to-menu-project rounded-full p-1 shadow-2xl hover:shadow-accent/20 transition-all duration-300">
					<div class="w-full h-full bg-surface dark:bg-surface-dark rounded-full flex items-center justify-center">
						<div class="i-mdi-account w-16 h-16 text-accent dark:text-accent-dark" />
					</div>
				</div>
				<div class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-surface dark:border-surface-dark">
				</div>
			</div>

			<!-- Name & Title -->
			<h1 class="text-4xl md:text-5xl font-bold text-primary dark:text-primary-dark mb-3">
				Wrikka
			</h1>
			<p class="text-xl text-secondary dark:text-secondary-dark mb-6">
				Full-Stack Developer & Creator
			</p>
		</div>

		<!-- Tech Stack -->
		<div class="space-y-6">
			<h3 class="text-2xl font-bold text-primary dark:text-primary-dark flex items-center gap-3">
				<div class="i-mdi-code-tags w-6 h-6 text-accent dark:text-accent-dark" />
				เทคโนโลยีที่ใช้
			</h3>
			<!-- Horizontal tags -->
			<div class="flex flex-wrap gap-3">
				<div
					v-for="tech in techStack"
					:key="tech.name"
					class="flex items-center gap-2 px-4 py-2 bg-surface-100 dark:bg-surface-100-dark rounded-full border border-surface-200 dark:border-surface-200-dark hover:border-accent dark:hover:border-accent-dark hover:shadow-md transition-all duration-200 group cursor-pointer"
				>
					<div
						:class="[tech.icon, tech.color]"
						class="w-5 h-5 group-hover:scale-110 transition-transform"
					/>
					<span
						class="text-sm font-medium text-secondary dark:text-secondary-dark"
					>{{ tech.name }}</span>
				</div>
			</div>
		</div>

		<!-- Social Links -->
		<div class="space-y-4">
			<h3 class="text-xl font-bold text-primary dark:text-primary-dark">
				ติดตามผม
			</h3>
			<div class="flex gap-4">
				<a
					v-for="social in socialLinks"
					:key="social.name"
					:href="social.href"
					class="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-100 dark:bg-surface-100-dark text-secondary dark:text-secondary-dark transition-all duration-200 group hover:scale-105 hover:shadow-md"
					:class="social.color"
				>
					<div :class="social.icon" class="w-5 h-5" />
					<span class="font-medium">{{ social.name }}</span>
				</a>
			</div>
		</div>
	</div>
</template>
