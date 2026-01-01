<script setup lang="ts">
const { products } = useProducts();
</script>

<template>
	<div class="p-4">
		<h1 class="text-4xl font-bold mb-8">Products</h1>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<NuxtLink
				v-for="product in products"
				:key="product.name"
				:to="product.url"
				target="_blank"
			>
				<Card :title="product.name" />
			</NuxtLink>
		</div>
	</div>
</template>
