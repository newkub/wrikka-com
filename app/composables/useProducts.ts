import type { Product } from "../../shared/types/products";

export const useProducts = () => {
	const products = ref<Product[]>([
		{
			name: "Vue.js Mastery Course",
			description: "An in-depth course covering everything from the basics to advanced concepts in Vue.js.",
			imageUrl: "https://via.placeholder.com/400x250",
			price: "$99",
			url: "#",
		},
		{
			name: "Modern UI Kit",
			description: "A complete set of beautifully designed UI components for your next project.",
			imageUrl: "https://via.placeholder.com/400x250",
			price: "$49",
			url: "#",
		},
		{
			name: "Nuxt.js Boilerplate",
			description: "Kickstart your next Nuxt.js project with this feature-packed boilerplate.",
			imageUrl: "https://via.placeholder.com/400x250",
			price: "$29",
			url: "#",
		},
	]);

	return {
		products,
	};
};
