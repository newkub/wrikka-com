<script setup lang="ts">
import { useBlogPost } from "~/composables/useBlogPosts";
import { useMarkdown } from "~/composables/useMarkdown";

const route = useRoute();
const slug = route.params.slug as string;

const { data: post, pending, error } = await useBlogPost(slug);

if (error.value) {
	throw createError({
		statusCode: 404,
		statusMessage: "Blog post not found",
	});
}

// Setup markdown renderer with Shiki syntax highlighting
const { renderMarkdown } = await useMarkdown();

// Render markdown content to HTML
const renderedContent = computed(() => {
	if (!post.value?.content) return "";
	return renderMarkdown(post.value.content);
});

useSeoMeta({
	title: post.value?.title,
	description: post.value?.excerpt,
});
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8 sm:py-12">
    <!-- Loading State -->
    <div v-if="pending" class="animate-pulse">
      <div class="mb-8">
        <div class="h-6 bg-slate-300 dark:bg-slate-600 rounded w-1/4 mb-6"></div>
        <div class="h-12 bg-slate-300 dark:bg-slate-600 rounded mb-4"></div>
        <div class="h-4 bg-slate-300 dark:bg-slate-600 rounded w-1/3 mb-8"></div>
      </div>
      <div class="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-8 border border-white/50 dark:border-slate-700/50 backdrop-blur-sm shadow-lg">
        <div class="space-y-4">
          <div class="h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
          <div class="h-4 bg-slate-300 dark:bg-slate-600 rounded w-5/6"></div>
          <div class="h-4 bg-slate-300 dark:bg-slate-600 rounded w-4/6"></div>
          <div class="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
        </div>
      </div>
    </div>

    <!-- Blog Post -->
    <article v-else-if="post" class="relative">
      <!-- Back Navigation -->
      <nav class="mb-8">
        <NuxtLink 
          to="/blog"
          class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 
                 transition-all duration-300 group"
        >
          <div class="i-mdi-arrow-left w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          <span class="font-medium">Back to Blog</span>
        </NuxtLink>
      </nav>
      
      <!-- Article Header -->
      <header class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6 leading-tight">
          {{ post.title }}
        </h1>
        
        <div class="flex items-center justify-center gap-4 text-slate-600 dark:text-slate-400 mb-8">
          <div class="flex items-center">
            <div class="i-mdi-calendar-outline w-5 h-5 mr-2" />
            <time :datetime="post.date" class="font-medium">
              {{ new Date(post.date).toLocaleDateString('th-TH', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) }}
            </time>
          </div>
          
          <div class="w-1 h-1 bg-slate-400 rounded-full"></div>
          
          <div class="flex items-center">
            <div class="i-mdi-clock-outline w-5 h-5 mr-2" />
            <span class="font-medium">{{ post.readingTime }} นาทีในการอ่าน</span>
          </div>
        </div>
        
        <!-- Decorative gradient line -->
        <div class="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto"></div>
      </header>

      <!-- Article Content -->
      <div class="relative">
        <!-- Background decoration -->
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-3xl"></div>
        
        <div class="bg-white/90 dark:bg-slate-800/90 rounded-2xl p-8 sm:p-12 border border-white/50 dark:border-slate-700/50 
                    shadow-2xl backdrop-blur-sm relative z-10">
          <div 
            v-html="renderedContent" 
            class="prose prose-lg prose-slate dark:prose-invert max-w-none
                   prose-headings:text-slate-800 dark:prose-headings:text-slate-100
                   prose-headings:font-bold prose-headings:tracking-tight
                   prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
                   prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline 
                   hover:prose-a:underline prose-a:font-medium
                   prose-strong:text-slate-800 dark:prose-strong:text-slate-200
                   prose-code:text-pink-600 dark:prose-code:text-pink-400 
                   prose-code:bg-slate-100 dark:prose-code:bg-slate-800
                   prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                   prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700
                   prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-lg
                   prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 
                   dark:prose-blockquote:bg-blue-900/20 prose-blockquote:rounded-lg 
                   prose-blockquote:px-6 prose-blockquote:py-4
                   prose-ul:text-slate-700 dark:prose-ul:text-slate-300
                   prose-ol:text-slate-700 dark:prose-ol:text-slate-300
                   prose-li:marker:text-blue-500">
          </div>
        </div>
      </div>
      
      <!-- Back to Blog CTA -->
      <div class="text-center mt-16">
        <NuxtLink 
          to="/blog"
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                 text-white font-medium rounded-full hover:from-blue-700 hover:to-purple-700 
                 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <div class="i-mdi-arrow-left w-5 h-5 mr-2" />
          <span>กลับไปยังบทความอื่น</span>
        </NuxtLink>
      </div>
    </article>
  </div>
</template>

