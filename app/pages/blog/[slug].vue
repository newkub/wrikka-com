<script setup lang="ts">
const route = useRoute();
const { fetchPostBySlug } = useBlog();

const { data: post, pending, error } = await fetchPostBySlug(
	route.params.slug as string,
);

const formatDate = (dateString?: string) => {
	if (!dateString) return "";
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};
</script>

<template>
	<div>
		<div v-if="pending" class="space-y-8 animate-pulse">
			<div class="h-8 bg-gray-700 rounded w-3/4 mx-auto"></div>
			<div class="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
			<div class="h-64 bg-gray-700 rounded-lg"></div>
			<div class="space-y-4 pt-8">
				<div class="h-4 bg-gray-700 rounded w-full"></div>
				<div class="h-4 bg-gray-700 rounded w-full"></div>
				<div class="h-4 bg-gray-700 rounded w-5/6"></div>
			</div>
		</div>
		<div v-else-if="error" class="text-center py-12">
			<h1 class="text-4xl font-bold text-red-500">Post Not Found</h1>
			<p class="mt-4 text-gray-400">
				Sorry, we couldn't find the post you're looking for.
			</p>
			<NuxtLink
				to="/blog"
				class="inline-block mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
			>Back to Blog</NuxtLink>
		</div>
		<article v-else-if="post" class="max-w-4xl mx-auto">
			<header class="text-center mb-12">
				<NuxtLink
					to="/blog"
					class="inline-flex items-center gap-2 text-primary hover:underline mb-6"
				>
					<span class="i-carbon-arrow-left"></span>
					<span>Back to all articles</span>
				</NuxtLink>
				<h1 class="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
					{{ post.title }}
				</h1>
				<p class="mt-4 text-lg text-gray-400">{{ post.description }}</p>
				<div class="mt-6 text-sm text-gray-500 flex items-center justify-center gap-4">
					<span v-if="post.date">{{ formatDate(post.date) }}</span>
				</div>
				<div
					v-if="post.tags && post.tags.length"
					class="flex flex-wrap justify-center gap-2 mt-4"
				>
					<span
						v-for="tag in post.tags"
						:key="tag"
						class="px-2 py-1 bg-gray-800 text-xs font-semibold text-gray-300 rounded-full"
					>{{ tag }}</span>
				</div>
			</header>

			<img
				v-if="post.imageUrl"
				:src="post.imageUrl"
				:alt="post.title"
				class="w-full rounded-lg shadow-lg mb-12"
			>

			<div
				class="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-primary hover:prose-a:underline prose-strong:text-white prose-blockquote:border-l-primary prose-code:bg-gray-800 prose-code:p-1 prose-code:rounded prose-code:text-white"
				v-html="post.html"
			>
			</div>
		</article>
	</div>
</template>
