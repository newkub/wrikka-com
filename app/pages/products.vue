<script setup lang="ts">
import { useProducts } from "~/composables/products";

const { products } = await useProducts();
</script>

<template>
	<div class="p-4">
		<h1 class="text-4xl font-bold mb-8">Products</h1>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<ProductCard
				v-for="product in products"
				:key="product.id"
				:product="product"
			/>
		</div>
	</div>
</template>
