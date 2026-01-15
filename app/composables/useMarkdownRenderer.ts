import MarkdownIt from "markdown-it";
import { createHighlighter, bundledLanguages } from "shiki";

let highlighter: any = null;
let md: MarkdownIt | null = null;

function addCopyButton(html: string, code: string): string {
	// Add CopyButton component to the code block
	const copyButtonHtml = `
		<CopyButton code="${encodeURIComponent(code)}" />
	`;

	// Find the pre tag and insert the copy button
	return html.replace(
		/<pre([^>]*)>/,
		`<pre$1 class="group relative">`
	).replace(
		/<\/pre>/,
		`${copyButtonHtml}</pre>`
	);
}

async function initMarkdown() {
	if (highlighter && md) {
		return md;
	}

	highlighter = await createHighlighter({
		themes: ["vitesse-light", "vitesse-dark"],
		langs: Object.keys(bundledLanguages),
	});

	md = MarkdownIt({
		html: true,
		linkify: true,
		typographer: true,
		highlight: (code: string, lang: string) => {
			const colorMode = useColorMode();
			const theme = colorMode.value === "dark" ? "vitesse-dark" : "vitesse-light";

			if (!lang) {
				// If no language specified, try to auto-detect or use text
				const html = highlighter.codeToHtml(code, {
					lang: "text",
					theme,
				});
				return addCopyButton(html, code);
			}

			// Map common aliases to supported languages
			const langMap: Record<string, string> = {
				react: "jsx",
				git: "git-commit",
				ts: "typescript",
				js: "javascript",
				tsx: "tsx",
				jsx: "jsx",
			};
			const mappedLang = langMap[lang.toLowerCase()] || lang.toLowerCase();

			const loadedLangs = highlighter.getLoadedLanguages();

			// Check if language is loaded
			if (loadedLangs.includes(mappedLang)) {
				let html: string;

				// Use regular highlighter for now (twoslash requires special setup)
				html = highlighter.codeToHtml(code, {
					lang: mappedLang,
					theme,
				});

				return addCopyButton(html, code);
			}

			// Try to find a similar language
			const similarLang = loadedLangs.find((l: string) => {
				const lLower = l.toLowerCase();
				return lLower.includes(mappedLang) || mappedLang.includes(lLower);
			});

			if (similarLang) {
				const html = highlighter.codeToHtml(code, {
					lang: similarLang,
					theme,
				});
				return addCopyButton(html, code);
			}

			// Fallback to text/plain
			const html = highlighter.codeToHtml(code, {
				lang: "text",
				theme,
			});
			return addCopyButton(html, code);
		},
	});

	return md;
}

export async function useMarkdownRenderer() {
	const renderer = await initMarkdown();

	const render = (content: string) => {
		return renderer.render(content);
	};

	return {
		render,
	};
}
