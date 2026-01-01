import { fromHighlighter } from "@shikijs/markdown-it/core";
import MarkdownIt from "markdown-it";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

let md: MarkdownIt | undefined;

async function createMarkdownParser() {
	const highlighter = await createHighlighterCore({
		themes: [
			import("@shikijs/themes/vitesse-light"),
		],
		langs: [
			import("@shikijs/langs/javascript"),
			import("@shikijs/langs/typescript"),
			import("@shikijs/langs/vue"),
			import("@shikijs/langs/json"),
			import("@shikijs/langs/bash"),
		],
		engine: createOnigurumaEngine(
			() => import("shiki/wasm"),
		),
	});

	const parser = MarkdownIt({
		html: true,
		linkify: true,
		typographer: true,
	});

	// @ts-ignore
	parser.use(fromHighlighter(highlighter, {
		theme: "vitesse-light",
	}));

	return parser;
}

export async function renderMarkdown(markdown: string) {
	if (!md) {
		md = await createMarkdownParser();
	}
	return md.render(markdown);
}
