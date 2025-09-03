export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  readingTime: number
}

// Mock blog data - ในอนาคตสามารถเชื่อมต่อกับ CMS หรือ markdown files
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "เริ่มต้นกับ Vue 3 และ Nuxt 3",
    slug: "getting-started-with-vue3-nuxt3",
    excerpt: "เรียนรู้พื้นฐานการใช้งาน Vue 3 และ Nuxt 3 สำหรับพัฒนาเว็บแอปพลิเคชันสมัยใหม่",
    content: `
      <h2>Vue 3 และ Nuxt 3 คืออะไร?</h2>
      <p>Vue 3 เป็น JavaScript framework ที่ช่วยในการพัฒนา user interfaces ในขณะที่ Nuxt 3 เป็น meta-framework ที่สร้างขึ้นบน Vue 3</p>
      
      <h3>คุณสมบัติใหม่ใน Vue 3</h3>
      <ul>
        <li><strong>Composition API</strong> - วิธีใหม่ในการจัดการ component logic</li>
        <li><strong>Better TypeScript Support</strong> - รองรับ TypeScript ได้ดีขึ้น</li>
        <li><strong>Improved Performance</strong> - ประสิทธิภาพที่ดีกว่า Vue 2</li>
      </ul>
      
      <h3>ข้อดีของ Nuxt 3</h3>
      <ul>
        <li>Server-Side Rendering (SSR)</li>
        <li>Static Site Generation (SSG)</li>
        <li>Auto-imports</li>
        <li>File-based routing</li>
      </ul>
      
      <pre><code>// ตัวอย่าง Composition API
&lt;script setup lang="ts"&gt;
import { ref } from 'vue'

const count = ref(0)
const increment = () =&gt; count.value++
&lt;/script&gt;</code></pre>
      
      <p>การเริ่มต้นใช้งาน Vue 3 และ Nuxt 3 จะช่วยให้คุณพัฒนาแอปพลิเคชันที่มีประสิทธิภาพและใช้งานง่าย</p>
    `,
    date: "2024-01-15",
    readingTime: 5
  },
  {
    id: 2,
    title: "UnoCSS: Utility-First CSS Framework ใหม่",
    slug: "unocss-utility-first-css-framework",
    excerpt: "ทำความรู้จักกับ UnoCSS framework ที่มาแทนที่ Tailwind CSS พร้อมประสิทธิภาพที่ดีกว่า",
    content: `
      <h2>UnoCSS คืออะไร?</h2>
      <p>UnoCSS เป็น utility-first CSS framework ที่สร้างโดย Anthony Fu มาเพื่อแก้ไขข้อจำกัดของ Tailwind CSS</p>
      
      <h3>ข้อดีของ UnoCSS</h3>
      <ul>
        <li><strong>ประสิทธิภาพสูง</strong> - Build เวลาเร็วกว่า Tailwind CSS</li>
        <li><strong>Fully Customizable</strong> - กำหนดค่าได้อย่างอิสระ</li>
        <li><strong>On-demand</strong> - สร้าง CSS เฉพาะที่ใช้จริง</li>
        <li><strong>Multiple Presets</strong> - มี presets หลายแบบให้เลือก</li>
      </ul>
      
      <h3>การติดตั้งและใช้งาน</h3>
      <pre><code># ติดตั้ง UnoCSS
npm install -D unocss

# กำหนดค่าใน uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  // กำหนดค่าต่างๆ ที่นี่
})</code></pre>
      
      <h3>ตัวอย่างการใช้งาน</h3>
      <pre><code>&lt;div class="flex items-center justify-center min-h-screen bg-blue-500"&gt;
  &lt;h1 class="text-4xl font-bold text-white"&gt;Hello UnoCSS!&lt;/h1&gt;
&lt;/div&gt;</code></pre>
      
      <blockquote>
        <p>UnoCSS ให้ประสิทธิภาพและความยืดหยุ่นที่เหนือกว่า framework อื่นๆ</p>
      </blockquote>
    `,
    date: "2024-01-08",
    readingTime: 7
  },
  {
    id: 3,
    title: "TypeScript Best Practices สำหรับ Vue Developer",
    slug: "typescript-best-practices-vue-developer",
    excerpt: "เทคนิคและแนวปฏิบัติที่ดีในการใช้ TypeScript กับ Vue.js เพื่อโค้ดที่มีคุณภาพ",
    content: `
      <h2>ทำไมต้องใช้ TypeScript กับ Vue?</h2>
      <p>TypeScript ช่วยให้เราเขียนโค้ด Vue ที่มีความปลอดภัยมากขึ้น และลดข้อผิดพลาดในการพัฒนา</p>
      
      <h3>การตั้งค่า TypeScript ใน Vue 3</h3>
      <pre><code>// components/UserCard.vue
&lt;script setup lang="ts"&gt;
interface User {
  id: number
  name: string
  email: string
  isActive?: boolean
}

interface Props {
  user: User
  showEmail?: boolean
}

const props = withDefaults(defineProps&lt;Props&gt;(), {
  showEmail: true
})

const emit = defineEmits&lt;{
  userClick: [user: User]
  statusChange: [status: boolean]
}&gt;()
&lt;/script&gt;</code></pre>
      
      <h3>Best Practices</h3>
      <ul>
        <li><strong>ใช้ Interface</strong> - กำหนด type ของข้อมูลอย่างชัดเจน</li>
        <li><strong>Generic Types</strong> - ใช้ generic สำหรับ composables</li>
        <li><strong>Strict Mode</strong> - เปิด strict mode ใน tsconfig.json</li>
        <li><strong>Type Guards</strong> - ใช้ type guards สำหรับการตรวจสอบ</li>
      </ul>
      
      <h3>ตัวอย่าง Composable with TypeScript</h3>
      <pre><code>// composables/useApi.ts
export function useApi&lt;T&gt;(url: string) {
  const data = ref&lt;T | null&gt;(null)
  const loading = ref(false)
  const error = ref&lt;Error | null&gt;(null)

  const fetchData = async (): Promise&lt;void&gt; =&gt; {
    try {
      loading.value = true
      const response = await $fetch&lt;T&gt;(url)
      data.value = response
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
}</code></pre>
      
      <p>การใช้ TypeScript อย่างถูกต้องจะช่วยให้โครงการมีความเสถียรและบำรุงรักษาได้ง่าย</p>
    `,
    date: "2024-01-01",
    readingTime: 8
  }
]

export const useBlogPosts = () => {
  return useAsyncData('blog-posts', async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  })
}

export const useBlogPost = (slug: string) => {
  return useAsyncData(`blog-post-${slug}`, async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    const post = blogPosts.find(p => p.slug === slug)
    if (!post) {
      throw new Error('Post not found')
    }
    return post
  })
}
