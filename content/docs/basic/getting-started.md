---
title: เริ่มต้นใช้งาน
description: วิธีการเริ่มต้นใช้งานโปรเจกต์
order: 1
category: เริ่มต้น
tags:
  - installation
  - setup
  - quick-start
updatedAt: 2026-01-19
---

# เริ่มต้นใช้งาน

## การติดตั้ง

เริ่มต้นด้วยการ clone repository:

```bash
git clone https://github.com/wrikka/wrikka-com.git
cd wrikka-com
```

ติดตั้ง dependencies:

```bash
bun install
```

## การรันโปรเจกต์

รัน development server:

```bash
bun dev
```

เปิด browser ที่ `http://localhost:3000`

## การ build

สำหรับ production:

```bash
bun build
```

## การ deploy

โปรเจกต์นี้ deploy บน Cloudflare Pages โดยใช้ Nitro preset
