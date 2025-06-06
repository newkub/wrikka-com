<template>
  <div class="changelog">
    <h1>Changelog</h1>
    <div class="timeline">
      <div v-for="(item, index) in changelogItems" :key="index" class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h3>{{ item.version }} <span class="date">{{ item.date }}</span></h3>
          <ul>
            <li v-for="(change, i) in item.changes" :key="i">{{ change }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const changelogItems = [
  {
    version: 'v1.0.0',
    date: '2025-06-01',
    changes: [
      'เปิดตัวเว็บไซต์ครั้งแรก',
      'เพิ่มระบบแสดงข่าวสาร',
      'เพิ่มระบบแสดงบล็อก'
    ]
  },
  {
    version: 'v0.5.0',
    date: '2025-05-15',
    changes: [
      'พัฒนาระบบหลังบ้าน',
      'ออกแบบ UI เริ่มต้น'
    ]
  }
]
</script>

<style scoped>
.changelog {
  padding: 1rem;
}

.timeline {
  position: relative;
  padding-left: 1.5rem;
  margin-top: 2rem;
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
}

.timeline-marker {
  position: absolute;
  left: -1.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #3b82f6;
  border: 3px solid white;
  z-index: 1;
}

.timeline-content {
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.timeline-content h3 {
  margin-top: 0;
  color: #1e40af;
}

.date {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: normal;
}

ul {
  padding-left: 1.25rem;
  margin-bottom: 0;
}

li {
  margin-bottom: 0.5rem;
}
</style>