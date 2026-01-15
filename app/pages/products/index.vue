<script setup lang="ts">
useSeoMeta({
	title: "Products",
	description: "My products and digital goods",
})

interface Product {
	id: string
	name: string
	description: string
	imageUrl: string
	price: string
	url: string
}

const { data: products } = await useFetch<Product[]>("/api/products")
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-2.5rem font-700 mb-0.5rem md:text-2rem text-gray-900 dark:text-gray-100">Products</h1>
			<p class="text-1.125rem text-gray-600 dark:text-gray-400">My products and digital goods</p>
		</div>

		<div v-if="products && products.length > 0" class="max-w-6xl mx-auto px-1.5rem">
			<div class="grid grid-cols-1 gap-1.5rem md:grid-cols-2 lg:grid-cols-3">
				<a
					v-for="product in products"
					:key="product.id"
					:href="product.url"
					target="_blank"
					rel="noopener"
					class="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-0.5rem overflow-hidden block transition-all-0.2s hover:-translate-y-2px hover:shadow-lg no-underline text-gray-900 dark:text-gray-100"
				>
					<div class="relative aspect-video">
						<img
							:src="product.imageUrl"
							:alt="product.name"
							class="w-full h-full object-cover"
						/>
					</div>
					<div class="p-1.5rem">
						<h3 class="text-1.125rem font-600 m-0 mb-0.5rem">{{ product.name }}</h3>
						<p class="text-gray-600 dark:text-gray-400 mb-1rem text-0.875rem line-clamp-2">{{ product.description }}</p>
						<div class="flex items-center justify-between">
							<span class="text-1.25rem font-700 text-blue-600 dark:text-blue-400">{{ product.price }}</span>
							<Icon name="mdi:cart" class="w-1.25rem h-1.25rem text-gray-600 dark:text-gray-400" />
						</div>
					</div>
				</a>
			</div>
		</div>

		<div v-else class="text-center py-4rem text-gray-600 dark:text-gray-400">
			<p>No products found</p>
		</div>
	</div>
</template>
