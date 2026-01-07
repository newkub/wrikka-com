<script setup lang="ts">
const { fetchPosts } = useBlog();
const { data: posts, pending, error } = await fetchPosts();

const searchQuery = ref("");
const selectedTag = ref<string | null>(null);
const sortBy = ref<"newest" | "oldest">("newest");

const allTags = computed(() => {
	const tags = new Set<string>();
	posts.value?.forEach(post => {
		post.tags?.forEach(tag => tags.add(tag));
	});
	return Array.from(tags);
});

const filteredAndSortedPosts = computed(() => {
	let allPosts = posts.value?.filter(Boolean) ?? [];

	// Filter by search query
	if (searchQuery.value) {
		allPosts = allPosts.filter(post =>
			post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
			|| post.description.toLowerCase().includes(
				searchQuery.value.toLowerCase(),
			)
		);
	}

	// Filter by selected tag
	if (selectedTag.value) {
		allPosts = allPosts.filter(post => post.tags?.includes(selectedTag.value!));
	}

	// Sort posts
	allPosts.sort((a, b) => {
		const dateA = new Date(a.date || 0).getTime();
		const dateB = new Date(b.date || 0).getTime();
		return sortBy.value === "newest" ? dateB - dateA : dateA - dateB;
	});

	return allPosts;
});
</script>

<template>
	<div class="space-y-12">
		<section class="text-center">
			<h1 class="text-5xl font-extrabold text-primary dark:text-primary-dark">
				My Blog
			</h1>
			<p class="mt-4 max-w-2xl mx-auto text-lg text-secondary">
				Welcome to my corner of the internet where I share my thoughts on web
				development, design, and technology.
			</p>
		</section>

		<div class="space-y-4 max-w-2xl mx-auto">
			<!-- Search and Sort -->
			<div class="flex flex-col sm:flex-row gap-4">
				<div class="relative flex-1">
					<input
						v-model="searchQuery"
						type="text"
						placeholder="Search articles..."
						class="w-full px-4 py-3 pl-10 rounded-lg bg-surface-100 dark:bg-surface-200/10 border border-surface-200 dark:border-surface-800 text-primary dark:text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent transition-all backdrop-blur-sm"
					/>
					<span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
						<Icon name="mdi:magnify" class="text-xl" />
					</span>
				</div>
				<select
					v-model="sortBy"
					class="px-4 py-3 rounded-lg bg-surface-100 dark:bg-surface-200/10 border border-surface-200 dark:border-surface-800 text-primary dark:text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent transition-all"
				>
					<option value="newest">Sort by Newest</option>
					<option value="oldest">Sort by Oldest</option>
				</select>
			</div>

			<!-- Tag Filters -->
			<div class="flex flex-wrap justify-center gap-2">
				<button
					@click="selectedTag = null"
					:class="[
						'px-3 py-1 rounded-full text-sm font-medium transition-colors',
						!selectedTag
							? 'bg-accent text-white'
							: 'bg-surface-100 dark:bg-surface-200/10 hover:bg-surface-200 dark:hover:bg-surface-800',
					]"
				>
					All
				</button>
				<button
					v-for="tag in allTags"
					:key="tag"
					@click="selectedTag = tag"
					:class="[
						'px-3 py-1 rounded-full text-sm font-medium transition-colors',
						selectedTag === tag
							? 'bg-accent text-white'
							: 'bg-surface-100 dark:bg-surface-200/10 hover:bg-surface-200 dark:hover:bg-surface-800',
					]"
				>
					{{ tag }}
				</button>
			</div>
		</div>

		<div
			v-if="pending"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse"
		>
			<div
				v-for="i in 6"
				:key="i"
				class="bg-surface-100/60 dark:bg-surface-200/10 rounded-lg overflow-hidden border border-surface-200 dark:border-surface-800"
			>
				<div class="w-full h-48 bg-surface-200 dark:bg-surface-800"></div>
				<div class="p-6 space-y-4">
					<div class="h-6 bg-surface-200 dark:bg-surface-800 rounded w-3/4">
					</div>
					<div class="h-4 bg-surface-200 dark:bg-surface-800 rounded"></div>
					<div class="h-4 bg-surface-200 dark:bg-surface-800 rounded w-5/6">
					</div>
				</div>
			</div>
		</div>
		<div v-else-if="error" class="text-center py-12">
			<p class="text-red-500">Could not load posts. Please try again later.</p>
		</div>
		<div
			v-else-if="filteredAndSortedPosts.length"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
		>
			<BlogPostPreview
				v-for="post in filteredAndSortedPosts"
				:key="post.slug"
				:post="post"
			/>
		</div>
		<div v-else class="text-center py-12">
			<p class="text-gray-400">No posts found for "{{ searchQuery }}".</p>
		</div>
	</div>
</template>
