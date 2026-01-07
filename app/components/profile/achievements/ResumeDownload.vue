<script setup lang="ts">
</script>

<template>
  <section class="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-8 border border-accent/20">
    <div class="text-center">
      <Icon name="mdi:file-document" class="text-4xl text-accent mb-4" />
      <h3 class="text-2xl font-bold text-primary dark:text-primary-dark mb-4">
        Download My Resume
      </h3>
      <p class="text-secondary mb-6 max-w-md mx-auto">
        Get a detailed overview of my experience, skills, and professional background
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/resume.pdf"
          download
          class="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
        >
          <Icon name="mdi:download" />
          Download PDF
        </a>
        
        <a
          href="/resume.docx"
          download
          class="inline-flex items-center gap-2 px-6 py-3 bg-surface-200 dark:bg-surface-700 text-primary dark:text-primary-dark rounded-lg hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
        >
          <Icon name="mdi:file-word" />
          Download DOCX
        </a>
      </div>
    </div>
  </section>
</template>
