import MarkdownIt from "markdown-it"
import { createHighlighter } from "shiki"

let highlighter: any = null
let md: MarkdownIt | null = null

async function initMarkdown() {
	if (highlighter && md) {
		return md
	}

	highlighter = await createHighlighter({
		themes: ["vitesse-light", "vitesse-dark"],
		langs: [
			"javascript",
			"typescript",
			"python",
			"bash",
			"json",
			"markdown",
			"html",
			"css",
			"scss",
			"vue",
			"react",
			"jsx",
			"tsx",
			"java",
			"c",
			"cpp",
			"csharp",
			"go",
			"rust",
			"php",
			"ruby",
			"sql",
			"yaml",
			"toml",
			"xml",
			"dockerfile",
			"git",
			"regex",
			"shell",
			"powershell",
			"lua",
			"r",
			"swift",
			"kotlin",
			"dart",
			"elixir",
			"haskell",
			"scala",
			"clojure",
			"fsharp",
			"ocaml",
			"erlang",
			"elm",
			"purescript",
			"idris",
			"agda",
			"coq",
			"lean",
			"julia",
			"matlab",
			"perl",
			"tcl",
			"vim",
			"viml",
			"emacs-lisp",
			"lisp",
			"scheme",
			"racket",
			"clojurescript",
			"elm",
			"purescript",
			"reason",
			"ocaml",
			"fstar",
			"coq",
			"lean",
			"idris",
			"agda",
		],
	})

	md = MarkdownIt({
		html: true,
		linkify: true,
		typographer: true,
		highlight: (code: string, lang: string) => {
			const colorMode = useColorMode()
			const theme = colorMode.value === "dark" ? "vitesse-dark" : "vitesse-light"

			if (!lang) {
				// If no language specified, try to auto-detect or use text
				return highlighter.codeToHtml(code, {
					lang: "text",
					theme,
				})
			}

			const loadedLangs = highlighter.getLoadedLanguages()
			const normalizedLang = lang.toLowerCase()

			// Check if language is loaded
			if (loadedLangs.includes(normalizedLang)) {
				return highlighter.codeToHtml(code, {
					lang: normalizedLang,
					theme,
				})
			}

			// Try to find a similar language
			const similarLang = loadedLangs.find((l: string) => {
				const lLower = l.toLowerCase()
				return lLower.includes(normalizedLang) || normalizedLang.includes(lLower)
			})

			if (similarLang) {
				return highlighter.codeToHtml(code, {
					lang: similarLang,
					theme,
				})
			}

			// Fallback to text/plain
			return highlighter.codeToHtml(code, {
				lang: "text",
				theme,
			})
		},
	})

	return md
}

export async function useMarkdownRenderer() {
	const renderer = await initMarkdown()

	const render = (content: string) => {
		return renderer.render(content)
	}

	return {
		render,
	}
}
