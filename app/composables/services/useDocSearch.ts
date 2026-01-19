import type { ContentItem } from "#shared/types/content";

export const useDocSearch = (docs: Ref<ContentItem[]>) => {
	const searchQuery = ref("");
	const isSearchOpen = ref(false);

	const filteredDocs = computed(() => {
		if (!searchQuery.value) return docs.value;

		const query = searchQuery.value.toLowerCase();
		return docs.value.filter(doc => {
			const titleMatch = doc.title?.toLowerCase().includes(query) || false;
			const descriptionMatch = doc.description?.toLowerCase().includes(query) || false;
			const tagsMatch = doc.tags?.some((tag: string) => tag.toLowerCase().includes(query)) || false;
			const categoryMatch = doc.category?.toLowerCase().includes(query) || false;

			return titleMatch || descriptionMatch || tagsMatch || categoryMatch;
		});
	});

	const openSearch = () => {
		isSearchOpen.value = true;
	};

	const closeSearch = () => {
		isSearchOpen.value = false;
		searchQuery.value = "";
	};

	const toggleSearch = () => {
		if (isSearchOpen.value) {
			closeSearch();
		} else {
			openSearch();
		}
	};

	const clearSearch = () => {
		searchQuery.value = "";
	};

	return {
		searchQuery,
		isSearchOpen,
		filteredDocs,
		openSearch,
		closeSearch,
		toggleSearch,
		clearSearch,
	};
};
