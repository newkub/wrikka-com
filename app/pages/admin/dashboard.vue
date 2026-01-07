<script setup lang="ts">
// Authentication middleware
definePageMeta({
  middleware: 'admin-auth'
});

const {
  posts,
  loading: postsLoading,
  error: postsError,
  refreshPosts
} = useAdminPosts();

// SEO
useSEO({
  title: "Admin Dashboard - Wrikka",
  description: "Manage blog posts and content",
  type: "website",
  keywords: ["admin", "dashboard", "cms", "content management"],
  author: "Veerapong",
});

// State
const selectedPost = ref(null);
const showEditor = ref(false);
const isEditing = ref(false);
const searchQuery = ref('');
const filterStatus = ref('all');

// Computed
const filteredPosts = computed(() => {
  if (!posts.value) return [];
  
  return posts.value.filter(post => {
    const matchesSearch = !searchQuery.value || 
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesFilter = filterStatus.value === 'all' ||
      (filterStatus.value === 'published' && post.published) ||
      (filterStatus.value === 'draft' && !post.published);
    
    return matchesSearch && matchesFilter;
  });
});

// Methods
const createNewPost = () => {
  selectedPost.value = null;
  isEditing.value = false;
  showEditor.value = true;
};

const editPost = (post) => {
  selectedPost.value = post;
  isEditing.value = true;
  showEditor.value = true;
};

const deletePost = async (post) => {
  if (!confirm(`Are you sure you want to delete "${post.title}"?`)) {
    return;
  }

  try {
    await $fetch(`/api/admin/posts/${post.slug}`, {
      method: 'DELETE'
    });
    
    await refreshPosts();
  } catch (error) {
    console.error('Error deleting post:', error);
    alert('Failed to delete post');
  }
};

const togglePublishStatus = async (post) => {
  try {
    await $fetch(`/api/admin/posts/${post.slug}`, {
      method: 'PUT',
      body: {
        ...post,
        published: !post.published
      }
    });
    
    await refreshPosts();
  } catch (error) {
    console.error('Error toggling publish status:', error);
    alert('Failed to update post');
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusColor = (published) => {
  return published ? 'text-green-600' : 'text-yellow-600';
};

const getStatusText = (published) => {
  return published ? 'Published' : 'Draft';
};

// Load data on mount
onMounted(() => {
  refreshPosts();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <Icon name="mdi:view-dashboard" class="text-2xl text-accent mr-3" />
            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
          
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/"
              class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <Icon name="mdi:home" class="text-xl" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="mdi:article" class="text-2xl text-blue-500" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Posts</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ posts?.length || 0 }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="mdi:check-circle" class="text-2xl text-green-500" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ posts?.filter(p => p.published).length || 0 }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="mdi:file-document-edit" class="text-2xl text-yellow-500" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Drafts</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ posts?.filter(p => !p.published).length || 0 }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="mdi:star" class="text-2xl text-purple-500" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Featured</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ posts?.filter(p => p.featured).length || 0 }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions Bar -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Blog Posts
            </h2>
            
            <button
              @click="createNewPost"
              class="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              <Icon name="mdi:plus" />
              New Post
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="px-6 py-4 flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search posts..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <select
            v-model="filterStatus"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      <!-- Posts List -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div v-if="postsLoading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          <p class="mt-2 text-gray-400">Loading posts...</p>
        </div>

        <div v-else-if="postsError" class="text-center py-12">
          <Icon name="mdi:alert-circle" class="text-4xl text-red-500 mb-4" />
          <p class="text-red-500">Failed to load posts</p>
        </div>

        <div v-else-if="filteredPosts.length === 0" class="text-center py-12">
          <Icon name="mdi:file-document" class="text-4xl text-gray-400 mb-4" />
          <p class="text-gray-400">No posts found</p>
        </div>

        <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
          <div
            v-for="post in filteredPosts"
            :key="post.slug"
            class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white truncate">
                    {{ post.title }}
                  </h3>
                  
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      post.published 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    ]"
                  >
                    {{ getStatusText(post.published) }}
                  </span>

                  <span
                    v-if="post.featured"
                    class="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    Featured
                  </span>
                </div>

                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {{ post.description }}
                </p>

                <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{{ formatDate(post.date) }}</span>
                  <span v-if="post.author">by {{ post.author }}</span>
                  <span v-if="post.readingTime">{{ post.readingTime }} min read</span>
                  <div v-if="post.tags && post.tags.length" class="flex gap-1">
                    <span
                      v-for="tag in post.tags.slice(0, 3)"
                      :key="tag"
                      class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2 ml-4">
                <button
                  @click="editPost(post)"
                  class="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  title="Edit"
                >
                  <Icon name="mdi:pencil" />
                </button>

                <button
                  @click="togglePublishStatus(post)"
                  class="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  :title="post.published ? 'Unpublish' : 'Publish'"
                >
                  <Icon :name="post.published ? 'mdi:eye-off' : 'mdi:eye'" />
                </button>

                <button
                  @click="deletePost(post)"
                  class="p-2 text-red-600 hover:text-red-700 transition-colors"
                  title="Delete"
                >
                  <Icon name="mdi:delete" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Editor Modal -->
    <AdminPostEditor
      v-if="showEditor"
      :post="selectedPost"
      :is-editing="isEditing"
      @close="showEditor = false"
      @saved="refreshPosts"
    />
  </div>
</template>
