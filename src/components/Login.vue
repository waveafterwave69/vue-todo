<template>
    <div class="auth-form">
        <h2>Вход в систему</h2>

        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="login-email">Email:</label>
                <input
                    type="email"
                    id="login-email"
                    v-model="loginForm.email"
                    required
                    placeholder="your@email.com"
                />
            </div>

            <div class="form-group">
                <label for="login-password">Пароль:</label>
                <input
                    type="password"
                    id="login-password"
                    v-model="loginForm.password"
                    required
                    placeholder="Ваш пароль"
                />
            </div>

            <button type="submit" class="btn btn-primary" :disabled="loading">
                {{ loading ? 'Вход...' : 'Войти' }}
            </button>
        </form>

        <div v-if="message" class="message" :class="messageType">
            {{ message }}
        </div>

        <p class="auth-switch">
            Нет аккаунта?
            <a href="#" @click.prevent="$emit('switchTab', 'register')">
                Зарегистрируйтесь
            </a>
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth'

interface LoginForm {
    email: string
    password: string
}

interface Emits {
    (e: 'switchTab', tab: 'register'): void
}

const emit = defineEmits<Emits>()
const router = useRouter()

const loginForm = reactive<LoginForm>({
    email: '',
    password: '',
})

const loading = ref<boolean>(false)
const message = ref<string>('')
const messageType = ref<'success' | 'error'>('error')

const handleLogin = async (): Promise<void> => {
    loading.value = true
    message.value = ''

    const result = await authService.login(loginForm.email, loginForm.password)

    if (result.success) {
        message.value = '✅ Вход успешен!'
        messageType.value = 'success'

        setTimeout(() => {
            router.push('/home')
        }, 1000)
    } else {
        message.value = `❌ Ошибка: ${result.error}`
        messageType.value = 'error'
    }

    loading.value = false
}
</script>

<style scoped>
.auth-form {
    max-width: 400px;
    margin: 0 auto;
}

.auth-form h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
}

.auth-switch {
    text-align: center;
    margin-top: 20px;
}

.auth-switch a {
    color: #2196f3;
    text-decoration: none;
}

.auth-switch a:hover {
    text-decoration: underline;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
}
</style>
