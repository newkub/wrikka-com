<script setup lang="ts">
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  date: string;
}

interface Props {
  testimonial: Testimonial;
}

defineProps<Props>();

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
};
</script>

<template>
  <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6">
    <div class="flex items-start gap-4 mb-4">
      <img
        :src="testimonial.avatar"
        :alt="testimonial.name"
        class="w-12 h-12 rounded-full object-cover"
      />
      
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-primary dark:text-primary-dark">
          {{ testimonial.name }}
        </h3>
        <p class="text-sm text-secondary">
          {{ testimonial.role }} at {{ testimonial.company }}
        </p>
      </div>
    </div>
    
    <div class="flex gap-1 mb-3">
      <Icon
        v-for="i in 5"
        :key="i"
        :name="i <= testimonial.rating ? 'mdi:star' : 'mdi:star-outline'"
        :class="i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'"
        class="text-sm"
      />
    </div>
    
    <blockquote class="text-secondary italic mb-4">
      "{{ testimonial.content }}"
    </blockquote>
    
    <div class="text-xs text-gray-400">
      {{ formatDate(testimonial.date) }}
    </div>
  </div>
</template>
