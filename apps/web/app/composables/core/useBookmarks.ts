export function useBookmarks() {
	const bookmarks = useState<string[]>("blog-bookmarks", () => []);

	const isBookmarked = (slug: string) => {
		return bookmarks.value.includes(slug);
	};

	const toggleBookmark = (slug: string) => {
		if (isBookmarked(slug)) {
			bookmarks.value = bookmarks.value.filter((s: string) => s !== slug);
		} else {
			bookmarks.value.push(slug);
		}
	};

	const getBookmarkedPosts = (allPosts: any[]) => {
		return allPosts.filter((post) => bookmarks.value.includes(post.slug));
	};

	return {
		bookmarks: readonly(bookmarks),
		isBookmarked,
		toggleBookmark,
		getBookmarkedPosts,
	};
}
