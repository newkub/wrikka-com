---
title: "เทคนิคการใช้ Vue Composition API อย่างมีประสิทธิภาพ"
date: "2025-01-20"
excerpt: "แนวทางและเทคนิคต่างๆ ในการใช้ Vue Composition API ให้เกิดประโยชน์สูงสุด พร้อมตัวอย่าง code ที่เป็นประโยชน์"
slug: "vue-composition-api-tips"
readingTime: 5
image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop&crop=top"
---

# เทคนิคการใช้ Vue Composition API อย่างมีประสิทธิภาพ

Vue Composition API เป็นหนึ่งในฟีเจอร์ที่น่าสนใจที่สุดของ Vue 3 ที่ช่วยให้เราสามารถจัดการ logic ของ component ได้อย่างมีระเบียบและยืดหยุ่นมากขึ้น

## 1. ใช้ Composables สำหรับ Logic ที่ใช้ซ้ำ

แทนที่จะเขียน logic ซ้ำๆ ในหลาย component ให้สร้าง composable function:

```typescript [composables/useCounter.ts]
import { computed, ref } from "vue";

export function useCounter(initialValue = 0) {
	const count = ref(initialValue);

	const increment = () => count.value++;
	const decrement = () => count.value--;
	const reset = () => count.value = initialValue;

	const isEven = computed(() => count.value % 2 === 0);

	return {
		count: readonly(count),
		increment,
		decrement,
		reset,
		isEven,
	};
}
```

## 2. จัดกลุม Related State เข้าด้วยกัน

```typescript [components/UserProfile.vue]
// ไม่ดี
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const age = ref(0);

// ดีกว่า
const user = reactive({
	firstName: "",
	lastName: "",
	email: "",
	age: 0,
});

const fullName = computed(() => `${user.firstName} ${user.lastName}`);
```

## 3. ใช้ Watch อย่างมีประสิทธิภาพ

```typescript [composables/useWatcher.ts]
// Watch หลาย values พร้อมกัน
watch([user.firstName, user.lastName], ([newFirst, newLast]) => {
	console.log(`Name changed: ${newFirst} ${newLast}`);
});

// Watch เฉพาะเมื่อค่าเปลี่ยนจริงๆ
watch(user, (newUser) => {
	// จะทำงานเฉพาะเมื่อ user object เปลี่ยน
}, { deep: true });
```

## 4. Lifecycle Hooks ใน Composition API

```typescript [composables/useWindowSize.ts]
import { onMounted, onUnmounted, ref } from "vue";

export function useWindowSize() {
	const width = ref(window.innerWidth);
	const height = ref(window.innerHeight);

	const updateSize = () => {
		width.value = window.innerWidth;
		height.value = window.innerHeight;
	};

	onMounted(() => {
		window.addEventListener("resize", updateSize);
	});

	onUnmounted(() => {
		window.removeEventListener("resize", updateSize);
	});

	return { width, height };
}
```

## 5. Type Safety กับ TypeScript

```typescript [types/user.ts]
interface User {
	id: number;
	name: string;
	email: string;
}

const users = ref<User[]>([]);
const selectedUser = ref<User | null>(null);

// ใช้ generic กับ computed
const userNames = computed<string[]>(() => users.value.map(user => user.name));
```

## สรุป

Composition API ช่วยให้เราสามารถ:

- จัดระเบียบ code ได้ดีขึ้น
- สร้าง reusable logic ได้ง่าย
- มี type safety ที่ดีกว่า
- ทดสอบได้ง่ายขึ้น

ลองนำเทคนิคเหล่านี้ไปใช้ในโปรเจกต์ของคุณดูนะครับ!
