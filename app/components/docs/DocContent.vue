<script setup lang="ts">
import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import markdownItContainer from "markdown-it-container";
import markdownItFootnote from "markdown-it-footnote";
// @ts-ignore
import markdownItTaskLists from "markdown-it-task-lists";
import {
	type BundledLanguage,
	type BundledTheme,
	createHighlighter,
} from "shiki";

const props = defineProps<{
	content: string;
}>();

const md = ref<MarkdownIt>();
const renderedContent = ref<string>("");

onMounted(async () => {
	const highlighter = await createHighlighter({
		themes: ["github-dark", "github-light"],
		langs: [
			"typescript",
			"javascript",
			"vue",
			"bash",
			"json",
			"markdown",
			"python",
			"rust",
			"go",
		],
	});

	md.value = MarkdownIt({
		html: true,
		linkify: true,
		typographer: true,
		highlight: (code, lang) => {
			if (
				!lang
				|| !highlighter.getLoadedLanguages().includes(lang as BundledLanguage)
			) {
				return `<pre class="shiki"><code>${
					md.value!.utils.escapeHtml(code)
				}</code></pre>`;
			}

			const isDark = document.documentElement.classList.contains("dark");
			const html = highlighter.codeToHtml(code, {
				lang: lang as BundledLanguage,
				theme: isDark ? "github-dark" : "github-light",
			});

			return html;
		},
	})
		.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.linkInsideHeader({
				symbol: "#",
				placement: "before",
			}),
			level: [2, 3, 4],
		})
		.use(markdownItAttrs)
		.use(markdownItContainer as any)
		.use(markdownItFootnote)
		.use(markdownItTaskLists, {
			enabled: true,
		});

	renderedContent.value = md.value.render(props.content);
});

watch(() => props.content, async (newContent) => {
	if (md.value) {
		renderedContent.value = md.value.render(newContent);
	}
});
</script>

<template>
	<div class="doc-content leading-7 text-foreground" v-html="renderedContent" />
</template>
