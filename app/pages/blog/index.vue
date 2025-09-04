<script setup lang="ts">
import { useAsyncData } from '#imports'
import { useSeoMeta } from '#imports'
import { queryContent } from '#imports'

const { data: posts } = await useAsyncData('blog-posts', () => 
  queryContent('/blog')
    .sort({ date: -1 })
    .find()
)

useSeoMeta({
  title: 'Blog Articles',
  description: 'บทความและเนื้อหาน่าสนใจทั้งหมดในบล็อกของเรา'
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Blog Articles</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink 
        v-for="post in posts" 
        :key="post._id"
        :to="`/blog/${post.slug}`"
        class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      >
        <ContentRenderer :value="post" />
      </NuxtLink>
    </div>
  </div>
</template>
