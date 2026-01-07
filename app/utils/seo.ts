export interface SEOData {
	title: string;
	description: string;
	image?: string;
	url?: string;
	type?: string;
	siteName?: string;
	locale?: string;
	keywords?: string[];
	author?: string;
	publishedTime?: string;
	modifiedTime?: string;
	articleSection?: string;
	tags?: string[];
}

export const useSEO = (data: SEOData) => {
	const config = useRuntimeConfig();
	const route = useRoute();

	const baseUrl = config.public.siteUrl || "https://wrikka.com";
	const defaultTitle = "Wrikka - Full Stack Developer Portfolio";
	const defaultDescription =
		"Personal portfolio and blog of a full-stack developer specializing in Vue.js, Nuxt, and modern web technologies.";
	const defaultImage = `${baseUrl}/images/og-default.jpg`;

	const title = data.title || defaultTitle;
	const description = data.description || defaultDescription;
	const image = data.image ? (data.image.startsWith("http") ? data.image : `${baseUrl}${data.image}`) : defaultImage;
	const url = data.url || `${baseUrl}${route.path}`;
	const type = data.type || "website";
	const siteName = data.siteName || "Wrikka";
	const locale = data.locale || "en_US";
	const keywords = data.keywords?.join(", ")
		|| "web development, vue.js, nuxt, javascript, typescript, portfolio, blog";
	const author = data.author || "Veerapong";

	// Meta tags
	const meta = [
		// Basic meta
		{ name: "description", content: description },
		{ name: "keywords", content: keywords },
		{ name: "author", content: author },

		// Open Graph
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:image", content: image },
		{ property: "og:image:width", content: "1200" },
		{ property: "og:image:height", content: "630" },
		{ property: "og:url", content: url },
		{ property: "og:type", content: type },
		{ property: "og:site_name", content: siteName },
		{ property: "og:locale", content: locale },

		// Twitter Card
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: image },
		{ name: "twitter:site", content: "@wrikka" },
		{ name: "twitter:creator", content: "@wrikka" },

		// Article specific (if applicable)
		...(data.type === "article"
			? [
				{ property: "article:published_time", content: data.publishedTime },
				{ property: "article:modified_time", content: data.modifiedTime },
				{ property: "article:section", content: data.articleSection },
				...(data.tags?.map(tag => ({ property: "article:tag", content: tag })) || []),
			]
			: []),

		// Additional SEO
		{ name: "robots", content: "index, follow" },
		{ name: "googlebot", content: "index, follow" },
		{ name: "theme-color", content: "#0066cc" },
		{ name: "msapplication-TileColor", content: "#0066cc" },
	];

	// Structured data (JSON-LD)
	const structuredData = {
		"@context": "https://schema.org",
		"@type": data.type === "article" ? "Article" : "WebPage",
		headline: title,
		description,
		image: [image],
		url,
		datePublished: data.publishedTime,
		dateModified: data.modifiedTime || data.publishedTime,
		author: {
			"@type": "Person",
			name: author,
			url: baseUrl,
		},
		publisher: {
			"@type": "Organization",
			name: siteName,
			url: baseUrl,
			logo: {
				"@type": "ImageObject",
				url: `${baseUrl}/images/logo.png`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url,
		},
		...(data.type === "article" && {
			articleSection: data.articleSection,
			keywords: data.keywords?.join(", "),
		}),
	};

	useHead({
		title,
		meta,
		link: [
			{ rel: "canonical", href: url },
		],
		script: [
			{
				type: "application/ld+json",
				innerHTML: JSON.stringify(structuredData),
			},
		],
	});

	return {
		title,
		description,
		image,
		url,
		structuredData,
	};
};
