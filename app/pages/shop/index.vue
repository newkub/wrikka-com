<script setup lang="ts">
useSeoMeta({
	title: "Shop",
	description: "My shop and digital goods",
});

interface ShopItem {
	id: string;
	name: string;
	description: string;
	coverUrl: string;
	price: string;
	url: string;
}

const { data: items } = await useFetch<ShopItem[]>("/api/shop");
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-2.5rem font-700 mb-0.5rem md:text-2rem text-foreground">
				Shop
			</h1>
			<p class="text-1.125rem text-muted-foreground">
				My shop and digital goods
			</p>
		</div>

		<div v-if="items && items.length > 0" class="max-w-6xl mx-auto px-1.5rem">
			<div class="grid grid-cols-1 gap-1.5rem md:grid-cols-2 lg:grid-cols-3">
				<a
					v-for="item in items"
					:key="item.id"
					:href="item.url"
					target="_blank"
					rel="noopener"
					class="bg-surface border border-border rounded-0.5rem overflow-hidden block transition-all-0.2s hover:-translate-y-2px hover:shadow-lg no-underline text-foreground"
				>
					<div class="relative aspect-video">
						<img
							:src="item.coverUrl"
							:alt="item.name"
							class="w-full h-full object-cover"
						/>
					</div>
					<div class="p-1.5rem">
						<h3 class="text-1.125rem font-600 m-0 mb-0.5rem">
							{{ item.name }}
						</h3>
						<p class="text-muted-foreground mb-1rem text-0.875rem line-clamp-2">
							{{ item.description }}
						</p>
						<div class="flex items-center justify-between">
							<span class="text-1.25rem font-700 text-primary">{{
								item.price
							}}</span>
							<Icon
								name="mdi:cart"
								class="w-1.25rem h-1.25rem text-muted-foreground"
							/>
						</div>
					</div>
				</a>
			</div>
		</div>

		<div v-else class="text-center py-4rem text-muted-foreground">
			<p>No items found</p>
		</div>
	</div>
</template>
