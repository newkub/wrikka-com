<script setup lang="ts">
const route = useRoute();
const { fetchPostBySlug } = useBlog();

const isFocusMode = useFocusMode();
const articleEl = ref<HTMLElement | null>(null);
const currentSectionTitle = ref<string | null>(null);

const { data: post, pending, error } = await fetchPostBySlug(
	route.params.slug as string,
);

// Fetch all posts to find next/previous
const { fetchPosts } = useBlog();
const { data: allPosts } = await fetchPosts();

const shareUrl = computed(() => process.client ? window.location.href : '');
const shareText = computed(() => `Check out this article: ${post.value?.title}`);

const twitterShareUrl = computed(() => `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl.value)}&text=${encodeURIComponent(shareText.value)}`);
const facebookShareUrl = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`);

const [prevPost, nextPost] = (() => {
  if (!post.value || !allPosts.value) return [null, null];

  const sortedPosts = [...allPosts.value].sort((a, b) => new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime());
  const currentIndex = sortedPosts.findIndex(p => p.slug === post.value!.slug);

  if (currentIndex === -1) return [null, null];

  const prev = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const next = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  return [prev || null, next || null];
})();


const updateCurrentSectionFromIntersection = () => {
	const root = articleEl.value;
	if (!root) return;

	const headings = Array.from(root.querySelectorAll<HTMLElement>("h2[id]"));
	if (!headings.length) {
		currentSectionTitle.value = null;
		return;
	}

	headings.forEach((h) => {
		useIntersectionObserver(
			h,
			([entry]) => {
				if (!entry?.isIntersecting) return;
				const text = (h.textContent || "").trim();
				currentSectionTitle.value = text || null;
			},
			{
				root: null,
				threshold: 0.25,
				rootMargin: "-72px 0px -70% 0px",
			},
		);
	});
};

watch(
	() => post.value?.html,
	async () => {
		await nextTick();
		updateCurrentSectionFromIntersection();
	},
);

onMounted(() => {
	updateCurrentSectionFromIntersection();
});
</script>


<template>
  <div>
    <BlogPostLoading v-if="pending" />
    <BlogPostError v-else-if="error" />
    <div v-else-if="post" :class="['max-w-4xl mx-auto', { 'px-4 sm:px-6 lg:px-8': !isFocusMode }]" ref="articleEl">
      <div class="fixed top-20 right-4 z-50">
        <button @click="isFocusMode = !isFocusMode" class="p-2 rounded-full bg-surface-100/80 dark:bg-surface-800/80 backdrop-blur-sm border border-surface-200 dark:border-surface-700 text-secondary hover:text-primary transition-colors">
          <Icon :name="isFocusMode ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'" class="text-xl" />
        </button>
      </div>
      <BlogPostHeader v-if="!isFocusMode" :post="post" />
      <BlogPostBody :post="post" :currentSectionTitle="currentSectionTitle" />
      <BlogPostFooter
        v-if="!isFocusMode"
        :prevPost="prevPost"
        :nextPost="nextPost"
        :twitterShareUrl="twitterShareUrl"
        :facebookShareUrl="facebookShareUrl"
      />
    </div>
  </div>
</template>
