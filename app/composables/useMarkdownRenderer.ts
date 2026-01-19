import MarkdownIt from "markdown-it";
import { type BundledLanguage, bundledLanguages, type BundledTheme, createHighlighter, type Highlighter } from "shiki";

interface CodeBlock {
	code: string;
	language: string;
	filename?: string;
	html: string;
}

const LANGUAGE_MAP: Record<string, string> = {
	react: "jsx",
	git: "git-commit",
	ts: "typescript",
	js: "javascript",
	tsx: "tsx",
	jsx: "jsx",
} as const;

const THEMES: BundledTheme[] = ["vitesse-light", "vitesse-dark"];

let highlighter: Highlighter | null = null;
let md: MarkdownIt | null = null;

function getTheme(isDark: boolean): BundledTheme {
	return isDark ? "vitesse-dark" : "vitesse-light";
}

function mapLanguage(lang: string): string {
	return LANGUAGE_MAP[lang.toLowerCase()] || lang.toLowerCase();
}

function findLanguage(mappedLang: string, loadedLangs: string[]): string {
	if (loadedLangs.includes(mappedLang)) {
		return mappedLang;
	}

	const similarLang = loadedLangs.find((l: string) => {
		const lLower = l.toLowerCase();
		return lLower.includes(mappedLang) || mappedLang.includes(lLower);
	});

	return similarLang || "text";
}

async function initMarkdown() {
	if (highlighter && md) {
		return md;
	}

	try {
		highlighter = await createHighlighter({
			themes: THEMES,
			langs: Object.keys(bundledLanguages) as BundledLanguage[],
		});

		md = MarkdownIt({
			html: true,
			linkify: true,
			typographer: true,
			highlight: (code: string, lang: string) => {
				const isDark = import.meta.client ? useColorMode().value === "dark" : false;
				const theme = getTheme(isDark);

				if (!lang) {
					return highlighter!.codeToHtml(code, {
						lang: "text",
						theme,
					});
				}

				const mappedLang = mapLanguage(lang);
				const loadedLangs = highlighter!.getLoadedLanguages();
				const finalLang = findLanguage(mappedLang, loadedLangs);

				return highlighter!.codeToHtml(code, {
					lang: finalLang as BundledLanguage,
					theme,
				});
			},
		});

		return md;
	} catch (error) {
		console.error("Failed to initialize markdown renderer:", error);
		throw error;
	}
}

export async function useMarkdownRenderer() {
	const renderer = await initMarkdown();

	const render = (content: string) => {
		return renderer.render(content);
	};

	const extractCodeBlocks = (content: string): CodeBlock[] => {
		const codeBlocks: CodeBlock[] = [];
		const regex = /```(\w+)?(?:\[([^\]]+)\])?\n([\s\S]*?)```/g;
		let match;

		while ((match = regex.exec(content)) !== null) {
			const language = match[1] || "text";
			const filename = match[2] || undefined;
			const code = match[3] || "";

			if (!highlighter) {
				console.warn("Highlighter not initialized");
				continue;
			}

			const isDark = import.meta.client ? useColorMode().value === "dark" : false;
			const theme = getTheme(isDark);
			const mappedLang = mapLanguage(language);
			const loadedLangs = highlighter.getLoadedLanguages();
			const finalLang = findLanguage(mappedLang, loadedLangs);

			const html = highlighter.codeToHtml(code, {
				lang: finalLang as BundledLanguage,
				theme,
			});

			codeBlocks.push({
				code: encodeURIComponent(code),
				language: finalLang,
				filename: filename || undefined,
				html,
			});
		}

		return codeBlocks;
	};

	return {
		render,
		extractCodeBlocks,
	};
}

