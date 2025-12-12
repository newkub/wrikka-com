import { defineStore } from "pinia";
import type { BlogPost } from "~/types/blog";

export const useBlogStore = defineStore("blog", {
	state: () => ({
		posts: [] as BlogPost[],
	}),
	actions: {
		async fetchPosts() {
			if (this.posts.length) return;
			const posts = await queryContent<BlogPost>("/blog").find();
			this.posts = posts;
		},
	},
});
