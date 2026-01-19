import type { ShopItem } from "#shared/types/shop";

export const useShop = () => {
	const items = ref<ShopItem[]>([
		{
			name: "Minimalist Desk Setup",
			description: "A curated collection of items for a clean and productive workspace.",
			coverUrl: "https://via.placeholder.com/600x400",
			price: "$250",
			url: "#",
		},
		{
			name: "Ergonomic Keyboard",
			description: "Type in comfort for hours with this split ergonomic keyboard.",
			coverUrl: "https://via.placeholder.com/600x400",
			price: "$160",
			url: "#",
		},
		{
			name: "4K Ultrawide Monitor",
			description: "Immerse yourself in stunning visuals with this 34-inch ultrawide display.",
			coverUrl: "https://via.placeholder.com/600x400",
			price: "$799",
			url: "#",
		},
	]);

	return {
		items,
	};
};

