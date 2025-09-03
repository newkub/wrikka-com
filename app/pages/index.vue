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
		description: "Learning platform and documentation",
		image:
			"https://images.unsplash.com/photo-1509869175650-a1d97972541a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
		github: "https://github.com/wrikka/learn",
		website: "https://learn.wrikka.com",
	},
	{
		id: 2,
		title: "Git Interactive CLI",
		description: "Interactive command-line interface for Git operations",
		image:
			"https://images.unsplash.com/photo-1562907550-096d3bf9b25c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
		github: "https://github.com/wrikka/git-interactive-cli",
		npm: "https://npmjs.com/package/@wrikka/git-interactive-cli",
	},
	{
		id: 3,
		title: "Build Package from One Command",
		description: "One-command solution for package building and deployment",
		image:
			"https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
		github: "https://github.com/wrikka/build-package",
		npm: "https://npmjs.com/package/@wrikka/build-package",
	},
	{
		id: 4,
		title: "ui.wrikka.com",
		description: "Component library and design system",
		image:
			"https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
		github: "https://github.com/wrikka/ui",
		npm: "https://npmjs.com/package/@wrikka/ui",
		website: "https://ui.wrikka.com",
	},
	{
		id: 5,
		title: "blog.wrikka.com",
		description: "Insights, tutorials and thoughts on development",
		image:
			"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
		website: "/blog",
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
  <div class="min-h-screen bg-background transition-slow">
    <Transition name="fade" mode="out-in">
      <div v-if="isMounted" class="animate-fade-in">
        <header class="p-3 sm:p-4 flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6">
          <!-- GitHub -->
          <a :href="socialLinks.github" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-text transition-fast">
            <div class="i-mdi-github w-6 h-6" />
          </a>
          
          <!-- Facebook -->
          <a :href="socialLinks.facebook" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-[#1877F2] transition-fast">
            <div class="i-mdi-facebook w-6 h-6" />
          </a>
          
          <!-- Twitter -->
          <a :href="socialLinks.twitter" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-text transition-fast">
            <div class="i-mdi-twitter w-6 h-6" />
          </a>
          
          <!-- StackBlitz -->
          <a :href="socialLinks.stackblitz" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-info transition-fast">
            <div class="w-6 h-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 368" class="w-5 h-5">
                <path fill="currentColor" d="M109.586 217.013H0L200.34 0l-53.926 150.233H256L55.645 367.246l53.927-150.233z"/>
              </svg>
            </div>
          </a>
          
          <!-- Website -->
          <a :href="socialLinks.website" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-primary transition-fast">
            <div class="i-mdi-web w-6 h-6" />
          </a>

          <button 
            @click="toggleDark"
            class="text-text-muted hover:text-text transition-fast w-8 h-8 flex items-center justify-center hover:cursor-pointer"
            aria-label="Toggle dark mode"
          >
            <div class="i-mdi-white-balance-sunny w-6 h-6" />
          </button>
        </header>

        <main class="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl py-6 sm:py-8">
          <h1 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-text text-center">My Projects</h1>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr">
            <a 
              v-for="project in projects" 
              :key="project.id" 
              :href="getProjectLink(project)"
              target="_blank"
              rel="noopener noreferrer"
              class="group block project-card"
            >
              <div class="bg-surface rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-normal border border-border hover:border-primary h-full flex flex-col">
                <!-- Project Image -->
                <div class="relative pt-[56.25%] overflow-hidden">
                  <img 
                    :src="project.image" 
                    :alt="project.title"
                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <!-- Project Content -->
                <div class="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  <h2 class="text-lg sm:text-xl font-bold text-text mb-1 sm:mb-2">{{ project.title }}</h2>
                  <p class="text-sm sm:text-base text-text-secondary flex-1">{{ project.description }}</p>
                  
                  <!-- Project Links -->
                  <div class="flex gap-2 mt-3">
                    <a v-if="project.github" :href="project.github" target="_blank" 
                       class="text-text-muted hover:text-text transition-fast"
                       title="GitHub">
                      <div class="i-mdi-github w-5 h-5" />
                    </a>
                    <a v-if="project.npm" :href="project.npm" target="_blank" 
                       class="text-text-muted hover:text-error transition-fast"
                       title="NPM">
                      <div class="i-mdi-npm w-5 h-5" />
                    </a>
                    <a v-if="project.stackblitz" :href="project.stackblitz" target="_blank" 
                       class="text-text-muted hover:text-info transition-fast"
                       title="StackBlitz">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 368" class="w-5 h-5">
                        <path fill="currentColor" d="M109.586 217.013H0L200.34 0l-53.926 150.233H256L55.645 367.246l53.927-150.233z"/>
                      </svg>
                    </a>
                    <a v-if="project.website" :href="project.website" target="_blank" 
                       class="text-text-muted hover:text-primary transition-fast"
                       title="Website">
                      <div class="i-mdi-web w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </main>
      </div>
    </Transition>
  </div>
</template>

