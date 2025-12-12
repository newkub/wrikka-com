<script setup lang="ts">
import { navigateTo, useHead, useRoute } from "#app";
import { computed, ref } from "vue";
import BlogTOC from "~/components/blog/BlogTOC.vue";
import BackButton from "~/components/ui/BackButton.vue";
import { useBlogPosts } from "~/composables/blog";
import { useMarkdownRenderer } from "~/composables/markdown";
import { useTableOfContents } from "~/composables/toc";
import { useFormatter } from "~/composables/useFormatter";
import type { BlogPost } from "~/types/blog";

const route = useRoute();
const slug = route.params.slug as string;

// State
const { getPostBySlug } = useBlogPosts();
const post = ref<BlogPost | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

// Composables
const markdownContent = computed(() => post.value?.content || "");
const { formattedContent, tableOfContents } = useMarkdownRenderer(
	markdownContent,
);
const { showTOC } = useTableOfContents();
const { formatDate } = useFormatter();

// Navigation
const navigateToHome = () => navigateTo("/");
const navigateToBlog = () => navigateTo("/blog");

// Load Post
const loadPost = async () => {
	try {
		loading.value = true;
		error.value = null;
		const foundPost = await getPostBySlug(slug);
		if (foundPost) {
			post.value = foundPost;
		} else {
			error.value = "ไม่พบบทความที่คุณกำลังหา";
		}
	} catch (err) {
		error.value = err instanceof Error
			? err.message
			: "เกิดข้อผิดพลาดในการโหลดบทความ";
		console.error("Error loading post:", err);
	} finally {
		loading.value = false;
	}
};

await loadPost();

// SEO Meta
useHead(() => ({
	title: post.value
		? `${post.value.title} | Wrikka Blog`
		: "กำลังโหลด... | Wrikka Blog",
	meta: [
		{
			name: "description",
			content: post.value?.excerpt || "บทความจากบล็อกของเรา",
		},
		{ property: "og:title", content: post.value?.title || "Blog Post" },
		{
			property: "og:description",
			content: post.value?.excerpt || "บทความจากบล็อกของเรา",
		},
		{ property: "og:image", content: post.value?.image || "" },
		{ property: "og:type", content: "article" },
	],
}));
</script>

<template>
	<div class="h-full bg-surface dark:bg-surface-dark relative">
		<BackButton target="/blog" tooltip="กลับไปบล็อก" />

		<!-- Main Content with Sidebar Layout -->
		<div class="h-full overflow-auto">
			<div class="container mx-auto px-6 py-8 max-w-7xl">
				<!-- Loading State -->
				<div
					v-if="loading"
					class="flex flex-col justify-center items-center py-20"
				>
					<div class="w-16 h-16 border-4 border-accent/20 dark:border-accent-dark/20 border-t-accent dark:border-t-accent-dark rounded-full animate-spin mb-4">
					</div>
					<span class="text-secondary dark:text-secondary-dark text-lg"
					>กำลังโหลดบทความ...</span>
				</div>

				<!-- Error State -->
				<div v-else-if="error" class="max-w-2xl mx-auto">
					<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-6 py-4 rounded-xl mb-8">
						<div class="flex items-center gap-3">
							<div class="i-mdi-alert-circle w-6 h-6 text-red-500" />
							<div>
								<strong class="font-bold">เกิดข้อผิดพลาด!</strong>
								<p class="text-sm mt-1">{{ error }}</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Blog Post Content with Sidebar -->
				<div v-else-if="post" class="flex gap-8 max-w-7xl mx-auto">
					<!-- Main Content -->
					<article
						class="transition-all duration-300 ease-out"
						:class="showTOC ? 'flex-1 max-w-4xl' : 'w-full max-w-5xl mx-auto'"
					>
						<!-- Featured Image -->
						<div
							v-if="post.image"
							class="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl"
						>
							<img
								:src="post.image"
								:alt="post.title"
								class="w-full h-full object-cover"
							>
							<div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent">
							</div>
						</div>

						<!-- Post Header -->
						<header class="mb-12">
							<!-- Category -->
							<div v-if="post.category" class="mb-6">
								<span
									class="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
								>
									<div class="i-mdi-tag w-4 h-4" />
									{{ post.category }}
								</span>
							</div>

							<!-- Title -->
							<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
								{{ post.title }}
							</h1>

							<!-- Meta Information -->
							<div class="flex flex-wrap items-center gap-6 text-secondary text-sm mb-6 p-4 bg-surface-50/50 dark:bg-surface-800/50 rounded-xl backdrop-blur-sm border border-surface-200 dark:border-surface-700">
								<div class="flex items-center gap-2">
									<div class="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
										<div class="i-mdi-account w-4 h-4 text-white" />
									</div>
									<span class="font-medium">Wrikka</span>
								</div>

								<div class="flex items-center gap-2">
									<div class="i-mdi-calendar w-4 h-4 text-accent" />
									<span>{{ formatDate(post.date) }}</span>
								</div>

								<div class="flex items-center gap-2">
									<div class="i-mdi-clock-outline w-4 h-4 text-primary" />
									<span>{{ post.readingTime }} นาทีในการอ่าน</span>
								</div>
							</div>

							<!-- Excerpt -->
							<div class="bg-gradient-to-r from-accent/5 to-primary/5 p-6 rounded-xl border-l-4 border-accent mb-8">
								<p class="text-lg text-secondary leading-relaxed italic">
									{{ post.excerpt }}
								</p>
							</div>

							<!-- Tags -->
							<div
								v-if="post.tags && post.tags.length > 0"
								class="flex flex-wrap gap-2"
							>
								<span
									v-for="tag in post.tags"
									:key="tag"
									class="inline-flex items-center gap-1 bg-surface-100 dark:bg-surface-700 text-secondary px-3 py-2 rounded-lg text-sm hover:bg-accent hover:text-white transition-all duration-200 cursor-pointer group"
								>
									<div class="i-mdi-pound w-3 h-3 group-hover:scale-110 transition-transform" />
									{{ tag }}
								</span>
							</div>
						</header>

						<!-- Divider -->
						<div class="flex items-center gap-4 mb-12">
							<div class="flex-1 h-px bg-gradient-to-r from-transparent via-surface-200 dark:via-surface-700 to-transparent">
							</div>
							<div class="w-2 h-2 bg-accent rounded-full"></div>
							<div class="flex-1 h-px bg-gradient-to-r from-transparent via-surface-200 dark:via-surface-700 to-transparent">
							</div>
						</div>

						<!-- Post Content -->
						<div class="prose prose-lg dark:prose-invert max-w-none mb-12">
							<div class="text-primary dark:text-primary-dark leading-relaxed space-y-6">
								<!-- Process markdown content with syntax highlighting -->
								<div v-html="formattedContent" class="formatted-content"></div>
							</div>
						</div>

						<!-- Post Footer -->
						<footer class="mt-16 pt-8 border-t border-surface-200 dark:border-surface-700">
							<!-- Share Section -->
							<div class="bg-surface-50/50 dark:bg-surface-800/50 rounded-xl p-6 mb-8 border border-surface-200 dark:border-surface-700">
								<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
									<div class="flex items-center gap-3">
										<div class="i-mdi-share-variant w-6 h-6 text-accent" />
										<span class="text-primary font-semibold">แชร์บทความนี้</span>
									</div>
									<div class="flex gap-3">
										<button class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 group">
											<div class="i-mdi-twitter w-4 h-4 group-hover:scale-110 transition-transform" />
											<span class="hidden sm:inline">Twitter</span>
										</button>
										<button class="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all duration-200 group">
											<div class="i-mdi-facebook w-4 h-4 group-hover:scale-110 transition-transform" />
											<span class="hidden sm:inline">Facebook</span>
										</button>
										<button class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 group">
											<div class="i-mdi-share-variant w-4 h-4 group-hover:scale-110 transition-transform" />
											<span class="hidden sm:inline">อื่นๆ</span>
										</button>
									</div>
								</div>
							</div>

							<!-- Navigation -->
							<div class="flex flex-col sm:flex-row gap-4 justify-between">
								<button
									@click="navigateToBlog"
									class="flex items-center gap-2 bg-surface-100 dark:bg-surface-700 text-primary px-6 py-3 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-600 transition-all duration-200 group"
								>
									<div class="i-mdi-arrow-left w-5 h-5 group-hover:-translate-x-1 transition-transform" />
									<span>กลับไปยังบล็อก</span>
								</button>

								<button
									@click="navigateToHome"
									class="flex items-center gap-2 bg-gradient-to-r from-accent to-primary text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 group"
								>
									<div class="i-mdi-home w-5 h-5 group-hover:scale-110 transition-transform" />
									<span>กลับหน้าหลัก</span>
								</button>
							</div>
						</footer>
					</article>

					<BlogTOC :table-of-contents="tableOfContents" />
				</div>
			</div>
		</div>
	</div>
</template>
