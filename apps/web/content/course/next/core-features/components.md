---
title: Components
description: Create components in Next.js
icon: mdi:view-dashboard
group: Core Features
---

# Components

Create components in Next.js.

## Components

```typescript
// components/MyComponent.tsx
export default function MyComponent() {
	return <div>My Component</div>;
}
```

## Component Props

```typescript
interface Props {
	title: string;
	count: number;
}

export default function MyComponent({ title, count = 0 }: Props) {
	return (
		<div>
			<h2>{title}</h2>
			<p>Count: {count}</p>
		</div>
	);
}
```

## Client Components

```typescript
"use client";

import { useState } from "react";

export default function Counter() {
	const [count, setCount] = useState(0);

	return (
		<button onClick={() => setCount(count + 1)}>
			Count: {count}
		</button>
	);
}
```

## Server Components

```typescript
// Default is server component
export default async function ServerComponent() {
	const data = await fetch("https://api.example.com/data");
	const json = await data.json();

	return <div>{json.message}</div>;
}
```
