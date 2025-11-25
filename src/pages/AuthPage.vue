<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

const route = useRoute()
const router = useRouter()

// Определяем активную вкладку на основе query параметра
const activeTab = computed(() => {
    return route.query.tab === 'register' ? 'register' : 'login'
})

// Функция для переключения вкладок
const switchTab = (tab: string) => {
    router.push({ path: '/auth', query: { tab } })
}
</script>

<template>
    <div class="auth-page">
        <div class="auth__components">
            <Login v-if="activeTab === 'login'" />
            <Register v-if="activeTab === 'register'" />
        </div>
    </div>
</template>

<style scoped>
.auth-page {
    padding: 10px;
    margin-top: 40px;
}

.auth__components {
    max-width: 400px;
    margin: 0 auto;
}
</style>
