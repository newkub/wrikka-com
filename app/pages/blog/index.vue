<script setup lang="ts">
import { useBlog } from "~/composables/useBlog";

const { posts } = await useBlog();
</script>

<template>
	<div class="p-4">
		<h1 class="text-4xl font-bold mb-8">Blog</h1>
		<ul>
			<li v-for="post in posts" :key="post.slug" class="mb-4">
				<NuxtLink
					:to="`/blog/${post.slug}`"
					class="text-xl text-primary hover:underline"
				>
					{{ post.title }}
				</NuxtLink>
				<p class="text-secondary">{{ post.date }}</p>
			</li>
		</ul>
	</div>
</template>
