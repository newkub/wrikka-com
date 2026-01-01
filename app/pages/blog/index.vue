<script setup lang="ts">
const { fetchPosts } = useBlog();
const { data: posts, pending, error } = await fetchPosts();

const searchQuery = ref("");

const filteredPosts = computed(() => {
	const allPosts = posts.value?.filter(Boolean) ?? [];
	if (!searchQuery.value) {
		return allPosts;
	}
	return allPosts.filter(post =>
		post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
		|| post.description.toLowerCase().includes(searchQuery.value.toLowerCase())
	);
});
</script>

<template>
	<div class="space-y-12">
		<section class="text-center">
			<h1 class="text-5xl font-extrabold text-white">My Blog</h1>
			<p class="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
				Welcome to my corner of the internet where I share my thoughts on web
				development, design, and technology.
			</p>
		</section>

		<div class="relative max-w-lg mx-auto">
			<input
				v-model="searchQuery"
				type="text"
				placeholder="Search articles..."
				class="w-full px-4 py-3 pl-10 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all backdrop-blur-sm"
			/>
			<span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
				<span class="i-carbon-search text-xl"></span>
			</span>
		</div>

		<div
			v-if="pending"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse"
		>
			<div
				v-for="i in 6"
				:key="i"
				class="bg-gray-800/50 rounded-lg overflow-hidden"
			>
				<div class="w-full h-48 bg-gray-700"></div>
				<div class="p-6 space-y-4">
					<div class="h-6 bg-gray-700 rounded w-3/4"></div>
					<div class="h-4 bg-gray-700 rounded"></div>
					<div class="h-4 bg-gray-700 rounded w-5/6"></div>
				</div>
			</div>
		</div>
		<div v-else-if="error" class="text-center py-12">
			<p class="text-red-500">Could not load posts. Please try again later.</p>
		</div>
		<div
			v-else-if="filteredPosts.length"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
		>
			<BlogPostPreview
				v-for="post in filteredPosts"
				:key="post.slug"
				:post="post"
			/>
		</div>
		<div v-else class="text-center py-12">
			<p class="text-gray-400">No posts found for "{{ searchQuery }}".</p>
		</div>
	</div>
</template>
