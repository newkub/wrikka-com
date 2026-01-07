<script setup lang="ts">
const {
  searchFilters,
  search,
  loading,
  error,
  availableTags,
  availableCategories,
  suggestions,
  clearFilters,
} = useAdvancedSearch();

// SEO
useSEO({
  title: "Search - Wrikka",
  description: "Search through blog posts, projects, and more on my portfolio website.",
  type: "website",
  keywords: ["search", "blog", "projects", "portfolio", "web development"],
  author: "Veerapong",
});

// Show suggestions dropdown
const showSuggestions = ref(false);
const searchInputRef = ref<HTMLInputElement>();

// Watch for query changes to show/hide suggestions
watch(() => searchFilters.value.query, () => {
  showSuggestions.value = searchFilters.value.query.length >= 2;
});

// Select suggestion
const selectSuggestion = (suggestion: string) => {
  searchFilters.value.query = suggestion;
  showSuggestions.value = false;
  searchInputRef.value?.blur();
};

// Close suggestions when clicking outside
onClickOutside(searchInputRef, () => {
  showSuggestions.value = false;
});

// Format date
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Get content type icon
const getContentTypeIcon = (type: 'blog' | 'project') => {
  return type === 'blog' ? 'mdi:article' : 'mdi:github';
};

// Get content type color
const getContentTypeColor = (type: 'blog' | 'project') => {
  return type === 'blog' ? 'text-blue-500' : 'text-green-500';
};
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <!-- Search Header -->
    <section class="text-center">
      <h1 class="text-4xl font-extrabold text-primary dark:text-primary-dark mb-4">
        Search
      </h1>
      <p class="text-lg text-secondary">
        Find blog posts, projects, and more
      </p>
    </section>

    <!-- Search Input -->
    <div class="relative">
      <div class="relative">
        <input
          ref="searchInputRef"
          v-model="searchFilters.query"
          type="text"
          placeholder="Search for anything..."
          class="w-full px-4 py-3 pl-12 pr-4 rounded-lg bg-surface-100 dark:bg-surface-200/10 border border-surface-200 dark:border-surface-800 text-primary dark:text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          @focus="showSuggestions = searchFilters.query.length >= 2"
        />
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon name="mdi:magnify" class="text-xl" />
        </span>
        <button
          v-if="searchFilters.query"
          @click="searchFilters.query = ''"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="mdi:close" class="text-xl" />
        </button>
      </div>

      <!-- Search Suggestions -->
      <div
        v-if="showSuggestions && suggestions.length > 0"
        class="absolute top-full left-0 right-0 mt-2 bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg shadow-lg z-10"
      >
        <div class="p-2">
          <div
            v-for="suggestion in suggestions"
            :key="suggestion"
            @click="selectSuggestion(suggestion)"
            class="px-3 py-2 rounded cursor-pointer hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
          >
            <div class="flex items-center gap-2">
              <Icon name="mdi:magnify" class="text-gray-400" />
              <span>{{ suggestion }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Filters -->
    <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Filters</h3>
        <button
          @click="clearFilters"
          class="text-sm text-accent hover:underline"
        >
          Clear all
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Content Type -->
        <div>
          <label class="block text-sm font-medium mb-2">Content Type</label>
          <select
            v-model="searchFilters.contentType"
            class="w-full px-3 py-2 rounded bg-surface-200 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 text-primary dark:text-primary-dark"
          >
            <option value="all">All</option>
            <option value="blog">Blog Posts</option>
            <option value="projects">Projects</option>
          </select>
        </div>

        <!-- Sort By -->
        <div>
          <label class="block text-sm font-medium mb-2">Sort By</label>
          <select
            v-model="searchFilters.sortBy"
            class="w-full px-3 py-2 rounded bg-surface-200 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 text-primary dark:text-primary-dark"
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>

        <!-- Date Range -->
        <div>
          <label class="block text-sm font-medium mb-2">From Date</label>
          <input
            v-model="searchFilters.dateRange.from"
            type="date"
            class="w-full px-3 py-2 rounded bg-surface-200 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 text-primary dark:text-primary-dark"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">To Date</label>
          <input
            v-model="searchFilters.dateRange.to"
            type="date"
            class="w-full px-3 py-2 rounded bg-surface-200 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 text-primary dark:text-primary-dark"
          />
        </div>
      </div>

      <!-- Tag Filters -->
      <div v-if="availableTags.length > 0">
        <label class="block text-sm font-medium mb-2">Tags</label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in availableTags"
            :key="tag"
            @click="searchFilters.tags.includes(tag) 
              ? searchFilters.tags = searchFilters.tags.filter(t => t !== tag)
              : searchFilters.tags.push(tag)"
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium transition-colors',
              searchFilters.tags.includes(tag)
                ? 'bg-accent text-white'
                : 'bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600',
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      <p class="mt-2 text-gray-400">Searching...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- Search Results -->
    <div v-else-if="search.length > 0" class="space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-400">
          Found {{ search.length }} results for "{{ searchFilters.query }}"
        </p>
      </div>

      <div class="space-y-4">
        <div
          v-for="result in search"
          :key="result.id"
          class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 border border-surface-200 dark:border-surface-700 hover:border-accent transition-colors"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <Icon 
                :name="getContentTypeIcon(result.type)" 
                :class="['text-2xl', getContentTypeColor(result.type)]"
              />
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-2">
                <span 
                  :class="[
                    'text-xs px-2 py-1 rounded font-medium',
                    result.type === 'blog' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  ]"
                >
                  {{ result.type === 'blog' ? 'Blog' : 'Project' }}
                </span>
                <span v-if="result.metadata.date" class="text-xs text-gray-400">
                  {{ formatDate(result.metadata.date) }}
                </span>
                <span v-if="result.metadata.stars" class="text-xs text-gray-400">
                  ⭐ {{ result.metadata.stars }}
                </span>
              </div>

              <h3 class="text-lg font-semibold mb-2">
                <NuxtLink 
                  :to="result.url"
                  class="text-primary dark:text-primary-dark hover:text-accent transition-colors"
                >
                  {{ result.title }}
                </NuxtLink>
              </h3>

              <p class="text-secondary mb-3">
                {{ result.description }}
              </p>

              <!-- Search Highlights -->
              <div v-if="result.highlights.length > 0" class="space-y-1">
                <div
                  v-for="(highlight, index) in result.highlights"
                  :key="index"
                  class="text-sm text-gray-400 italic"
                >
                  ...{{ highlight }}...
                </div>
              </div>

              <!-- Tags -->
              <div v-if="result.metadata.tags && result.metadata.tags.length > 0" class="flex flex-wrap gap-1 mt-3">
                <span
                  v-for="tag in result.metadata.tags.slice(0, 5)"
                  :key="tag"
                  class="text-xs px-2 py-1 bg-surface-200 dark:bg-surface-700 rounded"
                >
                  {{ tag }}
                </span>
                <span
                  v-if="result.metadata.tags.length > 5"
                  class="text-xs px-2 py-1 bg-surface-200 dark:bg-surface-700 rounded"
                >
                  +{{ result.metadata.tags.length - 5 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-else-if="searchFilters.query && !loading" class="text-center py-8">
      <Icon name="mdi:search-off" class="text-4xl text-gray-400 mb-4" />
      <p class="text-gray-400 mb-2">
        No results found for "{{ searchFilters.query }}"
      </p>
      <p class="text-sm text-gray-500">
        Try adjusting your filters or search terms
      </p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!searchFilters.query" class="text-center py-8">
      <Icon name="mdi:magnify" class="text-4xl text-gray-400 mb-4" />
      <p class="text-gray-400">
        Start typing to search for content
      </p>
    </div>
  </div>
</template>
