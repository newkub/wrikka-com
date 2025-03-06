<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true,
    default: 'https://scontent.fhdy1-1.fna.fbcdn.net/v/t39.30808-6/440967283_1559796247915433_1502119988520930020_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=HBwV82ija3gQ7kNvgGH9zj4&_nc_oc=AdgKTbwRVm4EukTV-ltMcFXU_v9uEesyeIqbtWTkSoqPAsoyzHBbk9SkwB6TszZ17KY&_nc_zt=23&_nc_ht=scontent.fhdy1-1.fna&_nc_gid=ARkqkZP2bjlip16ke2O38vX&oh=00_AYCuxG7wUW1T6EZOTruxLES9CDB4tXPS5aoDMXKD9hJtcQ&oe=67CFACE6'
  }
})
</script>

<template>
  <div class="text-center space-y-4">
    <img :src="props.src" alt="Avatar" 
         class="w-32 h-32 rounded-full mx-auto shadow-lg" />
    <h1 class="text-4xl font-bold">{{ props.name }}</h1>
    <p class="text-xl text-gray-600 dark:text-gray-300">{{ props.title }}</p>
  </div>
</template>
