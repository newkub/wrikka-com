<script setup lang="ts">
import { useBlogPost } from '~/composables/useBlogPosts'
import { useMarkdown } from '~/composables/useMarkdown'

const route = useRoute()
const slug = route.params.slug as string

const { data: post, pending, error } = await useBlogPost(slug)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  })
}

// Setup markdown renderer with Shiki syntax highlighting
const { renderMarkdown } = await useMarkdown()

// Render markdown content to HTML
const renderedContent = computed(() => {
  if (!post.value?.content) return ''
  return renderMarkdown(post.value.content)
})

useSeoMeta({
  title: post.value?.title,
  description: post.value?.excerpt,
})
</script>

<template>
  <div class="min-h-screen bg-background transition-slow">
    <div class="container mx-auto px-3 sm:px-4 md:px-6 max-w-4xl py-6 sm:py-8">
      <div v-if="pending" class="animate-pulse">
        <div class="h-8 bg-border rounded mb-6 w-1/4"></div>
        <div class="h-12 bg-border rounded mb-4"></div>
        <div class="h-4 bg-border rounded mb-8 w-1/3"></div>
        <div class="space-y-4">
          <div class="h-4 bg-border rounded"></div>
          <div class="h-4 bg-border rounded w-5/6"></div>
          <div class="h-4 bg-border rounded w-4/6"></div>
        </div>
      </div>

      <article v-else-if="post">
        <header class="mb-8">
          <NuxtLink 
            to="/blog"
            class="inline-flex items-center text-primary hover:text-primary-dark mb-6 transition-fast"
          >
            <div class="i-mdi-arrow-left w-5 h-5 mr-2" />
            Back to Blog
          </NuxtLink>
          
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4 leading-tight">
            {{ post.title }}
          </h1>
          
          <div class="flex items-center text-text-secondary mb-6">
            <time :datetime="post.date" class="text-sm">
              {{ new Date(post.date).toLocaleDateString('th-TH', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) }}
            </time>
            <span class="mx-2">•</span>
            <span class="text-sm">{{ post.readingTime }} นาทีในการอ่าน</span>
          </div>
        </header>

        <div class="bg-surface rounded-lg p-6 sm:p-8 border border-border shadow-md">
          <div v-html="renderedContent" class="blog-content prose prose-gray max-w-none prose-headings:font-bold prose-code:text-sm prose-pre:bg-background-secondary prose-pre:p-4 prose-pre:rounded prose-pre:border prose-pre:overflow-x-auto"></div>
        </div>
      </article>
    </div>
  </div>
</template>

