<script setup lang="ts">
useSeoMeta({
	title: "Blog",
	description: "Latest articles and tutorials",
})

interface BlogPost {
	slug: string
	title: string
	excerpt: string
	date: string
	category: string | null
	tags: string[]
}

const { data: posts } = await useFetch<BlogPost[]>("/api/blog/posts")

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-2.5rem font-700 mb-0.5rem md:text-2rem text-gray-900 dark:text-gray-100">Blog</h1>
			<p class="text-1.125rem text-gray-600 dark:text-gray-400">Latest articles and tutorials</p>
		</div>

		<div v-if="posts && posts.length > 0" class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-1.5rem md:grid-cols-1">
			<article v-for="post in posts" :key="post.slug" class="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-0.5rem overflow-hidden transition-all-0.2s hover:-translate-y-2px hover:shadow-lg">
				<NuxtLink :to="`/blog/${post.slug}`" class="block p-1.5rem no-underline text-gray-900 dark:text-gray-100">
					<h2 class="text-1.25rem font-600 mb-0.75rem">{{ post.title }}</h2>
					<p class="text-gray-600 dark:text-gray-400 mb-1rem leading-1.6">{{ post.excerpt }}</p>
					<div class="flex items-center gap-1rem text-0.875rem text-gray-600 dark:text-gray-400">
						<time :datetime="post.date">{{ formatDate(post.date) }}</time>
						<span v-if="post.category" class="bg-blue-600 text-white px-0.5rem py-0.25rem rounded-0.25rem text-0.75rem font-500">{{ post.category }}</span>
					</div>
				</NuxtLink>
			</article>
		</div>

		<div v-else class="text-center py-4rem text-gray-600 dark:text-gray-400">
			<p>No posts found</p>
		</div>
	</div>
</template>
