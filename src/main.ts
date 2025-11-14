import './styles/main.css'
import App from './App.vue'
import { router } from './routes/routes'
import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const myApp = createApp(App)

myApp.use(router)
myApp.mount('#app')

myApp.use(autoAnimatePlugin)
