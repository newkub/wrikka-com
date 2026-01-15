<script setup lang="ts">
import { useMarkdownRenderer } from "../composables/useMarkdownRenderer";
import CodeBlock from "./CodeBlock.vue";

const { render, extractCodeBlocks } = await useMarkdownRenderer();

interface Props {
	content: string;
}

const props = defineProps<Props>();

const renderedContent = computed(() => {
	if (!props.content) return "";
	return render(props.content);
});

const codeBlocks = computed(() => {
	return extractCodeBlocks(props.content);
});

const renderWithCodeBlocks = (content: string) => {
	// Replace code blocks with placeholders
	return content.replace(
		/```(\w+)?(?:\[([^\]]+)\])?\n([\s\S]*?)```/g,
		"___CODEBLOCK___",
	);
};
</script>

<template>
	<div class="markdown-content prose prose-sm max-w-none">
		<template v-for="(block, index) in codeBlocks" :key="index">
			<CodeBlock
				:code="block.code"
				:language="block.language"
				:filename="block.filename"
			/>
		</template>
		<div v-html="renderedContent"></div>
	</div>
</template>

<style scoped>
.markdown-content :deep(h1) {
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 1rem;
	color: var(--color-foreground);
	border-bottom: 2px solid var(--color-border);
	padding-bottom: 0.5rem;
}

.markdown-content :deep(h2) {
	font-size: 1.5rem;
	font-weight: 600;
	margin-bottom: 0.75rem;
	color: var(--color-foreground);
	border-bottom: 1px solid var(--color-border);
	padding-bottom: 0.5rem;
	margin-top: 2rem;
}

.markdown-content :deep(h3) {
	font-size: 1.25rem;
	font-weight: 600;
	margin-bottom: 0.5rem;
	color: var(--color-foreground);
	margin-top: 1.5rem;
}

.markdown-content :deep(h4) {
	font-size: 1.125rem;
	font-weight: 600;
	margin-bottom: 0.5rem;
	color: var(--color-foreground);
	margin-top: 1rem;
}

.markdown-content :deep(h5) {
	font-size: 1rem;
	font-weight: 600;
	margin-bottom: 0.5rem;
	color: var(--color-foreground);
	margin-top: 1rem;
}

.markdown-content :deep(h6) {
	font-size: 0.875rem;
	font-weight: 600;
	margin-bottom: 0.5rem;
	color: var(--color-foreground);
	margin-top: 1rem;
}

.markdown-content :deep(p) {
	font-size: 0.875rem;
	color: var(--color-muted-foreground);
	margin-bottom: 1rem;
	line-height: 1.6;
}

.markdown-content :deep(a) {
	color: var(--color-primary);
	text-decoration: underline;
	transition: color 0.2s;
}

.markdown-content :deep(a:hover) {
	color: var(--color-primary-hover);
}

.markdown-content :deep(ul), .markdown-content :deep(ol) {
	margin-bottom: 1rem;
	padding-left: 1.5rem;
}

.markdown-content :deep(li) {
	font-size: 0.875rem;
	color: var(--color-muted-foreground);
	margin-bottom: 0.5rem;
	line-height: 1.6;
}

.markdown-content :deep(ul) {
	list-style-type: disc;
}

.markdown-content :deep(ol) {
	list-style-type: decimal;
}

.markdown-content :deep(blockquote) {
	border-left: 4px solid var(--color-border);
	padding-left: 1rem;
	margin: 1rem 0;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	background-color: var(--color-muted);
	border-radius: 0.25rem;
	font-style: italic;
	color: var(--color-muted-foreground);
}

.markdown-content :deep(code) {
	background-color: var(--color-surface-elevated);
	border-radius: 0.25rem;
	padding-left: 0.25rem;
	padding-right: 0.25rem;
	padding-top: 0.125rem;
	padding-bottom: 0.125rem;
	font-size: 0.875rem;
	color: var(--color-foreground);
	font-family: monospace;
}

.markdown-content :deep(pre) {
	background-color: var(--color-surface-elevated);
	border-radius: 0.5rem;
	padding: 1rem;
	overflow-x: auto;
	margin: 1rem 0;
}

.markdown-content :deep(pre code) {
	background-color: transparent;
	padding: 0;
}

.markdown-content :deep(code) {
	font-size: 0.875rem;
}

.markdown-content :deep(pre) {
	font-size: 0.875rem;
}

.markdown-content :deep(table) {
	width: 100%;
	margin: 1rem 0;
	border-collapse: collapse;
	border: 1px solid var(--color-border);
}

.markdown-content :deep(th) {
	background-color: var(--color-surface-elevated);
	text-align: left;
	padding-left: 0.75rem;
	padding-right: 0.75rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	font-size: 0.75rem;
	font-weight: 600;
	color: var(--color-foreground);
	border-bottom: 1px solid var(--color-border);
}

.markdown-content :deep(td) {
	padding-left: 0.75rem;
	padding-right: 0.75rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	font-size: 0.875rem;
	color: var(--color-muted-foreground);
	border-bottom: 1px solid var(--color-border);
}

.markdown-content :deep(tr:last-child td) {
	border-bottom: none;
}

.markdown-content :deep(tr:hover) {
	background-color: var(--color-muted);
}

.markdown-content :deep(img) {
	border-radius: 0.25rem;
	margin: 1rem 0;
	max-width: 100%;
	height: auto;
}

.markdown-content :deep(hr) {
	margin: 2rem 0;
	border-color: var(--color-border);
}

.markdown-content :deep(strong) {
	font-weight: 700;
	color: var(--color-foreground);
}

.markdown-content :deep(em) {
	font-style: italic;
	color: var(--color-foreground);
}

.markdown-content :deep(.shiki) {
	background-color: rgb(17 24 39);
	border-radius: 0.25rem;
}

.markdown-content :deep(.shiki code) {
	color: rgb(243 244 246);
}
</style>
