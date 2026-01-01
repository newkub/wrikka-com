import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";
import { renderMarkdown } from "../../utils/markdown";

export default defineEventHandler(async (event) => {
	const slug = getRouterParam(event, "slug");
	if (!slug) {
		throw createError({ statusCode: 400, statusMessage: "Missing slug" });
	}

	const contentDir = path.resolve(process.cwd(), "content");
	const filePath = path.join(contentDir, `${slug}.md`);

	try {
		const fileContent = await fs.readFile(filePath, "utf-8");
		const { data, content } = matter(fileContent);

		return {
			slug,
			title: data.title || "Untitled",
			description: data.description || "",
			html: await renderMarkdown(content),
		};
	} catch {
		throw createError({ statusCode: 404, statusMessage: "Post not found" });
	}
});
