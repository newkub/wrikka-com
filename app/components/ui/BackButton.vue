<script setup lang="ts">
const props = defineProps<{
	target: string;
	tooltip: string;
}>();

const router = useRouter();

const navigate = () => {
	router.push(props.target);
};
</script>

<template>
	<button
		@click="navigate"
		class="fixed top-1/2 left-4 -translate-y-1/2 z-40 group"
	>
		<div class="relative">
			<!-- Background circle with glow -->
			<div class="w-12 h-12 bg-card/90 dark:bg-card-dark/90 backdrop-blur-md rounded-full shadow-lg border border-surface-200/50 dark:border-surface-200-dark/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:bg-accent/10 dark:group-hover:bg-accent-dark/10">
				<div class="i-mdi-arrow-left w-5 h-5 text-accent dark:text-accent-dark transition-transform duration-200 group-hover:-translate-x-1 group-hover:scale-110" />
			</div>

			<!-- Pulse animation ring -->
			<div class="absolute inset-0 w-12 h-12 border-2 border-accent/20 dark:border-accent-dark/20 rounded-full animate-pulse opacity-50 group-hover:animate-none">
			</div>

			<!-- Tooltip -->
			<div class="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
				{{ tooltip }}
			</div>
		</div>
	</button>
</template>
