<script setup lang="ts">
import Card from '../components/Card.vue'

const products = [
  {
    title: 'Developer T-Shirt',
    price: 29.99,
    image: 'https://picsum.photos/seed/product1/400/225',
    description: 'Comfortable cotton t-shirt with cool developer designs',
    link: 'https://example.com/shop/dev-tshirt'
  },
  {
    title: 'Code Mug',
    price: 19.99,
    image: 'https://picsum.photos/seed/product2/400/225',
    description: 'Ceramic mug with programming jokes',
    link: 'https://example.com/shop/code-mug'
  },
  {
    title: 'Laptop Stickers Pack',
    price: 12.99,
    image: 'https://picsum.photos/seed/product3/400/225',
    description: 'Set of 10 programming-themed stickers',
    link: 'https://example.com/shop/stickers'
  },
  {
    title: 'Mechanical Keyboard',
    price: 149.99,
    image: 'https://picsum.photos/seed/product4/400/225',
    description: 'RGB mechanical keyboard with custom switches',
    link: 'https://example.com/shop/keyboard'
  }
]
</script>

<template>
  <div class="max-w-[var(--max-content-width)] mx-auto px-4">
    <h1 class="text-3xl font-bold mb-8">Shop</h1>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="product in products"
        :key="product.title"
        v-bind="product"
        :onClick="() => window.open(product.link, '_blank')"
      />
    </div>
  </div>
</template>