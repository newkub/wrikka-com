<script setup lang="ts">
import type { ShopItem } from "../../../shared/types/shop";

defineProps<{
	item: ShopItem;
}>();
</script>

<template>
	<NuxtLink :to="item.url" target="_blank" class="block group">
		<div class="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out backdrop-blur-sm h-full flex flex-col">
			<div class="overflow-hidden">
				<img
					:src="item.coverUrl"
					:alt="item.name"
					class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
				>
			</div>
			<div class="p-6 flex-1 flex flex-col">
				<h3 class="text-xl font-bold text-white mb-2 flex-1">
					{{ item.name }}
				</h3>
				<p class="text-gray-400 text-base mb-4">{{ item.description }}</p>
				<div class="flex justify-between items-center mt-auto">
					<span class="text-2xl font-bold text-primary">{{ item.price }}</span>
					<div class="inline-flex items-center gap-2 text-gray-300 group-hover:text-white transition-colors font-semibold">
						<span>View Product</span>
						<span
							class="i-carbon-arrow-right group-hover:translate-x-1 transition-transform"
						></span>
					</div>
				</div>
			</div>
		</div>
	</NuxtLink>
</template>
