<script setup lang="ts">
import { useProjects } from "~/composables/projects";

const { projects } = useProjects();

// SEO Meta
useHead({
	title: "Projects | Wrikka",
	meta: [
		{
			name: "description",
			content: "โปรเจกต์และผลงานของ Wrikka - Full-Stack Developer",
		},
		{ property: "og:title", content: "Projects | Wrikka" },
		{
			property: "og:description",
			content: "โปรเจกต์และผลงานของ Wrikka - Full-Stack Developer",
		},
	],
});
</script>

<template>
	<div class="min-h-screen bg-surface dark:bg-surface-dark">
		<div class="container mx-auto px-6 py-12">
			<!-- Header -->
			<div class="text-center mb-16">
				<h1 class="text-4xl md:text-5xl font-bold text-primary dark:text-primary-dark mb-6">
					โปรเจกต์ของฉัน
				</h1>
				<p class="text-xl text-secondary dark:text-secondary-dark max-w-2xl mx-auto leading-relaxed">
					ผลงานและโปรเจกต์ที่ผมได้พัฒนาด้วยเทคโนโลยีสมัยใหม่
				</p>
			</div>

			<!-- Projects Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
				<ProjectCard
					v-for="project in projects"
					:key="project.id"
					:project="project"
				/>
			</div>

			<!-- Call to Action -->
			<div class="mt-20 text-center">
				<div class="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 border border-accent/20 dark:border-accent-dark/20">
					<h2 class="text-2xl font-bold text-primary dark:text-primary-dark mb-4">
						มีไอเดียโปรเจกต์?
					</h2>
					<p class="text-secondary dark:text-secondary-dark mb-6 max-w-md mx-auto">
						หากคุณมีโปรเจกต์ที่น่าสนใจหรือต้องการความช่วยเหลือในการพัฒนา ติดต่อมาได้เลย!
					</p>
					<NuxtLink
						to="/#contact"
						class="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-primary text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
					>
						<div class="i-mdi-email w-5 h-5" />
						ติดต่อฉัน
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>
