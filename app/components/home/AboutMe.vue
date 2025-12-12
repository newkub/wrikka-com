<script setup lang="ts">
const menuItems = [
	{
		name: "Learn",
		path: "/learn",
		icon: "i-mdi-school",
		color: "text-menu-learn",
		bgColor: "hover:border-menu-learn",
	},
	{
		name: "Blog",
		path: "/blog",
		icon: "i-mdi-post",
		color: "text-menu-blog",
		bgColor: "hover:border-menu-blog",
	},
	{
		name: "Project",
		path: "/project",
		icon: "i-mdi-folder-multiple",
		color: "text-menu-project",
		bgColor: "hover:border-menu-project",
	},
];
</script>

<template>
	<div class="space-y-8">
		<!-- About Me -->
		<div class="space-y-6">
			<h2 class="text-3xl font-bold text-primary dark:text-primary-dark">
				เกี่ยวกับฉัน
			</h2>
			<div class="text-secondary dark:text-secondary-dark leading-relaxed space-y-6 text-lg">
				<p>
					สวัสดีครับ! ผมคือ <span
						class="font-semibold text-accent dark:text-accent-dark"
					>Wrikka</span>
					นักพัฒนาเว็บไซต์ที่หลงใหลในการสร้างสรรค์แอปพลิเคชันที่สวยงามและใช้งานง่าย
				</p>
				<p>
					ผมชอบทำงานกับเทคโนโลยีที่ทันสมัย สร้างประสบการณ์ผู้ใช้ที่น่าประทับใจ
					และแบ่งปันความรู้ผ่านบล็อกและโปรเจกต์โอเพนซอร์ส
				</p>
				<p>
					หากคุณสนใจคุยเรื่องเทคโนโลยี ทำโปรเจกต์ร่วมกัน หรือต้องการความช่วยเหลือ
					ติดต่อมาได้เลยครับ ยินดีที่จะได้แลกเปลี่ยนและเรียนรู้ไปด้วยกัน
				</p>
			</div>
		</div>

		<!-- Quick Navigation -->
		<div class="space-y-4">
			<h3 class="text-xl font-bold text-primary dark:text-primary-dark">
				สำรวจเนื้อหา
			</h3>
			<div class="flex flex-wrap gap-3">
				<NuxtLink
					v-for="item in menuItems"
					:key="item.name"
					:to="item.path"
					class="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-100 dark:bg-surface-100-dark text-secondary dark:text-secondary-dark transition-all duration-200 group hover:scale-105 hover:shadow-md hover:bg-accent dark:hover:bg-accent-dark hover:text-white"
				>
					<div
						:class="[item.icon, item.color]"
						class="w-5 h-5 group-hover:text-white transition-colors"
					/>
					<span class="font-medium">{{ item.name }}</span>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
