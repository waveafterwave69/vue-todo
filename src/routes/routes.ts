import HomePage from '@/pages/HomePage.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [{ path: '/', component: HomePage }]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
