---
title: Plugins
description: Extend Bun with custom plugins
icon: mdi:puzzle
---

# Plugins

Extend Bun with custom plugins.

## Create a Plugin

```typescript
// my-plugin.ts
import { plugin } from 'bun';

plugin({
  name: 'my-plugin',
  setup(build) {
    build.onLoad({ filter: /\.custom$/ }, async (args) => {
      const contents = await Bun.file(args.path).text();
      return {
        contents: `export default ${JSON.stringify(contents)}`,
        loader: 'js',
      };
    });
  },
});
```

## Use the Plugin

```bash
bun --plugin my-plugin.ts run index.ts
```

## Capabilities

Plugins can:

- Transform files
- Add custom loaders
- Modify the build process
- Add new functionality

## Flexibility

Bun's plugin system is powerful and flexible.
