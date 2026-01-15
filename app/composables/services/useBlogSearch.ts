import type { BlogPost } from "#shared/types/blog";

export const useBlogSearch = (posts: Ref<BlogPost[]>) => {
	const searchQuery = ref("");
	const selectedCategory = ref<string | null>(null);

	const filteredPosts = computed(() => {
		let filtered = posts.value;

		if (searchQuery.value) {
			const query = searchQuery.value.toLowerCase();
			filtered = filtered.filter(
				post =>
					post.title.toLowerCase().includes(query)
					|| post.description.toLowerCase().includes(query)
					|| post.tags?.some((tag: string) => tag.toLowerCase().includes(query))
					|| post.categories?.some((cat: string) => cat.toLowerCase().includes(query)),
			);
		}

		if (selectedCategory.value) {
			filtered = filtered.filter(post => post.categories?.includes(selectedCategory.value!));
		}

		return filtered;
	});

	const availableCategories = computed(() => {
		const categories = new Set<string>();
		posts.value.forEach(post => {
			post.categories?.forEach((cat: string) => categories.add(cat));
		});
		return Array.from(categories).sort();
	});

	const clearFilters = () => {
		searchQuery.value = "";
		selectedCategory.value = null;
	};

	return {
		searchQuery,
		selectedCategory,
		filteredPosts,
		availableCategories,
		clearFilters,
	};
};
