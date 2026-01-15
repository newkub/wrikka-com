<script setup lang="ts">
import { useMarkdownRenderer } from "../composables/useMarkdownRenderer"

const { render } = await useMarkdownRenderer()

interface Props {
	content: string
}

const props = defineProps<Props>()

const renderedContent = computed(() => {
	if (!props.content) return ""
	return render(props.content)
})
</script>

<template>
	<div class="markdown-content prose prose-sm dark:prose-invert max-w-none">
		<div v-html="renderedContent"></div>
	</div>
</template>

<style scoped>
.markdown-content :deep(h1) {
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 1rem;
	color: rgb(17 24 39);
	border-bottom: 2px solid rgb(229 231 235);
	padding-bottom: 0.5rem;
}

.markdown-content :deep(h2) {
	font-size: 1.5rem;
	font-weight: 600;
	margin-bottom: 0.75rem;
	color: rgb(17 24 39);
	border-bottom: 1px solid rgb(229 231 235);
	padding-bottom: 0.5rem;
	margin-top: 2rem;
}

.markdown-content :deep(h3) {
	font-size: 1.25rem;
	font-weight: 600;
	margin-bottom: 0.5rem;
	color: rgb(17 24 39);
	margin-top: 1.5rem;
}

.markdown-content :deep(h4) {
	font-size: 1.125rem;
	font-weight: 600;
	margin-bottom: 0.5rem;
	color: rgb(17 24 39);
	margin-top: 1rem;
}

.markdown-content :deep(h5) {
	font-size: 1rem;
	font-weight: 600;
	margin-bottom: 0.5rem;
	color: rgb(17 24 39);
	margin-top: 1rem;
}

.markdown-content :deep(h6) {
	font-size: 0.875rem;
	font-weight: 600;
	margin-bottom: 0.5rem;
	color: rgb(17 24 39);
	margin-top: 1rem;
}

.markdown-content :deep(p) {
	font-size: 0.875rem;
	color: rgb(55 65 81);
	margin-bottom: 1rem;
	line-height: 1.6;
}

.markdown-content :deep(a) {
	color: rgb(37 99 235);
	text-decoration: underline;
	transition: color 0.2s;
}

.markdown-content :deep(a:hover) {
	color: rgb(29 78 216);
}

.markdown-content :deep(ul), .markdown-content :deep(ol) {
	margin-bottom: 1rem;
	padding-left: 1.5rem;
}

.markdown-content :deep(li) {
	font-size: 0.875rem;
	color: rgb(55 65 81);
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
	border-left: 4px solid rgb(209 213 219);
	padding-left: 1rem;
	margin: 1rem 0;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	background-color: rgb(249 250 251);
	border-radius: 0.25rem;
	font-style: italic;
	color: rgb(75 85 99);
}

.markdown-content :deep(code) {
	background-color: rgb(243 244 246);
	border-radius: 0.25rem;
	padding-left: 0.25rem;
	padding-right: 0.25rem;
	padding-top: 0.125rem;
	padding-bottom: 0.125rem;
	font-size: 0.875rem;
	color: rgb(17 24 39);
	font-family: monospace;
}

.markdown-content :deep(pre) {
	background-color: rgb(243 244 246);
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
	border: 1px solid rgb(229 231 235);
}

.markdown-content :deep(th) {
	background-color: rgb(243 244 246);
	text-align: left;
	padding-left: 0.75rem;
	padding-right: 0.75rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	font-size: 0.75rem;
	font-weight: 600;
	color: rgb(17 24 39);
	border-bottom: 1px solid rgb(229 231 235);
}

.markdown-content :deep(td) {
	padding-left: 0.75rem;
	padding-right: 0.75rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	font-size: 0.875rem;
	color: rgb(55 65 81);
	border-bottom: 1px solid rgb(229 231 235);
}

.markdown-content :deep(tr:last-child td) {
	border-bottom: none;
}

.markdown-content :deep(tr:hover) {
	background-color: rgb(249 250 251);
}

.markdown-content :deep(img) {
	border-radius: 0.25rem;
	margin: 1rem 0;
	max-width: 100%;
	height: auto;
}

.markdown-content :deep(hr) {
	margin: 2rem 0;
	border-color: rgb(229 231 235);
}

.markdown-content :deep(strong) {
	font-weight: 700;
	color: rgb(17 24 39);
}

.markdown-content :deep(em) {
	font-style: italic;
	color: rgb(17 24 39);
}

.markdown-content :deep(.shiki) {
	background-color: rgb(17 24 39);
	border-radius: 0.25rem;
}

.markdown-content :deep(.shiki code) {
	color: rgb(243 244 246);
}

.dark .markdown-content :deep(h1) {
	color: rgb(243 244 246);
	border-bottom-color: rgb(55 65 81);
}

.dark .markdown-content :deep(h2) {
	color: rgb(243 244 246);
	border-bottom-color: rgb(55 65 81);
}

.dark .markdown-content :deep(h3) {
	color: rgb(243 244 246);
}

.dark .markdown-content :deep(h4) {
	color: rgb(243 244 246);
}

.dark .markdown-content :deep(h5) {
	color: rgb(243 244 246);
}

.dark .markdown-content :deep(h6) {
	color: rgb(243 244 246);
}

.dark .markdown-content :deep(p) {
	color: rgb(209 213 219);
}

.dark .markdown-content :deep(a) {
	color: rgb(96 165 250);
}

.dark .markdown-content :deep(a:hover) {
	color: rgb(129 140 248);
}

.dark .markdown-content :deep(li) {
	color: rgb(209 213 219);
}

.dark .markdown-content :deep(blockquote) {
	border-left-color: rgb(75 85 99);
	background-color: rgb(31 41 55);
	color: rgb(156 163 175);
}

.dark .markdown-content :deep(code) {
	background-color: rgb(31 41 55);
	color: rgb(243 244 246);
}

.dark .markdown-content :deep(pre) {
	background-color: rgb(31 41 55);
}

.dark .markdown-content :deep(table) {
	border-color: rgb(55 65 81);
}

.dark .markdown-content :deep(th) {
	background-color: rgb(31 41 55);
	color: rgb(243 244 246);
	border-bottom-color: rgb(55 65 81);
}

.dark .markdown-content :deep(td) {
	color: rgb(209 213 219);
	border-bottom-color: rgb(55 65 81);
}

.dark .markdown-content :deep(tr:hover) {
	background-color: rgb(31 41 55);
}

.dark .markdown-content :deep(strong) {
	color: rgb(243 244 246);
}

.dark .markdown-content :deep(em) {
	color: rgb(243 244 246);
}
</style>
