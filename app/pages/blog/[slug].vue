<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () => {
  return queryContent('/blog')
    .where({ _path: `/blog/${route.params.slug}` })
    .findOne()
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <NuxtLink 
      to="/blog" 
      class="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors mb-6"
    >
      <div class="i-mdi-arrow-left"></div>
      <span>Back to blog</span>
    </NuxtLink>

    <article v-if="post" class="prose dark:prose-invert max-w-none">
      <h1>{{ post.title }}</h1>
      
      <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <div class="flex items-center gap-1">
          <div class="i-mdi-calendar"></div>
          <span>{{ new Date(post.date).toLocaleDateString() }}</span>
        </div>
      </div>

      <ContentRenderer :value="post" />
    </article>

    <div v-else class="text-center py-16">
      <h2 class="text-2xl font-bold mb-2">Post not found</h2>
      <p class="text-gray-500 dark:text-gray-400">The post you're looking for doesn't exist.</p>
    </div>
  </div>
</template>