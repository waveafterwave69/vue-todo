import './styles/main.css'
import App from './App.vue'
import { router } from './routes/routes'
import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'

const myApp = createApp(App)
const pinia = createPinia()

myApp.use(router)
myApp.use(pinia)
myApp.use(autoAnimatePlugin)

myApp.mount('#app')
