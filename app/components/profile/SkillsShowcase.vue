<script setup lang="ts">
interface Skill {
  name: string;
  level: number; // 1-5
  category: string;
  icon?: string;
  years?: number;
  projects?: number;
}

// Mock data - replace with real data from API or config
const skills = ref<Skill[]>([
  // Frontend
  { name: "Vue.js", level: 5, category: "Frontend", icon: "mdi:vuejs", years: 5, projects: 12 },
  { name: "Nuxt.js", level: 5, category: "Frontend", icon: "mdi:nuxt", years: 4, projects: 8 },
  { name: "TypeScript", level: 4, category: "Frontend", icon: "mdi:language-typescript", years: 4, projects: 15 },
  { name: "React", level: 3, category: "Frontend", icon: "mdi:react", years: 2, projects: 4 },
  { name: "Tailwind CSS", level: 4, category: "Frontend", icon: "mdi:tailwind", years: 3, projects: 10 },
  
  // Backend
  { name: "Node.js", level: 4, category: "Backend", icon: "mdi:nodejs", years: 4, projects: 8 },
  { name: "Express.js", level: 4, category: "Backend", icon: "mdi:nodejs", years: 3, projects: 6 },
  { name: "PostgreSQL", level: 3, category: "Backend", icon: "mdi:database", years: 2, projects: 4 },
  { name: "MongoDB", level: 3, category: "Backend", icon: "mdi:leaf", years: 2, projects: 3 },
  
  // Tools & DevOps
  { name: "Git", level: 5, category: "Tools", icon: "mdi:git", years: 6, projects: 20 },
  { name: "Docker", level: 3, category: "Tools", icon: "mdi:docker", years: 2, projects: 5 },
  { name: "Vercel", level: 4, category: "Tools", icon: "mdi:vercel", years: 3, projects: 12 },
  { name: "AWS", level: 2, category: "Tools", icon: "mdi:aws", years: 1, projects: 2 },
]);

// Computed
const skillsByCategory = computed(() => {
  const grouped = skills.value.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
  
  // Sort each category by level (highest first)
  Object.keys(grouped).forEach(category => {
    grouped[category].sort((a, b) => b.level - a.level);
  });
  
  return grouped;
});

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

const getTotalProjects = () => {
  return skills.value.reduce((sum, skill) => sum + (skill.projects || 0), 0);
};

const getTotalYears = () => {
  return Math.max(...skills.value.map(skill => skill.years || 0));
};

const getTopSkills = (count: number = 5) => {
  return skills.value
    .sort((a, b) => b.level - a.level)
    .slice(0, count);
};
</script>

<template>
  <section class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h2 class="text-3xl font-bold text-primary dark:text-primary-dark mb-4">
        Skills & Expertise
      </h2>
      <p class="text-secondary max-w-2xl mx-auto">
        Technologies and tools I work with professionally
      </p>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 text-center">
        <div class="text-3xl font-bold text-accent mb-2">{{ skills.length }}</div>
        <div class="text-sm text-secondary">Technologies</div>
      </div>
      
      <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 text-center">
        <div class="text-3xl font-bold text-accent mb-2">{{ getTotalYears() }}</div>
        <div class="text-sm text-secondary">Years Experience</div>
      </div>
      
      <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6 text-center">
        <div class="text-3xl font-bold text-accent mb-2">{{ getTotalProjects() }}</div>
        <div class="text-sm text-secondary">Projects Completed</div>
      </div>
    </div>

    <!-- Top Skills -->
    <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-primary dark:text-primary-dark mb-4">
        Top Expertise
      </h3>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="skill in getTopSkills(8)"
          :key="skill.name"
          class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-700 rounded-full border border-surface-200 dark:border-surface-600"
        >
          <Icon v-if="skill.icon" :name="skill.icon" class="text-lg" />
          <span class="font-medium">{{ skill.name }}</span>
          <div class="flex gap-1">
            <div
              v-for="i in 5"
              :key="i"
              :class="[
                'w-2 h-2 rounded-full',
                i <= skill.level ? getLevelColor(skill.level) : 'bg-gray-300 dark:bg-gray-600'
              ]"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills by Category -->
    <div class="space-y-8">
      <div
        v-for="(categorySkills, category) in skillsByCategory"
        :key="category"
        class="space-y-4"
      >
        <h3 class="text-xl font-semibold text-primary dark:text-primary-dark">
          {{ category }}
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="skill in categorySkills"
            :key="skill.name"
            class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4"
          >
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
        </div>
      </div>
    </div>

    <!-- Learning Path -->
    <div class="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-6 border border-accent/20">
      <h3 class="text-xl font-semibold text-primary dark:text-primary-dark mb-4">
        Currently Learning
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex items-center gap-3">
          <Icon name="mdi:school" class="text-2xl text-accent" />
          <div>
            <div class="font-medium">Rust</div>
            <div class="text-sm text-secondary">Systems programming</div>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <Icon name="mdi:cloud" class="text-2xl text-accent" />
          <div>
            <div class="font-medium">Kubernetes</div>
            <div class="text-sm text-secondary">Container orchestration</div>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <Icon name="mdi:brain" class="text-2xl text-accent" />
          <div>
            <div class="font-medium">Machine Learning</div>
            <div class="text-sm text-secondary">AI/ML fundamentals</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
