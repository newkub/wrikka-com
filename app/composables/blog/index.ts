import type { BlogPost } from "~/types/blog";

// Static import function สำหรับ markdown files
const importBlogPosts = async (): Promise<BlogPost[]> => {
	try {
		// ใช้ import.meta.glob เพื่อโหลด markdown files แบบ static
		const modules = import.meta.glob("/content/blog/*.md", {
			eager: true,
			import: "raw",
		});

		const posts: BlogPost[] = [];

		for (const [path, content] of Object.entries(modules)) {
			if (typeof content === "string") {
				const post = parseMarkdownPost(path, content);
				if (post) {
					posts.push(post);
				}
			}
		}

		// เรียงตาม date ใหม่ไปเก่า
		return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	} catch (err) {
		console.error("Error importing blog posts:", err);
		return [];
	}
};

// Parse markdown content และ frontmatter
const parseMarkdownPost = (filePath: string, content: string): BlogPost | null => {
	try {
		// แยก frontmatter จาก content
		const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
		const match = content.match(frontmatterRegex);

		if (!match || match.length < 3) {
			console.warn(`No frontmatter found in ${filePath}`);
			return null;
		}

		const frontmatterYaml = match[1];
		const markdownContent = match[2];

		if (!frontmatterYaml || !markdownContent) {
			console.warn(`Invalid frontmatter or content in ${filePath}`);
			return null;
		}

		type Frontmatter = Record<string, string | number | string[]>;
		const frontmatter: Frontmatter = {};
		const lines = frontmatterYaml.split("\n");

		for (const line of lines) {
			const trimmed = line.trim();
			if (trimmed?.includes(":")) {
				const [key, ...valueParts] = trimmed.split(":");
				if (!key) continue;

				let value: string | number | string[] = valueParts.join(":").trim();

				if (!Number.isNaN(Number(value))) {
					value = Number(value);
				}

				if (typeof value === "string") {
					// ลบ quotes
					if (
						(value.startsWith("\"") && value.endsWith("\""))
						|| (value.startsWith("'") && value.endsWith("'"))
					) {
						value = value.slice(1, -1);
					}

					// Convert arrays (tags)
					if (value.startsWith("[") && value.endsWith("]")) {
						const arrayValue = value.slice(1, -1).split(",").map((v: string) => v.trim().replace(/['"]/g, ""));
						frontmatter[key.trim()] = arrayValue;
					} else {
						frontmatter[key.trim()] = value;
					}
				} else {
					frontmatter[key.trim()] = value;
				}
			}
		}

		// สร้าง slug จาก filename ถ้าไม่มี
		const filename = filePath.split("/").pop()?.replace(".md", "") || "";
		const slug = frontmatter.slug || filename;

		// สร้าง id unique
		const id = `${slug}-${frontmatter.date || Date.now()}`;

		return {
			id,
			title: String(frontmatter.title || "ไม่มีชื่อ"),
			excerpt: String(frontmatter.excerpt || `${markdownContent.slice(0, 150).replace(/[#*[]]/g, "").trim()}...`),
			content: markdownContent,
			date: String(frontmatter.date || new Date().toISOString().split("T")[0]),
			readingTime: Number(frontmatter.readingTime) || Math.ceil(markdownContent.split(" ").length / 200),
			path: `/blog/${slug}`,
			slug: String(slug),
			category: String(frontmatter.category || undefined),
			tags: Array.isArray(frontmatter.tags)
				? frontmatter.tags
				: (typeof frontmatter.tags === "string" ? [frontmatter.tags] : undefined),
			image: String(frontmatter.image || undefined),
		};
	} catch (err) {
		console.error(`Error parsing ${filePath}:`, err);
		return null;
	}
};

export const useBlogPosts = () => {
	const posts = ref<BlogPost[]>([]);
	const loading = ref(false);
	const error = ref<string | null>(null);

	// Cache สำหรับ static posts
	let cachedPosts: BlogPost[] | null = null;

	const loadPosts = async (): Promise<BlogPost[]> => {
		try {
			loading.value = true;
			error.value = null;

			// ใช้ cache ถ้ามีแล้ว
			if (cachedPosts) {
				posts.value = cachedPosts;
				return cachedPosts;
			}

			// โหลดจาก markdown files
			const importedPosts = await importBlogPosts();

			cachedPosts = importedPosts;
			posts.value = importedPosts;
			return importedPosts;
		} catch (err) {
			error.value = err instanceof Error ? err.message : "Failed to load blog posts";
			console.error("Error loading blog posts:", err);
			return [];
		} finally {
			loading.value = false;
		}
	};

	const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
		try {
			loading.value = true;
			error.value = null;

			// โหลด posts ถ้ายังไม่มี
			if (!cachedPosts) {
				await loadPosts();
			}

			// หาจาก cache
			const post = (cachedPosts || []).find(p => p.slug === slug);

			if (!post) {
				error.value = `ไม่พบบทความ: ${slug}`;
				return null;
			}

			return post;
		} catch (err) {
			error.value = err instanceof Error ? err.message : "Failed to load blog post";
			console.error("Error loading blog post:", err);
			return null;
		} finally {
			loading.value = false;
		}
	};

	const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
		if (posts.value.length === 0) {
			await loadPosts();
		}
		return posts.value.filter((post: BlogPost) => post.category === category);
	};

	const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
		if (posts.value.length === 0) {
			await loadPosts();
		}
		return posts.value.filter((post: BlogPost) => post.tags?.includes(tag));
	};

	return {
		posts: readonly(posts),
		loading: readonly(loading),
		error: readonly(error),
		loadPosts,
		getPostBySlug,
		getPostsByCategory,
		getPostsByTag,
	};
};
