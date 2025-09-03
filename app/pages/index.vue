<script setup lang="ts">
import { ref } from "vue";
import { useColorMode } from "@vueuse/core";

interface Project {
	id: number;
	title: string;
	description: string;
	image: string;
	github?: string;
	npm?: string;
	website?: string;
	stackblitz?: string;
	gradient: string;
}

// Helper function to get the first available link
const getProjectLink = (project: Project) => {
	return (
		project.website ||
		project.github ||
		project.stackblitz ||
		project.npm ||
		"#"
	);
};

const colorMode = useColorMode();
const isMounted = ref(false);

onMounted(() => {
	isMounted.value = true;
});

const projects = ref<Project[]>([
	{
		id: 1,
		title: "learn.wrikka.com",
		description: "Learning platform and documentation with interactive tutorials",
		image: "https://images.unsplash.com/photo-1509869175650-a1d97972541a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		github: "https://github.com/wrikka/learn",
		website: "https://learn.wrikka.com",
		gradient: "from-purple-500 to-pink-500"
	},
	{
		id: 2,
		title: "Git Interactive CLI",
		description: "Modern command-line interface for streamlined Git workflows",
		image: "https://images.unsplash.com/photo-1562907550-096d3bf9b25c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		github: "https://github.com/wrikka/git-interactive-cli",
		npm: "https://npmjs.com/package/@wrikka/git-interactive-cli",
		gradient: "from-blue-500 to-cyan-500"
	},
	{
		id: 3,
		title: "Build Package",
		description: "Zero-config package builder with intelligent optimization",
		image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		github: "https://github.com/wrikka/build-package",
		npm: "https://npmjs.com/package/@wrikka/build-package",
		gradient: "from-green-500 to-emerald-500"
	},
	{
		id: 4,
		title: "UI Components",
		description: "Beautiful, accessible components built with modern standards",
		image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		github: "https://github.com/wrikka/ui",
		npm: "https://npmjs.com/package/@wrikka/ui",
		website: "https://ui.wrikka.com",
		gradient: "from-orange-500 to-red-500"
	},
	{
		id: 5,
		title: "Development Blog",
		description: "Technical insights, tutorials and development experiences",
		image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
		website: "/blog",
		gradient: "from-indigo-500 to-purple-500"
	},
]);

const socialLinks = {
	github: "https://github.com/wrikka",
	facebook: "https://facebook.com/wrikka",
	twitter: "https://twitter.com/wrikka",
	stackblitz: "https://stackblitz.com/@wrikka",
	website: "https://wrikka.com",
};

function toggleDark() {
	colorMode.value = colorMode.value === "dark" ? "light" : "dark";
}
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <Transition name="fade" mode="out-in">
      <div v-if="isMounted" class="animate-fade-in">
        <!-- Header with social links and theme toggle -->
        <header class="py-8 sm:py-12">
          <div class="text-center mb-8">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Wrikka Projects
            </h1>
            <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Modern web applications and developer tools built with passion
            </p>
          </div>
          
          <!-- Social Links -->
          <div class="flex justify-center items-center gap-4 sm:gap-6 mb-8">
            <a :href="socialLinks.github" target="_blank" rel="noopener noreferrer" 
               class="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 
                      shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm">
              <div class="i-mdi-github w-6 h-6 text-slate-700 dark:text-slate-200" />
            </a>
            
            <a :href="socialLinks.facebook" target="_blank" rel="noopener noreferrer" 
               class="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-900/30 
                      shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm">
              <div class="i-mdi-facebook w-6 h-6 text-blue-600 dark:text-blue-400" />
            </a>
            
            <a :href="socialLinks.twitter" target="_blank" rel="noopener noreferrer" 
               class="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-sky-50 dark:hover:bg-sky-900/30 
                      shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm">
              <div class="i-mdi-twitter w-6 h-6 text-sky-500 dark:text-sky-400" />
            </a>
            
            <a :href="socialLinks.stackblitz" target="_blank" rel="noopener noreferrer" 
               class="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-orange-50 dark:hover:bg-orange-900/30 
                      shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 368" class="w-6 h-6 text-orange-500">
                <path fill="currentColor" d="M109.586 217.013H0L200.34 0l-53.926 150.233H256L55.645 367.246l53.927-150.233z"/>
              </svg>
            </a>
            
            <a :href="socialLinks.website" target="_blank" rel="noopener noreferrer" 
               class="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-purple-50 dark:hover:bg-purple-900/30 
                      shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm">
              <div class="i-mdi-web w-6 h-6 text-purple-600 dark:text-purple-400" />
            </a>

            <button 
              @click="toggleDark"
              class="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-amber-900/30 
                     shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label="Toggle dark mode"
            >
              <div class="i-mdi-white-balance-sunny w-6 h-6 text-amber-500" />
            </button>
          </div>
        </header>

        <!-- Projects Grid -->
        <main class="pb-16">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <a 
              v-for="project in projects" 
              :key="project.id" 
              :href="getProjectLink(project)"
              target="_blank"
              rel="noopener noreferrer"
              class="group block"
            >
              <article class="h-full bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg hover:shadow-2xl 
                             transition-all duration-500 overflow-hidden backdrop-blur-sm border border-white/50 dark:border-slate-700/50
                             hover:scale-[1.02] hover:rotate-1">
                
                <!-- Project Image with Gradient Overlay -->
                <div class="relative h-48 sm:h-56 overflow-hidden">
                  <img 
                    :src="project.image" 
                    :alt="project.title"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div :class="`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <!-- Project Links Overlay -->
                  <div class="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span v-if="project.github" 
                          class="p-1.5 bg-black/20 backdrop-blur-sm rounded-full"
                          title="GitHub">
                      <div class="i-mdi-github w-4 h-4 text-white" />
                    </span>
                    <span v-if="project.npm" 
                          class="p-1.5 bg-black/20 backdrop-blur-sm rounded-full"
                          title="NPM">
                      <div class="i-mdi-npm w-4 h-4 text-white" />
                    </span>
                    <span v-if="project.website" 
                          class="p-1.5 bg-black/20 backdrop-blur-sm rounded-full"
                          title="Website">
                      <div class="i-mdi-web w-4 h-4 text-white" />
                    </span>
                  </div>
                </div>
                
                <!-- Project Content -->
                <div class="p-6">
                  <h2 class="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ project.title }}
                  </h2>
                  <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {{ project.description }}
                  </p>
                  
                  <!-- Action indicator -->
                  <div class="flex items-center mt-4 text-blue-600 dark:text-blue-400 font-medium">
                    <span class="text-sm">Explore project</span>
                    <div class="i-mdi-arrow-right ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </a>
          </div>
        </main>
      </div>
    </Transition>
  </div>
</template>

