<script setup lang="ts">
import { useBlogPosts } from "~/composables/useBlogPosts";

const { data: posts, pending } = await useBlogPosts();
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8 sm:py-12">
    <header class="mb-12">
      <NuxtLink 
        to="/"
        class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 
               mb-8 transition-all duration-300 group"
      >
        <div class="i-mdi-arrow-left w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
        <span class="font-medium">Back to Home</span>
      </NuxtLink>
      
      <div class="text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Development Blog
        </h1>
        <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Insights, tutorials and thoughts on modern web development
        </p>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-8">
      <div v-for="i in 3" :key="i" class="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-8 border border-white/50 dark:border-slate-700/50 backdrop-blur-sm shadow-lg">
        <div class="animate-pulse">
          <div class="h-7 bg-slate-300 dark:bg-slate-600 rounded-lg mb-4 w-3/4"></div>
          <div class="h-4 bg-slate-300 dark:bg-slate-600 rounded mb-3"></div>
          <div class="h-4 bg-slate-300 dark:bg-slate-600 rounded mb-3 w-5/6"></div>
          <div class="h-4 bg-slate-300 dark:bg-slate-600 rounded mb-6 w-4/5"></div>
          <div class="flex justify-between items-center">
            <div class="h-3 bg-slate-300 dark:bg-slate-600 rounded w-1/4"></div>
            <div class="h-3 bg-slate-300 dark:bg-slate-600 rounded w-1/6"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Blog Posts -->
    <div v-else class="space-y-8">
      <article 
        v-for="post in posts" 
        :key="post.id"
        class="group"
      >
        <NuxtLink :to="`/blog/${post.slug}`" class="block">
          <div class="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-8 border border-white/50 dark:border-slate-700/50 
                      shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm
                      hover:scale-[1.02] hover:-translate-y-2">
            
            <!-- Post Header -->
            <div class="mb-6">
              <h2 class="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 
                         group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 
                         line-clamp-2 leading-tight">
                {{ post.title }}
              </h2>
              <p class="text-slate-600 dark:text-slate-300 text-lg leading-relaxed line-clamp-3">
                {{ post.excerpt }}
              </p>
            </div>
            
            <!-- Post Meta -->
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center text-slate-500 dark:text-slate-400">
                <div class="i-mdi-calendar-outline w-4 h-4 mr-2" />
                <time :datetime="post.date">
                  {{ new Date(post.date).toLocaleDateString('th-TH', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) }}
                </time>
              </div>
              
              <div class="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                <span>อ่านบทความ</span>
                <div class="i-mdi-arrow-right ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            
            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

