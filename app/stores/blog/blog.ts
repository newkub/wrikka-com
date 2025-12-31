import { defineStore } from "pinia";
import type { BlogPost } from "~~/shared/types/blog";

export const useBlogStore = defineStore("blog", {
	state: () => ({
		posts: [] as BlogPost[],
	}),
	actions: {
		async fetchPosts() {
			if (this.posts.length > 0) return;
			const posts = await $fetch<BlogPost[]>("/api/_content/query", {
				params: {
					_path: "/blog",
				},
			});
			this.posts = posts;
		},
	},
});
