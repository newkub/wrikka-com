<script setup lang="ts">
import { useBlogPosts } from '~/composables/useBlogPosts'

const { data: posts, pending } = await useBlogPosts()
</script>

<template>
  <div class="min-h-screen bg-background transition-slow">
    <div class="container mx-auto px-3 sm:px-4 md:px-6 max-w-4xl py-6 sm:py-8">
      <header class="mb-8">
        <NuxtLink 
          to="/"
          class="inline-flex items-center text-primary hover:text-primary-dark mb-4 transition-fast"
        >
          <div class="i-mdi-arrow-left w-5 h-5 mr-2" />
          Back to Home
        </NuxtLink>
        <h1 class="text-3xl sm:text-4xl font-bold text-text mb-4">
          Blog
        </h1>
        <p class="text-lg text-text-secondary">
          Insights, tutorials and thoughts on development
        </p>
      </header>

      <div v-if="pending" class="space-y-6">
        <div v-for="i in 3" :key="i" class="bg-surface rounded-lg p-6 border border-border shadow-sm">
          <div class="animate-pulse">
            <div class="h-6 bg-border rounded mb-3 w-3/4"></div>
            <div class="h-4 bg-border rounded mb-2"></div>
            <div class="h-4 bg-border rounded mb-4 w-5/6"></div>
            <div class="h-3 bg-border rounded w-1/4"></div>
          </div>
        </div>
      </div>

      <div v-else class="space-y-6">
        <article 
          v-for="post in posts" 
          :key="post.id"
          class="bg-surface rounded-lg p-6 border border-border hover:border-primary transition-normal hover:shadow-md"
        >
          <NuxtLink :to="`/blog/${post.slug}`" class="block group">
            <h2 class="text-xl sm:text-2xl font-bold text-text mb-3 group-hover:text-primary transition-fast line-clamp-3">
              {{ post.title }}
            </h2>
            <p class="text-text-secondary mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>
            <div class="flex items-center justify-between text-sm text-text-tertiary">
              <time :datetime="post.date">
                {{ new Date(post.date).toLocaleDateString('th-TH', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) }}
              </time>
              <span class="text-primary group-hover:underline">
                อ่านต่อ →
              </span>
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </div>
</template>

