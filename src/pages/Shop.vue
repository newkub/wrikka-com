<script setup lang="ts">
import { ref } from 'vue'

const products = [
  {
    id: 1,
    name: 'Developer T-Shirt',
    price: 29.99,
    image: 'https://picsum.photos/seed/product1/400/400',
    description: 'Comfortable cotton t-shirt with cool developer designs'
  },
  {
    id: 2,
    name: 'Code Mug',
    price: 19.99,
    image: 'https://picsum.photos/seed/product2/400/400',
    description: 'Ceramic mug with programming jokes'
  },
  {
    id: 3,
    name: 'Laptop Stickers Pack',
    price: 12.99,
    image: 'https://picsum.photos/seed/product3/400/400',
    description: 'Set of 10 programming-themed stickers'
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 149.99,
    image: 'https://picsum.photos/seed/product4/400/400',
    description: 'RGB mechanical keyboard with custom switches'
  }
]

const selectedProduct = ref(null)

const showDetails = (product) => {
  selectedProduct.value = product
}

const closeDetails = () => {
  selectedProduct.value = null
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4">
    <h1 class="text-3xl font-bold mb-8">Shop</h1>
    
    <div class="grid md:grid-cols-2 gap-6">
      <div v-for="product in products" 
           :key="product.id"
           class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
           @click="showDetails(product)">
        <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover" />
        <div class="p-4">
          <h3 class="text-xl font-semibold">{{ product.name }}</h3>
          <p class="text-primary-color font-bold mt-2">${{ product.price }}</p>
        </div>
      </div>
    </div>

    <!-- Product Details Modal -->
    <div v-if="selectedProduct" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold">{{ selectedProduct.name }}</h2>
          <button @click="closeDetails" 
                  class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <div class="i-carbon-close text-xl" />
          </button>
        </div>
        <img :src="selectedProduct.image" :alt="selectedProduct.name" 
             class="w-full h-64 object-cover rounded-lg mb-4" />
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ selectedProduct.description }}</p>
        <div class="flex justify-between items-center">
          <p class="text-2xl font-bold text-primary-color">${{ selectedProduct.price }}</p>
          <button class="bg-primary-color text-white px-6 py-2 rounded-lg hover:opacity-90">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>