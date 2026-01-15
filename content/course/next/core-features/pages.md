---
title: Pages
description: Create pages in Next.js using the app directory
icon: mdi:file-document-multiple
group: Core Features
---

# Pages

Create pages in Next.js using the app directory.

## App Router

```typescript
// app/page.tsx
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

// app/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  )
}

// app/blog/[id]/page.tsx (Dynamic route)
export default function BlogPost({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Blog Post {params.id}</h1>
    </div>
  )
}
```

## Layouts

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

## Navigation

```typescript
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </div>
  )
}
```
