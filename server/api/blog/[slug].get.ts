import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";
import { renderMarkdown } from "../../utils/markdown";

export default defineEventHandler(async (event) => {
	const slug = getRouterParam(event, "slug");
	if (!slug) {
		throw createError({ statusCode: 400, statusMessage: "Missing slug" });
	}

	const rootDir = path.resolve(process.cwd(), "content");
	const blogDir = path.resolve(process.cwd(), "content", "blog");
	const candidatePaths = [
		path.join(blogDir, `${slug}.md`),
		path.join(rootDir, `${slug}.md`),
	];

	try {
		const filePath = await (async () => {
			for (const candidate of candidatePaths) {
				try {
					await fs.access(candidate);
					return candidate;
				} catch {
					// continue
				}
			}
			throw new Error("not-found");
		})();

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
