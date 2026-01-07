import { promises as fs } from "fs";
import path from "path";

const getBlogSlugs = async () => {
	const rootDir = path.resolve(process.cwd(), "content");
	const blogDir = path.resolve(process.cwd(), "content", "blog");

	const dirs = [rootDir, blogDir];
	const slugs = new Set<string>();

	await Promise.all(
		dirs.map(async (dir) => {
			try {
				const files = await fs.readdir(dir);
				for (const file of files) {
					if (path.extname(file) !== ".md") continue;
					const slug = path.basename(file, ".md");
					if (slug) slugs.add(slug);
				}
			} catch {
				// ignore missing directory
			}
		}),
	);

	return Array.from(slugs.values()).sort();
};

const escapeXml = (value: string) => {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
};

export default defineEventHandler(async (event) => {
	const url = getRequestURL(event);
	const origin = url.origin;

	const nowIso = new Date().toISOString();

	const staticPaths = ["/", "/blog", "/profile", "/products"];
	const blogSlugs = await getBlogSlugs();
	const blogPaths = blogSlugs.map(slug => `/blog/${encodeURIComponent(slug)}`);

	const allPaths = [...staticPaths, ...blogPaths];

	const xml = [
		"<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
		"<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
		...allPaths.map((p) => {
			const loc = `${origin}${p}`;
			return [
				"<url>",
				`<loc>${escapeXml(loc)}</loc>`,
				`<lastmod>${nowIso}</lastmod>`,
				"</url>",
			].join("");
		}),
		"</urlset>",
	].join("");

	setHeader(event, "content-type", "application/xml; charset=utf-8");
	return xml;
});
