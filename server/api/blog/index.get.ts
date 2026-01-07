import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";
import { renderMarkdown } from "../../utils/markdown";

export default defineEventHandler(async () => {
	const rootDir = path.resolve(process.cwd(), "content");
	const blogDir = path.resolve(process.cwd(), "content", "blog");

	const contentDirs = [blogDir, rootDir];
	const filesByDir = await Promise.all(
		contentDirs.map(async (dir) => {
			try {
				return { dir, files: await fs.readdir(dir) };
			} catch {
				return { dir, files: [] as string[] };
			}
		}),
	);

	const seen = new Set<string>();
	const tasks = filesByDir.flatMap(({ dir, files }) => {
		return files.map(async (file) => {
			if (path.extname(file) !== ".md") return null;
			const slug = path.basename(file, ".md");
			if (!slug || seen.has(slug)) return null;
			seen.add(slug);

			const filePath = path.join(dir, file);
			const fileContent = await fs.readFile(filePath, "utf-8");
			const { data, content } = matter(fileContent);

			return {
				slug,
				title: data.title || "Untitled",
				description: data.description || "",
				imageUrl: data.imageUrl || "",
				date: data.date || undefined,
				tags: data.tags || [],
				html: await renderMarkdown(content),
			};
		});
	});

	const posts = await Promise.all(tasks);

	return posts.filter(Boolean);
});
