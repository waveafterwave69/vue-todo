import AuthPage from '@/pages/AuthPage.vue'
import HomePage from '@/pages/HomePage.vue'
import PromoPage from '@/pages/PromoPage.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
    { path: '/auth', component: AuthPage },
    { path: '/', component: PromoPage },
    { path: '/home', component: HomePage },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
