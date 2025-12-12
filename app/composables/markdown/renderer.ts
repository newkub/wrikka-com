import { fromHighlighter } from "@shikijs/markdown-it/core";
import MarkdownIt from "markdown-it";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

let highlighter: Awaited<ReturnType<typeof createHighlighterCore>>;
let md: MarkdownIt;

async function getHighlighter() {
	if (highlighter) {
		return highlighter;
	}

	return (highlighter = await createHighlighterCore({
		themes: [
			import("@shikijs/themes/vitesse-light"),
			import("@shikijs/themes/vitesse-dark"),
		],
		langs: [
			import("@shikijs/langs/javascript"),
			import("@shikijs/langs/typescript"),
			import("@shikijs/langs/vue"),
			import("@shikijs/langs/bash"),
			import("@shikijs/langs/json"),
		],
		engine: createOnigurumaEngine(() => import("shiki/wasm")),
	}));
}

export async function useMarkdownRenderer() {
	if (md) {
		return md;
	}

	const highlighter = await getHighlighter();

	md = MarkdownIt({
		html: true,
		linkify: true,
		typographer: true,
	});

	md.use(fromHighlighter(highlighter as any, { theme: "vitesse-light" }));

	return md;
}
