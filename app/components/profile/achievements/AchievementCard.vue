<script setup lang="ts">
interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'certification' | 'award' | 'milestone' | 'recognition';
  icon: string;
  issuer?: string;
  credentialUrl?: string;
  badgeUrl?: string;
}

interface Props {
  achievement: Achievement;
}

defineProps<Props>();

const getTypeColor = (type: string) => {
  const colors = {
    certification: 'text-blue-500',
    award: 'text-yellow-500',
    milestone: 'text-green-500',
    recognition: 'text-purple-500',
  };
  return colors[type as keyof typeof colors] || 'text-gray-500';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
};
</script>

<template>
  <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 hover:border-accent transition-all duration-300 group">
    <div class="flex items-start gap-4">
      <div class="flex-shrink-0">
        <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
          <Icon :name="achievement.icon" :class="['text-2xl', getTypeColor(achievement.type)]" />
        </div>
      </div>
      
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-primary dark:text-primary-dark mb-1">
          {{ achievement.title }}
        </h3>
        <p class="text-sm text-secondary mb-2">
          {{ achievement.description }}
        </p>
        
        <div class="flex items-center justify-between text-xs text-gray-400">
          <span>{{ formatDate(achievement.date) }}</span>
          <span v-if="achievement.issuer">{{ achievement.issuer }}</span>
        </div>
        
        <a
          v-if="achievement.credentialUrl"
          :href="achievement.credentialUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 mt-2 text-xs text-accent hover:underline"
        >
          <Icon name="mdi:external-link" class="text-sm" />
          View Credential
        </a>
      </div>
    </div>
  </div>
</template>
