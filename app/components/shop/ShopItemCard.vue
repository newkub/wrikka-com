<script setup lang="ts">
import type { ShopItem } from "../../../shared/types/shop";

defineProps<{
	item: ShopItem;
}>();
</script>

<template>
	<a
		href="https://shop.wrikka.com"
		target="_blank"
		rel="noreferrer"
		class="block group"
	>
		<div class="bg-surface-100/60 dark:bg-surface-200/10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out backdrop-blur-sm h-full flex flex-col border border-surface-200 dark:border-surface-800">
			<div class="overflow-hidden">
				<img
					:src="item.coverUrl"
					:alt="item.name"
					class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
				>
			</div>
			<div class="p-6 flex-1 flex flex-col">
				<h3 class="text-xl font-bold text-primary dark:text-primary-dark mb-2 flex-1">
					{{ item.name }}
				</h3>
				<p class="text-secondary text-base mb-4">{{ item.description }}</p>
				<div class="flex justify-between items-center mt-auto">
					<span class="text-2xl font-bold text-accent">{{ item.price }}</span>
					<div class="inline-flex items-center gap-2 text-secondary group-hover:text-primary dark:group-hover:text-primary-dark transition-colors font-semibold">
						<span>View Product</span>
						<Icon
							name="mdi:arrow-right"
							class="group-hover:translate-x-1 transition-transform"
						/>
					</div>
				</div>
			</div>
		</div>
	</a>
</template>
