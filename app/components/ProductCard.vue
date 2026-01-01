<script setup lang="ts">
import type { Product } from '../../shared/types/products';

defineProps<{
	product: Product;
}>();
</script>

<template>
	<NuxtLink :to="product.url" class="block">
		<div class="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out backdrop-blur-sm h-full flex flex-col">
			<img
				:src="product.imageUrl"
				:alt="product.name"
				class="w-full h-48 object-cover"
			>
			<div class="p-6 flex-1 flex flex-col">
				<h3 class="text-xl font-bold text-white mb-2 flex-1">
					{{ product.name }}
				</h3>
				<p class="text-gray-400 text-base mb-4">{{ product.description }}</p>
				<div class="flex justify-between items-center mt-auto">
					<span class="text-2xl font-bold text-primary">{{
						product.price
					}}</span>
					<button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold">
						View Details
					</button>
				</div>
			</div>
		</div>
	</NuxtLink>
</template>
