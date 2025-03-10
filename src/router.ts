import { createRouter, createWebHistory } from 'vue-router'
import Personal from './pages/Personal.vue'
import Projects from './pages/Projects.vue'
import Shop from './pages/Shop.vue'
import Blog from './pages/Blog.vue'
import BlogPost from './pages/BlogPost.vue'
import Design from './pages/Design.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Personal },
    { path: '/projects', component: Projects },
    { path: '/shop', component: Shop },
    { path: '/blog', component: Blog },
    { path: '/blog/:id', component: BlogPost },
    { path: '/design', component: Design },
  ],
})