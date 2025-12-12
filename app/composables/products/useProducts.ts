import type { Product } from "~/types/product";

export const useProducts = async () => {
  const products = ref<Product[]>([]); // Placeholder
  // In a real app, you would fetch this from an API
  // const { data: products } = await useFetch('/api/products')

  return {
    products,
  };
};
