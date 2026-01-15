<script setup lang="ts">
import { ref } from "vue";

interface Props {
	code: string;
	language?: string;
	filename?: string;
}

const props = withDefaults(defineProps<Props>(), {
	language: "",
	filename: "",
});

const copied = ref(false);

const copyCode = async () => {
	try {
		const decodedCode = decodeURIComponent(props.code);
		await navigator.clipboard.writeText(decodedCode);
		copied.value = true;
		setTimeout(() => {
			copied.value = false;
		}, 2000);
	} catch (err) {
		console.error("Failed to copy code:", err);
	}
};
</script>

<template>
	<div class="code-block-wrapper group relative">
		<!-- Filename Header -->
		<div v-if="filename" class="flex items-center gap-0.5rem mb-0.75rem">
			<Icon name="mdi:file-code-outline" class="w-1rem h-1rem text-primary" />
			<span class="text-0.875rem font-600 text-foreground">{{ filename }}</span>
		</div>

		<!-- Copy Button -->
		<button
			@click="copyCode"
			class="absolute top-2 right-2 bg-surface hover:bg-muted-foreground text-foreground p-1.5 rounded-md transition-all-0.2s opacity-0 group-hover:opacity-100 z-10"
			:title="copied ? 'Copied!' : 'Copy code'"
		>
			<Icon
				v-if="!copied"
				name="mdi:content-copy"
				class="w-1rem h-1rem"
			/>
			<Icon
				v-else
				name="mdi:check"
				class="w-1rem h-1rem text-success-foreground"
			/>
		</button>

		<!-- Code Content -->
		<div class="code-content" v-html="code" />
	</div>
</template>

<style scoped>
.code-block-wrapper {
	position: relative;
	margin: 1rem 0;
}

.code-content {
	overflow-x: auto;
	border-radius: 0.5rem;
}

.code-content :deep(pre) {
	background-color: rgb(17, 24, 39);
	color: rgb(229, 231, 235);
	overflow-x: auto;
	font-weight: 400;
	font-size: 0.875em;
	line-height: 1.7142857;
	padding: 0.8571429em 1.1428571em;
	border-radius: 0.375rem;
}

.code-content :deep(pre code) {
	background-color: transparent;
	border-width: 0;
	border-radius: 0;
	padding: 0;
	font-weight: inherit;
	color: inherit;
	font-size: inherit;
	font-family: inherit;
	line-height: inherit;
}

.code-content :deep(.shiki) {
	background-color: transparent;
}

.code-content :deep(.shiki code) {
	color: rgb(243, 244, 246);
}
</style>
