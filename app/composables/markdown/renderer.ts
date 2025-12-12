import Shiki from "@shikijs/markdown-it";
import MarkdownIt from "markdown-it";
import { computed, ref } from "vue";

interface HeadingItem {
	level: number;
	text: string;
	id: string;
}

export const useMarkdownRenderer = (markdownContent: Ref<string>) => {
	const formattedContent = ref("");

	const tableOfContents = computed(() => {
		if (!markdownContent.value) return [];

		const headingRegex = /^(#{1,3})\s+(.+)$/gm;
		const headings: HeadingItem[] = [];

		for (const match of markdownContent.value.matchAll(headingRegex)) {
			const level = match[1]?.length || 1;
			const text = match[2] || "";
			const id = text.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");

			if (text) {
				headings.push({
					level,
					text,
					id,
				});
			}
		}

		return headings;
	});

	const formatContent = async () => {
		if (!markdownContent.value) {
			formattedContent.value = "";
			return;
		}

		try {
			const md = MarkdownIt({
				html: true,
				breaks: true,
				linkify: true,
			});

			md.use(
				await Shiki({
					themes: {
						light: "vitesse-light",
						dark: "vitesse-dark",
					},
				}),
			);

			let formatted = md.render(markdownContent.value);

			formatted = formatted.replace(
				/<pre[^>]*><code[^>]*class="[^"]*language-(\w+)[^"]*"[^>]*>([\s\S]*?)<\/code><\/pre>/g,
				(match, lang, code) => {
					let filename = "";
					let cleanCode = code;

					const filenameMatch = cleanCode.match(/^\s*\[([^\]]+)\]\s*\n/);
					if (filenameMatch) {
						filename = filenameMatch[1];
						cleanCode = cleanCode.replace(/^\s*\[([^\]]+)\]\s*\n/, "");
					}

					const getLanguageIcon = (language: string) => {
						const iconMap: { [key: string]: string } = {
							"javascript": "i-mdi-language-javascript",
							"typescript": "i-mdi-language-typescript",
							"vue": "i-mdi-vuejs",
							"html": "i-mdi-language-html5",
							"css": "i-mdi-language-css3",
							"scss": "i-mdi-sass",
							"json": "i-mdi-code-json",
							"yaml": "i-mdi-file-code",
							"yml": "i-mdi-file-code",
							"bash": "i-mdi-console",
							"shell": "i-mdi-console",
							"python": "i-mdi-language-python",
							"php": "i-mdi-language-php",
							"sql": "i-mdi-database",
							"dockerfile": "i-mdi-docker",
							"xml": "i-mdi-file-xml-box",
						};
						return iconMap[language.toLowerCase()] || "i-mdi-file-code";
					};

					const icon = getLanguageIcon(lang);
					const displayLang = lang.charAt(0).toUpperCase() + lang.slice(1);

					return `
					<div class="code-block-container my-6 rounded-xl overflow-hidden border border-surface-200 dark:border-surface-200-dark bg-card dark:bg-card-dark shadow-sm">
					  ${
						filename || lang
							? `
							<div class="code-header flex items-center justify-between px-4 py-3 bg-surface-50 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-200-dark">
							  <div class="flex items-center gap-2">
								<div class="${icon} w-4 h-4 text-accent dark:text-accent-dark"></div>
								<span class="text-sm font-medium text-secondary dark:text-secondary-dark">
								  ${filename || displayLang}
								</span>
							  </div>
							  <button 
								onclick="navigator.clipboard.writeText(this.closest('.code-block-container').querySelector('code').textContent)"
								class="flex items-center gap-1 px-2 py-1 text-xs text-secondary dark:text-secondary-dark hover:text-accent dark:hover:text-accent-dark transition-colors rounded bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
							  >
								<div class="i-mdi-content-copy w-3 h-3"></div>
								Copy
							  </button>
							</div>
						  `
							: ""
					}
					  <div class="relative">
						<pre class="overflow-x-auto p-4 m-0 bg-transparent text-sm leading-relaxed"><code class="language-${lang}">${cleanCode}</code></pre>
					  </div>
					</div>
				  `;
				},
			);

			formatted = formatted
				.replace(
					/<h1>/g,
					"<h1 class=\"text-4xl font-bold text-primary dark:text-primary-dark mt-12 mb-8 scroll-mt-24\">",
				)
				.replace(
					/<h2>/g,
					"<h2 class=\"text-3xl font-bold text-primary dark:text-primary-dark mt-10 mb-6 scroll-mt-24\">",
				)
				.replace(
					/<h3>/g,
					"<h3 class=\"text-2xl font-bold text-primary dark:text-primary-dark mt-8 mb-4 scroll-mt-24\">",
				)
				.replace(
					/<p>/g,
					"<p class=\"mb-4 text-lg leading-relaxed text-primary dark:text-primary-dark\">",
				)
				.replace(
					/<strong>/g,
					"<strong class=\"font-semibold text-primary dark:text-primary-dark\">",
				)
				.replace(
					/<em>/g,
					"<em class=\"italic text-secondary dark:text-secondary-dark\">",
				)
				.replace(
					/<code(?![^>]*class)>/g,
					"<code class=\"bg-surface-100 dark:bg-surface-100-dark text-accent dark:text-accent-dark px-2 py-1 rounded text-sm font-mono\">",
				)
				.replace(/<ul>/g, "<ul class=\"list-disc ml-6 mb-4 space-y-2\">")
				.replace(/<ol>/g, "<ol class=\"list-decimal ml-6 mb-4 space-y-2\">")
				.replace(/<li>/g, "<li class=\"text-primary dark:text-primary-dark\">")
				.replace(
					/<blockquote>/g,
					"<blockquote class=\"border-l-4 border-accent dark:border-accent-dark pl-4 italic text-secondary dark:text-secondary-dark my-6\">",
				);

			formatted = formatted.replace(
				/<h([1-3])([^>]*)>([^<]+)<\/h[1-3]>/g,
				(match, level, attrs, text) => {
					const id = text.toLowerCase().replace(/[^\w\s]/g, "").replace(
						/\s+/g,
						"-",
					);
					return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
				},
			);

			formattedContent.value = formatted;
		} catch (error) {
			console.error("Error formatting content:", error);
			formattedContent.value = markdownContent.value.replace(
				/\n\n/g,
				"</p><p class=\"mb-4 text-lg leading-relaxed text-primary dark:text-primary-dark\">",
			);
		}
	};

	watch(markdownContent, formatContent, { immediate: true });

	return {
		formattedContent,
		tableOfContents,
	};
};
