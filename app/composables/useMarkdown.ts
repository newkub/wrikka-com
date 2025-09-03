import MarkdownIt from "markdown-it";
import Shiki from "@shikijs/markdown-it";

let markdownRenderer: MarkdownIt | null = null;

export const useMarkdown = async () => {
	if (!markdownRenderer) {
		markdownRenderer = new MarkdownIt({
			html: true,
			linkify: true,
			typographer: true,
		});

		// เพิ่ม shiki plugin สำหรับ syntax highlighting
		markdownRenderer.use(
			await Shiki({
				themes: {
					light: "github-light",
					dark: "github-dark",
				},
				defaultColor: "light",
			}),
		);
	}

	const renderMarkdown = (content: string): string => {
		if (!markdownRenderer) return content;
		return markdownRenderer.render(content);
	};

	return {
		renderMarkdown,
	};
};
