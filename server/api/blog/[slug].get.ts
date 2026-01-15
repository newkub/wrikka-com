import { readFileSync } from "fs"
import { join } from "path"
import matter from "gray-matter"

export default defineEventHandler(async (event) => {
	const slug = getRouterParam(event, "slug")

	if (!slug) {
		throw createError({
			statusCode: 400,
			statusMessage: "Slug is required",
		})
	}

	try {
		const contentDir = join(process.cwd(), "content", "blog")
		const filePath = join(contentDir, `${slug}.md`)

		const fileContent = readFileSync(filePath, "utf-8")
		const { data, content } = matter(fileContent)

		return {
			slug,
			title: data.title || slug,
			excerpt: data.excerpt || content.slice(0, 150).replace(/[#*`]/g, "") + "...",
			date: data.date || new Date().toISOString(),
			category: data.category || null,
			tags: data.tags || [],
			content,
			frontmatter: data,
		}
	}
	catch {
		throw createError({
			statusCode: 404,
			statusMessage: "Blog post not found",
		})
	}
})
