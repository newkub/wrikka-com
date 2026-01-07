<script setup lang="ts">
interface ErrorBoundaryProps {
	error?: Error | null;
	reset?: () => void;
}

const props = defineProps<ErrorBoundaryProps>();

const errorMessage = computed(() => {
	if (!props.error) return "An unexpected error occurred";

	if (props.error.name === "FetchError") {
		return "Failed to load data. Please check your connection and try again.";
	}

	return props.error.message || "Something went wrong";
});

const handleRetry = () => {
	if (props.reset) {
		props.reset();
	} else {
		window.location.reload();
	}
};
</script>

<template>
	<div class="bg-secondary dark:bg-surface-800 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
		<div class="mb-4">
			<Icon name="mdi:alert-circle" class="text-4xl text-red-500" />
		</div>
		<h3 class="text-lg font-semibold text-primary dark:text-primary-dark mb-2">
			Oops! Something went wrong
		</h3>
		<p class="text-secondary dark:text-secondary-dark mb-4">
			{{ errorMessage }}
		</p>
		<div class="flex gap-2 justify-center">
			<button
				@click="handleRetry"
				class="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors focus-visible:(outline-none ring-2 ring-accent ring-offset-2)"
			>
				Try Again
			</button>
			<NuxtLink
				to="/"
				class="px-4 py-2 border border-custom rounded-md hover:bg-tertiary transition-colors focus-visible:(outline-none ring-2 ring-accent ring-offset-2)"
			>
				Go Home
			</NuxtLink>
		</div>
	</div>
</template>
