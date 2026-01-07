<script setup lang="ts">
interface Skill {
  name: string;
  level: number; // 1-5
  category: string;
  icon?: string;
  years?: number;
  projects?: number;
}

interface Props {
  skill: Skill;
}

defineProps<Props>();

const getLevelColor = (level: number) => {
  const colors = [
    'bg-red-500',
    'bg-orange-500', 
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
  ];
  return colors[level - 1] || 'bg-gray-500';
};

const getLevelText = (level: number) => {
  const levels = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
  return levels[level - 1] || 'Unknown';
};
</script>

<template>
  <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-3">
        <Icon
          v-if="skill.icon"
          :name="skill.icon"
          class="text-2xl text-accent"
        />
        <div>
          <h4 class="font-semibold text-primary dark:text-primary-dark">
            {{ skill.name }}
          </h4>
          <p class="text-sm text-secondary">
            {{ getLevelText(skill.level) }}
          </p>
        </div>
      </div>
      
      <div class="text-right">
        <div class="text-sm text-secondary">
          {{ skill.years }} {{ skill.years === 1 ? 'year' : 'years' }}
        </div>
        <div class="text-xs text-gray-400">
          {{ skill.projects }} projects
        </div>
      </div>
    </div>
    
    <!-- Skill Level Bar -->
    <div class="space-y-2">
      <div class="flex justify-between text-xs text-secondary">
        <span>Proficiency</span>
        <span>{{ skill.level }}/5</span>
      </div>
      <div class="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
        <div
          :class="['h-full rounded-full transition-all duration-500', getLevelColor(skill.level)]"
          :style="{ width: `${(skill.level / 5) * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>
