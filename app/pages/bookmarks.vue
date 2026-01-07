<script setup lang="ts">
// SEO
useSEO({
  title: "Bookmarks - Wrikka",
  description: "Your saved blog posts and projects",
  type: "website",
  keywords: ["bookmarks", "saved", "favorites", "reading list"],
  author: "Veerapong",
});

// State
const bookmarks = ref<{
  blogs: Array<{ slug: string; title: string; description: string; date: string }>;
  projects: Array<{ name: string; description: string; stars?: number; url?: string }>;
}>({
  blogs: [],
  projects: [],
});

const loading = ref(true);
const error = ref<string | null>(null);
const activeTab = ref<'blogs' | 'projects'>('blogs');

// Load bookmarks from localStorage
const loadBookmarks = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const bookmarkedItems = localStorage.getItem('bookmarkedItems');
    if (!bookmarkedItems) {
      bookmarks.value = { blogs: [], projects: [] };
      return;
    }
    
    const bookmarked = JSON.parse(bookmarkedItems);
    const blogSlugs = Object.keys(bookmarked).filter(key => 
      key.startsWith('blog:') && bookmarked[key]
    ).map(key => key.replace('blog:', ''));
    
    const projectNames = Object.keys(bookmarked).filter(key => 
      key.startsWith('project:') && bookmarked[key]
    ).map(key => key.replace('project:', ''));
    
    // Fetch bookmarked blog posts
    const blogs = blogSlugs.length > 0 
      ? await $fetch('/api/blog').then(posts => 
          posts.filter((post: any) => blogSlugs.includes(post.slug))
        ).catch(() => [])
      : [];
    
    // Fetch bookmarked projects
    const projects = projectNames.length > 0
      ? await $fetch('/api/projects').then(projectList => 
          projectList.filter((project: any) => projectNames.includes(project.name))
        ).catch(() => [])
      : [];
    
    bookmarks.value = { blogs, projects };
  } catch (err) {
    error.value = 'Failed to load bookmarks';
    console.error('Error loading bookmarks:', err);
  } finally {
    loading.value = false;
  }
};

// Remove bookmark
const removeBookmark = (itemId: string, itemType: 'blog' | 'project') => {
  const bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedItems') || '{}');
  const key = `${itemType}:${itemId}`;
  delete bookmarkedItems[key];
  localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarkedItems));
  
  // Update local state
  if (itemType === 'blogs') {
    bookmarks.value.blogs = bookmarks.value.blogs.filter(blog => blog.slug !== itemId);
  } else {
    bookmarks.value.projects = bookmarks.value.projects.filter(project => project.name !== itemId);
  }
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Load bookmarks on mount
onMounted(() => {
  loadBookmarks();
});
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <!-- Header -->
    <section class="text-center">
      <h1 class="text-4xl font-extrabold text-primary dark:text-primary-dark mb-4">
        My Bookmarks
      </h1>
      <p class="text-lg text-secondary">
        Your saved blog posts and projects
      </p>
    </section>

    <!-- Tabs -->
    <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-1">
      <div class="flex gap-1">
        <button
          @click="activeTab = 'blogs'"
          :class="[
            'flex-1 px-4 py-2 rounded-md font-medium transition-colors',
            activeTab === 'blogs'
              ? 'bg-white dark:bg-surface-700 text-accent shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          <Icon name="mdi:article" class="mr-2" />
          Blog Posts ({{ bookmarks.blogs.length }})
        </button>
        
        <button
          @click="activeTab = 'projects'"
          :class="[
            'flex-1 px-4 py-2 rounded-md font-medium transition-colors',
            activeTab === 'projects'
              ? 'bg-white dark:bg-surface-700 text-accent shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          <Icon name="mdi:github" class="mr-2" />
          Projects ({{ bookmarks.projects.length }})
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      <p class="mt-2 text-gray-400">Loading bookmarks...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <Icon name="mdi:alert-circle" class="text-4xl text-red-500 mb-4" />
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="bookmarks.blogs.length === 0 && bookmarks.projects.length === 0" class="text-center py-12">
      <Icon name="mdi:bookmark-outline" class="text-4xl text-gray-400 mb-4" />
      <p class="text-gray-400 mb-4">No bookmarks yet</p>
      <p class="text-sm text-gray-500 mb-6">
        Start bookmarking your favorite blog posts and projects
      </p>
      <div class="flex gap-4 justify-center">
        <NuxtLink
          to="/blog"
          class="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
        >
          Browse Blog
        </NuxtLink>
        <NuxtLink
          to="/projects"
          class="px-4 py-2 bg-surface-200 dark:bg-surface-700 text-primary dark:text-primary-dark rounded-lg hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
        >
          Browse Projects
        </NuxtLink>
      </div>
    </div>

    <!-- Bookmarked Blogs -->
    <div v-else-if="activeTab === 'blogs'" class="space-y-4">
      <div
        v-for="blog in bookmarks.blogs"
        :key="blog.slug"
        class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 border border-surface-200 dark:border-surface-700"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-primary dark:text-primary-dark mb-2">
              <NuxtLink
                :to="`/blog/${blog.slug}`"
                class="hover:text-accent transition-colors"
              >
                {{ blog.title }}
              </NuxtLink>
            </h3>
            
            <p class="text-secondary mb-3">
              {{ blog.description }}
            </p>
            
            <div class="flex items-center gap-4 text-sm text-gray-400">
              <span>{{ formatDate(blog.date) }}</span>
            </div>
          </div>
          
          <button
            @click="removeBookmark(blog.slug, 'blogs')"
            class="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove bookmark"
          >
            <Icon name="mdi:bookmark-remove" class="text-xl" />
          </button>
        </div>
      </div>
    </div>

    <!-- Bookmarked Projects -->
    <div v-else-if="activeTab === 'projects'" class="space-y-4">
      <div
        v-for="project in bookmarks.projects"
        :key="project.name"
        class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 border border-surface-200 dark:border-surface-700"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-primary dark:text-primary-dark mb-2">
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-accent transition-colors"
              >
                {{ project.name }}
              </a>
              <span v-else>{{ project.name }}</span>
            </h3>
            
            <p class="text-secondary mb-3">
              {{ project.description }}
            </p>
            
            <div class="flex items-center gap-4 text-sm text-gray-400">
              <span v-if="project.stars" class="flex items-center gap-1">
                <Icon name="mdi:star" class="text-yellow-500" />
                {{ project.stars }}
              </span>
            </div>
          </div>
          
          <button
            @click="removeBookmark(project.name, 'projects')"
            class="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove bookmark"
          >
            <Icon name="mdi:bookmark-remove" class="text-xl" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
