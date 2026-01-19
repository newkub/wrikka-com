---
title: สถาปัตยกรรม
description: โครงสร้างและสถาปัตยกรรมของโปรเจกต์
order: 2
category: โครงสร้าง
tags:
  - architecture
  - structure
  - tech-stack
updatedAt: 2026-01-19
---

# สถาปัตยกรรม

## Tech Stack

- **Framework**: Nuxt 4
- **Styling**: UnoCSS
- **State Management**: Pinia
- **Icons**: @nuxt/icon
- **Deployment**: Cloudflare Pages (Nitro)

## โครงสร้างโปรเจกต์

```
wrikka-com/
├── app/
│   ├── components/     # Vue components
│   ├── composables/    # Vue composables
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components
│   └── stores/         # Pinia stores
├── content/
│   ├── blog/          # Blog posts
│   ├── course/        # Course content
│   └── docs/          # Documentation
├── public/            # Static assets
└── server/            # Server API routes
```

## การจัดการ Content

เราใช้ custom `queryContent` composable สำหรับจัดการ markdown files ที่อยู่ในโฟลเดอร์ `content/`
