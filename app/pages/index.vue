<script setup lang="ts">
import { useBlog } from "~/composables/blog";
import { useProjects } from "~/composables/projects";

const { posts } = await useBlog();
const { projects } = await useProjects();

const latestPosts = computed(() => posts.value.slice(0, 3));
const featuredProjects = computed(() => projects.value.slice(0, 3));
</script>

<template>
	<div class="space-y-12">
		<section>
			<HomeProfileCard />
			<HomeAboutMe />
		</section>

		<section>
			<h2 class="text-3xl font-bold mb-6">Latest Posts</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<BlogPostPreview
					v-for="post in latestPosts"
					:key="post.slug"
					:post="post"
				/>
			</div>
		</section>

		<section>
			<h2 class="text-3xl font-bold mb-6">Featured Projects</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<UiProjectCard
					v-for="project in featuredProjects"
					:key="project.id"
					:project="project"
				/>
			</div>
		</section>
	</div>
</template>
