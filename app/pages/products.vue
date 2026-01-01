<script setup lang="ts">
import ProductCard from "../components/ProductCard.vue";

const { products } = useProducts();
</script>

<template>
	<div class="space-y-12">
		<section class="text-center">
			<h1 class="text-5xl font-extrabold text-white">My Products</h1>
			<p class="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
				A selection of digital products and tools I've created to help
				developers and designers.
			</p>
		</section>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<ProductCard
				v-for="product in products"
				:key="product.name"
				:product="product"
			/>
		</div>
	</div>
</template>
