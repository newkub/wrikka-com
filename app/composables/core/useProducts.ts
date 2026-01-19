import type { Product } from "#shared/types/products";

export const useProducts = () => {
	const products = ref<Product[]>([
		{
			name: "Vue.js Mastery Course",
			description: "An in-depth course covering everything from the basics to advanced concepts in Vue.js.",
			imageUrl:
				"https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
			price: "$99",
			url: "#",
			faviconUrl: "https://vuejs.org/logo.svg",
		},
		{
			name: "Modern UI Kit",
			description: "A complete set of beautifully designed UI components for your next project.",
			imageUrl:
				"https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
			price: "$49",
			url: "#",
			faviconUrl: "https://figma.com/favicon.ico",
		},
		{
			name: "Nuxt.js Boilerplate",
			description: "Kickstart your next Nuxt.js project with this feature-packed boilerplate.",
			imageUrl:
				"https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1506&q=80",
			price: "$29",
			url: "#",
			faviconUrl: "https://nuxt.com/favicon.ico",
		},
	]);

	return {
		products,
	};
};
