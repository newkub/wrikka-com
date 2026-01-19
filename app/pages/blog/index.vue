<script setup lang="ts">
useSeoMeta({
	title: "Blog",
	description: "Latest articles and tutorials",
});

interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	category: string | null;
	tags: string[];
	cover?: string;
}

const { data: posts } = await useFetch<BlogPost[]>("/api/blog/posts");

const searchQuery = ref("");
const selectedCategory = ref<string | null>(null);

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

const filteredPosts = computed(() => {
	if (!posts.value) return [];

	let filtered = posts.value;

	// Filter by search query
	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase();
		filtered = filtered.filter(
			(post) =>
				post.title.toLowerCase().includes(query)
				|| post.excerpt.toLowerCase().includes(query)
				|| post.tags.some((tag) => tag.toLowerCase().includes(query)),
		);
	}

	// Filter by category
	if (selectedCategory.value) {
		filtered = filtered.filter((post) =>
			post.category === selectedCategory.value
		);
	}

	return filtered;
});

const categories = computed(() => {
	if (!posts.value) return [];
	const cats = new Set(
		posts.value.map((post) => post.category).filter(Boolean) as string[],
	);
	return Array.from(cats).sort();
});
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-2.5rem font-700 mb-0.5rem md:text-2rem text-foreground">
				Blog
			</h1>
			<p class="text-1.125rem text-muted-foreground">
				Latest articles and tutorials
			</p>
		</div>

		<!-- Search and Filter -->
		<div class="flex flex-col md:flex-row gap-1rem items-center justify-between">
			<div class="relative flex-1 max-w-md w-full">
				<Icon
					name="mdi:magnify"
					class="absolute left-0.75rem top-1/2 -translate-y-1/2 w-1.25rem h-1.25rem text-muted-foreground"
				/>
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Search posts..."
					class="w-full pl-2.75rem pr-1rem py-0.75rem bg-muted border border-border rounded-0.5rem text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			<div class="flex items-center gap-0.5rem flex-wrap">
				<button
					@click="selectedCategory = null"
					:class="[
						'px-0.75rem py-0.5rem rounded-0.25rem text-0.875rem font-500 transition-all-0.2s',
						selectedCategory === null
							? 'bg-primary text-primary-foreground'
							: 'bg-surface text-foreground hover:bg-muted',
					]"
				>
					All
				</button>
				<button
					v-for="category in categories"
					:key="category"
					@click="selectedCategory = category"
					:class="[
						'px-0.75rem py-0.5rem rounded-0.25rem text-0.875rem font-500 transition-all-0.2s',
						selectedCategory === category
							? 'bg-blue-600 text-white'
							: 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600',
					]"
				>
					{{ category }}
				</button>
			</div>
		</div>

		<!-- Blog Posts Grid -->
		<div
			v-if="filteredPosts && filteredPosts.length > 0"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5rem"
		>
			<article
				v-for="post in filteredPosts"
				:key="post.slug"
				class="bg-surface border border-border rounded-0.5rem overflow-hidden transition-all-0.2s hover:-translate-y-2px hover:shadow-lg"
			>
				<NuxtLink
					:to="`/blog/${post.slug}`"
					class="block no-underline text-foreground"
				>
					<!-- Cover Image -->
					<div
						v-if="post.cover"
						class="w-full h-48 bg-muted overflow-hidden"
					>
						<img
							:src="post.cover"
							:alt="post.title"
							class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
						/>
					</div>

					<div class="p-1.5rem">
						<h2 class="text-1.25rem font-600 mb-0.75rem">{{ post.title }}</h2>
						<p class="text-muted-foreground mb-1rem leading-1.6 line-clamp-3">
							{{ post.excerpt }}
						</p>
						<div class="flex items-center gap-1rem text-0.875rem text-muted-foreground">
							<time :datetime="post.date">{{ formatDate(post.date) }}</time>
							<span
								v-if="post.category"
								class="bg-primary text-primary-foreground px-0.5rem py-0.25rem rounded-0.25rem text-0.75rem font-500"
							>{{ post.category }}</span>
						</div>
					</div>
				</NuxtLink>
			</article>
		</div>

		<div v-else class="text-center py-4rem text-muted-foreground">
			<p>No posts found</p>
		</div>
	</div>
</template>


