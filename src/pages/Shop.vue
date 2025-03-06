<script setup lang="ts">
const products = [
  {
    id: 1,
    name: 'Developer T-Shirt',
    price: 29.99,
    image: 'https://picsum.photos/seed/product1/400/400',
    description: 'Comfortable cotton t-shirt with cool developer designs',
    link: 'https://example.com/shop/dev-tshirt'
  },
  {
    id: 2,
    name: 'Code Mug',
    price: 19.99,
    image: 'https://picsum.photos/seed/product2/400/400',
    description: 'Ceramic mug with programming jokes',
    link: 'https://example.com/shop/code-mug'
  },
  {
    id: 3,
    name: 'Laptop Stickers Pack',
    price: 12.99,
    image: 'https://picsum.photos/seed/product3/400/400',
    description: 'Set of 10 programming-themed stickers',
    link: 'https://example.com/shop/stickers'
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 149.99,
    image: 'https://picsum.photos/seed/product4/400/400',
    description: 'RGB mechanical keyboard with custom switches',
    link: 'https://example.com/shop/keyboard'
  }
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4">
    <h1 class="text-3xl font-bold mb-8">Shop</h1>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a v-for="product in products" 
         :key="product.id"
         :href="product.link"
         target="_blank"
         rel="noopener noreferrer"
         class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
        <img :src="product.image" :alt="product.name" class="w-full h-40 object-cover" />
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-1">{{ product.name }}</h3>
          <p class="text-primary-color font-bold text-lg">${{ product.price }}</p>
        </div>
      </a>
    </div>
  </div>
</template>