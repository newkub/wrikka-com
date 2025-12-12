import { storeToRefs } from "pinia";
import { useBlogStore } from "~/stores/blog";
import type { BlogPost } from "~/types/blog";

export const useBlog = async () => {
	const blogStore = useBlogStore();
	const { posts } = storeToRefs(blogStore);

	if (posts.value.length === 0) {
		await blogStore.fetchPosts();
	}

	const getPostBySlug = (slug: string) => {
		return computed(() => posts.value.find((p: BlogPost) => p.slug === slug));
	};

	return { posts, getPostBySlug };
};
