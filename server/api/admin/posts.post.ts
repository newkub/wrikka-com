export default defineEventHandler(async (event) => {
	// Authentication check
	const authHeader = getHeader(event, "authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw createError({
			statusCode: 401,
			statusMessage: "Unauthorized",
		});
	}

	const token = authHeader.substring(7);
	if (token !== process.env.ADMIN_TOKEN) {
		throw createError({
			statusCode: 401,
			statusMessage: "Invalid token",
		});
	}

	try {
		const body = await readBody(event);
		const { slug, title, description, content, date, author, tags, category, published, featured } = body;

		// Validate required fields
		if (!slug || !title || !content) {
			throw createError({
				statusCode: 400,
				statusMessage: "Missing required fields: slug, title, content",
			});
		}

		// Generate frontmatter
		const frontmatter = [
			`title: "${title}"`,
			`description: "${description || ""}"`,
			`date: "${date || new Date().toISOString()}"`,
			`author: "${author || "Veerapong"}"`,
			...(tags && tags.length ? [`tags: [${tags.map((tag: string) => `"${tag}"`).join(", ")}]`] : []),
			...(category ? [`category: "${category}"`] : []),
			`published: ${published !== false}`,
			...(featured ? [`featured: ${featured}`] : []),
		].join("\n");

		const markdownContent = `---\n${frontmatter}\n---\n\n${content}`;

		// Write to file
		const contentDir = fileURLToPath(new URL("../../content/blog", import.meta.url));
		const filePath = join(contentDir, `${slug}.md`);

		await writeFile(filePath, markdownContent, "utf-8");

		return {
			success: true,
			message: "Post created successfully",
			data: {
				slug,
				title,
				description,
				date: date || new Date().toISOString(),
				author: author || "Veerapong",
				tags: tags || [],
				category: category || "general",
				published: published !== false,
				featured: featured || false,
			},
		};
	} catch (error) {
		console.error("Error creating post:", error);
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to create post",
		});
	}
});
