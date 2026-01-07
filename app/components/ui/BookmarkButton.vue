<script setup lang="ts">
interface Props {
  itemId: string;
  itemType: 'blog' | 'project';
  initialBookmarked?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  initialBookmarked: false,
});

const isBookmarked = ref(props.initialBookmarked);
const isLoading = ref(false);

// Get bookmarked items from localStorage
const getBookmarkedItems = () => {
  const stored = localStorage.getItem('bookmarkedItems');
  return stored ? JSON.parse(stored) : {};
};

// Save bookmarked items to localStorage
const saveBookmarkedItems = (items: Record<string, boolean>) => {
  localStorage.setItem('bookmarkedItems', JSON.stringify(items));
};

// Toggle bookmark
const toggleBookmark = async () => {
  if (isLoading.value) return;
  
  isLoading.value = true;
  
  try {
    const bookmarkedItems = getBookmarkedItems();
    const key = `${props.itemType}:${props.itemId}`;
    
    bookmarkedItems[key] = !bookmarkedItems[key];
    isBookmarked.value = bookmarkedItems[key];
    
    saveBookmarkedItems(bookmarkedItems);
    
    // Emit event for parent components
    emit('bookmark-changed', {
      itemId: props.itemId,
      itemType: props.itemType,
      isBookmarked: isBookmarked.value,
    });
  } catch (error) {
    console.error('Error toggling bookmark:', error);
  } finally {
    isLoading.value = false;
  }
};

// Check initial bookmark status
onMounted(() => {
  const bookmarkedItems = getBookmarkedItems();
  const key = `${props.itemType}:${props.itemId}`;
  isBookmarked.value = bookmarkedItems[key] || props.initialBookmarked;
});

const emit = defineEmits<{
  'bookmark-changed': [data: {
    itemId: string;
    itemType: string;
    isBookmarked: boolean;
  }];
}>();
</script>

<template>
  <button
    @click="toggleBookmark"
    :disabled="isLoading"
    :class="[
      'p-2 rounded-lg transition-all duration-200',
      isBookmarked 
        ? 'bg-accent/10 text-accent hover:bg-accent/20' 
        : 'bg-surface-100 dark:bg-surface-700 text-gray-400 hover:text-accent hover:bg-accent/5',
      isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    ]"
    :title="isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'"
  >
    <Icon 
      :name="isBookmarked ? 'mdi:bookmark' : 'mdi:bookmark-outline'" 
      :class="['text-xl', isLoading && 'animate-pulse']"
    />
  </button>
</template>
