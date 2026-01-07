<script setup lang="ts">
import { achievements, testimonials } from './achievements/AchievementsData';
import AchievementCard from './achievements/AchievementCard.vue';
import TestimonialCard from './achievements/TestimonialCard.vue';
import ResumeDownload from './achievements/ResumeDownload.vue';
</script>

<template>
  <div class="space-y-12">
    <!-- Achievements Section -->
    <section class="space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-primary dark:text-primary-dark mb-4">
          Achievements & Certifications
        </h2>
        <p class="text-secondary max-w-2xl mx-auto">
          Professional milestones and recognition
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AchievementCard
          v-for="achievement in achievements"
          :key="achievement.id"
          :achievement="achievement"
        />
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-primary dark:text-primary-dark mb-4">
          Testimonials
        </h2>
        <p class="text-secondary max-w-2xl mx-auto">
          What colleagues and clients say about working with me
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TestimonialCard
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          :testimonial="testimonial"
        />
      </div>
    </section>

    <ResumeDownload />
  </div>
</template>
