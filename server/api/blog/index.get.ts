import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";
import { renderMarkdown } from "../../utils/markdown";

export default defineEventHandler(async () => {
	const contentDir = path.resolve(process.cwd(), "content");
	const files = await fs.readdir(contentDir);

	const posts = await Promise.all(
		files.map(async (file) => {
			if (path.extname(file) !== ".md") return null;

			const filePath = path.join(contentDir, file);
			const fileContent = await fs.readFile(filePath, "utf-8");
			const { data, content } = matter(fileContent);

			return {
				slug: path.basename(file, ".md"),
				title: data.title || "Untitled",
				description: data.description || "",
				html: await renderMarkdown(content),
			};
		}),
	);

	return posts.filter(Boolean);
});
