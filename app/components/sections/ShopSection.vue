<script setup lang="ts">
const { items } = useShop();
</script>

<template>
	<div class="space-y-12">
		<section class="text-center">
			<h1 class="text-5xl font-extrabold text-white">My Shop</h1>
			<p class="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
				A curated list of gear, software, and resources I use and recommend.
			</p>
		</section>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<ShopShopItemCard
				v-for="item in items"
				:key="item.name"
				:item="item"
			/>
		</div>
	</div>
</template>
