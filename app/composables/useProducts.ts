interface ProductLink {
	name: string;
	url: string;
}

export const useProducts = () => {
	// This composable is now a placeholder as the product data has been removed.
	const products = ref<ProductLink[]>([]);

	return {
		products,
	};
};
