import { productsData } from "~~/shared/data/products";
import type { Product } from "~~/shared/types/products";

export const useProducts = async () => {
	const products = ref<Product[]>(productsData);

	return {
		products,
	};
};
