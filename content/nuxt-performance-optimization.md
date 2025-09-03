---
title: "เพิ่มประสิทธิภาพ Nuxt 3 ด้วยเทคนิคเหล่านี้"
date: "2025-01-25"
excerpt: "วิธีการปรับแต่งและเพิ่มประสิทธิภาพให้กับแอป Nuxt 3 ตั้งแต่การ optimize build ไปจนถึง runtime performance"
slug: "nuxt-performance-optimization"
readingTime: 7
---

# เพิ่มประสิทธิภาพ Nuxt 3 ด้วยเทคนิคเหล่านี้

การทำให้เว็บไซต์เร็วขึ้นเป็นสิ่งสำคัญที่ส่งผลต่อ user experience และ SEO วันนี้มาดูเทคนิคต่างๆ ในการเพิ่มประสิทธิภาพ Nuxt 3 กัน

## 1. Image Optimization

ใช้ `@nuxt/image` สำหรับการจัดการรูปภาพ:

```vue
<template>
  <!-- แทนที่ <img> ธรรมดา -->
  <NuxtImg
    src="/hero-image.jpg"
    alt="Hero Image"
    width="800"
    height="600"
    format="webp"
    quality="80"
    loading="lazy"
  />
</template>
```

## 2. Code Splitting และ Lazy Loading

```vue
<script setup>
// Lazy load components
const LazyChart = defineAsyncComponent(() => import('~/components/Chart.vue'))

// Lazy load composables
const { data } = await useLazyAsyncData('posts', () => $fetch('/api/posts'))
</script>

<template>
  <div>
    <!-- Component จะ load เฉพาะเมื่อจำเป็น -->
    <ClientOnly>
      <LazyChart v-if="showChart" />
    </ClientOnly>
  </div>
</template>
```

## 3. การใช้ useFetch อย่างมีประสิทธิภาพ

```typescript
// ดี - ใช้ key สำหรับ caching
const { data: posts } = await useFetch('/api/posts', {
  key: 'posts-list',
  default: () => [],
  transform: (data: any[]) => data.slice(0, 10), // จำกัดข้อมูล
  server: true, // เรียกใน server-side เท่านั้น
})

// สำหรับข้อมูลที่เปลี่ยนบ่อย
const { data: liveData } = await useFetch('/api/live-data', {
  refresh: true,
  refreshCookie: 'live-data-token'
})
```

## 4. Bundle Analysis และ Optimization

ใน `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  // Webpack bundle analyzer
  webpack: {
    analyze: process.env.NODE_ENV === 'development'
  },
  
  // Vite bundle analyzer
  vite: {
    analyze: {
      analyzerMode: 'server'
    }
  },
  
  // Tree shaking
  build: {
    transpile: ['@headlessui/vue'] // เฉพาะที่จำเป็น
  }
})
```

## 5. Preloading และ Prefetching

```vue
<template>
  <div>
    <!-- Preload สำหรับทรัพยากรสำคัญ -->
    <NuxtLink to="/blog" prefetch>
      Blog
    </NuxtLink>
    
    <!-- ไม่ prefetch สำหรับหน้าที่ไม่สำคัญ -->
    <NuxtLink to="/admin" :prefetch="false">
      Admin
    </NuxtLink>
  </div>
</template>
```

## 6. Caching Strategies

```typescript
// Server API caching
export default defineCachedEventHandler(async (event) => {
  // Logic here
  return data
}, {
  maxAge: 60 * 60, // 1 hour
  name: 'api-cache',
  getKey: (event) => event.node.req.url
})

// Static generation
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/blog', '/about'],
      crawlLinks: true
    }
  }
})
```

## 7. Performance Monitoring

```vue
<script setup>
// ใช้ performance API
onMounted(() => {
  // Measure page load time
  const navigation = performance.getEntriesByType('navigation')[0]
  console.log('Page load time:', navigation.loadEventEnd - navigation.fetchStart)
  
  // Measure component render time
  const mark = performance.mark('component-start')
  // ... component logic
  performance.mark('component-end')
  performance.measure('component-render', 'component-start', 'component-end')
})
</script>
```

## 8. CSS Optimization

```vue
<style>
/* Critical CSS inline */
.above-fold {
  /* Styles for content above the fold */
}

/* Non-critical CSS lazy load */
@media (min-width: 768px) {
  .desktop-only {
    /* Desktop specific styles */
  }
}
</style>
```

## เครื่องมือวัดประสิทธิภาพ

- **Lighthouse**: วัด Core Web Vitals
- **WebPageTest**: ทดสอบจากหลายพื้นที่
- **Nuxt DevTools**: ดู bundle size และ performance metrics
- **Vue DevTools**: ติดตาม component performance

## สรุป

การเพิ่มประสิทธิภาพ Nuxt 3 ต้องทำหลายด้าน:

1. **Images**: ใช้ format ที่เหมาะสม และ lazy loading
2. **Code**: Split และ lazy load components
3. **Data**: Cache และ optimize การเรียก API
4. **Assets**: Minify และ compress
5. **Monitoring**: วัดและติดตาม performance อย่างสม่ำเสมอ

ลองนำเทคนิคเหล่านี้ไปใช้และวัดผลดูนะครับ!
