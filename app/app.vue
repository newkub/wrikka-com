<template>
  <div class="app-container">
    <Transition 
      name="page" 
      mode="out-in"
      appear
    >
      <NuxtPage />
    </Transition>
  </div>
</template>

<style>
/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: all var(--transition-normal) ease-in-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(1.02);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Enhanced focus states */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--rounded-sm);
}

/* Motion preferences */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: opacity var(--transition-fast) ease-in-out;
  }
  
  .page-enter-from,
  .page-leave-to {
    transform: none;
  }
  
  html {
    scroll-behavior: auto;
  }
  
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Loading skeleton animation */
@keyframes skeleton-loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.skeleton-loading {
  background: linear-gradient(90deg, 
    var(--color-border) 0%, 
    var(--color-border-light) 50%, 
    var(--color-border) 100%
  );
  background-size: 200px 100%;
  animation: skeleton-loading 1.5s infinite;
}

/* Enhanced hover states */
.hover-lift {
  transition: transform var(--transition-fast) ease-out, 
              box-shadow var(--transition-fast) ease-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Bounce animation for interactive elements */
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.bounce-in {
  animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Fade in up animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

/* Stagger animation utility */
.stagger-children > * {
  animation: fade-in-up 0.6s ease-out both;
}

.stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-children > *:nth-child(3) { animation-delay: 0.3s; }
.stagger-children > *:nth-child(4) { animation-delay: 0.4s; }
.stagger-children > *:nth-child(5) { animation-delay: 0.5s; }
.stagger-children > *:nth-child(6) { animation-delay: 0.6s; }
</style>
