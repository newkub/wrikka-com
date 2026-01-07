import { fromHighlighter } from "@shikijs/markdown-it/core";
import MarkdownIt from "markdown-it";
import mditAnchor from "markdown-it-anchor";
import mditAttrs from "markdown-it-attrs";
import mditContainer from "markdown-it-container";
import mditEmoji from "markdown-it-emoji";
import mditFootnote from "markdown-it-footnote";
import mditTaskLists from "markdown-it-task-lists";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

let md: MarkdownIt | undefined;

const slugify = (value: string) => {
	return value
		.toLowerCase()
		.trim()
		.replace(/[\p{L}\p{N}\s-]/gu, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
};

async function createMarkdownParser() {
	const highlighter = await createHighlighterCore({
		themes: [
			import("@shikijs/themes/vitesse-light"),
			import("@shikijs/themes/vitesse-dark"),
		],
		langs: [
			import("@shikijs/langs/javascript"),
			import("@shikijs/langs/typescript"),
			import("@shikijs/langs/vue"),
			import("@shikijs/langs/json"),
			import("@shikijs/langs/bash"),
			import("@shikijs/langs/css"),
			import("@shikijs/langs/html"),
			import("@shikijs/langs/markdown"),
			import("@shikijs/langs/python"),
			import("@shikijs/langs/scss"),
			import("@shikijs/langs/rust"),
		],
		engine: createOnigurumaEngine(
			() => import("shiki/wasm"),
		),
	});

	const parser = MarkdownIt({
		html: true,
		linkify: true,
		typographer: true,
	})
		.use(mditAnchor, {
			slugify,
			permalink: mditAnchor.permalink.ariaHidden({
				placement: "before",
				symbol: "#",
			}),
		})
		.use(mditAttrs)
		.use(mditFootnote)
		.use(mditContainer, "info")
		.use(mditContainer, "warning")
		.use(mditContainer, "danger")
		.use(mditTaskLists)
		.use(mditEmoji)
		.use(fromHighlighter(highlighter as any, {
			themes: {
				light: "vitesse-light",
				dark: "vitesse-dark",
			},
		}));

	return parser;
}

export async function renderMarkdown(markdown: string) {
	if (!md) {
		md = await createMarkdownParser();
	}

	const env: Record<string, unknown> = {};
	const tokens = md.parse(markdown, env);

	const usedIds = new Set<string>();
	const tocItems: Array<{ id: string; title: string }> = [];

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		if (token?.type !== "heading_open" || token.tag !== "h2") continue;

		const inlineToken = tokens[i + 1];
		const title = inlineToken?.type === "inline" ? inlineToken.content : "";
		if (!title) continue;

		let id = slugify(title);
		if (!id) continue;
		while (usedIds.has(id)) {
			id = `${id}-1`;
		}
		usedIds.add(id);

		token.attrSet("id", id);
		tocItems.push({ id, title });
	}

	const contentHtml = md.renderer.render(tokens, md.options, env);

	if (!tocItems.length) {
		return contentHtml;
	}

	const tocHtml = [
		"<nav class=\"toc not-prose rounded-xl border border-surface-200 bg-surface-100/60 p-4 dark:border-surface-800 dark:bg-surface-200/10\">",
		"<div class=\"text-sm font-semibold text-primary dark:text-primary-dark\">On this page</div>",
		"<ul class=\"mt-3 space-y-2 text-sm\">",
		...tocItems.map(item =>
			`<li><a class="text-secondary hover:text-accent transition-colors" href="#${item.id}">${item.title}</a></li>`
		),
		"</ul>",
		"</nav>",
	].join("");

	return `${tocHtml}${contentHtml}`;
}
