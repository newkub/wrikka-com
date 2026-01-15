---
title: Components
description: Create components in React
icon: mdi:view-dashboard
group: Core Features
---

# Components

Create components in React.

## Functional Components

```typescript
export default function MyComponent() {
  return <div>My Component</div>
}
```

## Component Props

```typescript
interface Props {
  title: string;
  count?: number;
}

export default function MyComponent({ title, count = 0 }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <p>Count: {count}</p>
    </div>
  )
}
```

## State

```typescript
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

## Effects

```typescript
import { useEffect, useState } from 'react'

export default function DataFetcher() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData)
  }, [])

  return <div>{JSON.stringify(data)}</div>
}
```
