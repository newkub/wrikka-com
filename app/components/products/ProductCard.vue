<script setup lang="ts">
import type { Product } from "../../../shared/types/products";

defineProps<{
	product: Product;
}>();
</script>

<template>
	<NuxtLink :to="product.url" target="_blank" class="block">
		<div class="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out backdrop-blur-sm h-full flex flex-col">
			<img
				:src="product.imageUrl"
				:alt="product.name"
				class="w-full h-48 object-cover"
			>
			<div class="p-6 flex-1 flex flex-col">
				<div class="flex items-start gap-4 mb-4">
					<img
						v-if="product.faviconUrl"
						:src="product.faviconUrl"
						:alt="`${product.name} favicon`"
						class="w-8 h-8 rounded-md mt-1"
					>
					<div class="flex-1">
						<h3 class="text-xl font-bold text-white">{{ product.name }}</h3>
					</div>
				</div>
				<p class="text-gray-400 text-base mb-4 flex-1">
					{{ product.description }}
				</p>
				<div class="flex justify-between items-center mt-auto">
					<span class="text-2xl font-bold text-primary">{{
						product.price
					}}</span>
					<div class="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-semibold">
						<span>View Details</span>
						<span class="i-carbon-arrow-right"></span>
					</div>
				</div>
			</div>
		</div>
	</NuxtLink>
</template>
