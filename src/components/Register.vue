<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth'
import { RegisterData } from '@/types'

interface Emits {
    (e: 'switchTab', tab: 'login'): void
}

const emit = defineEmits<Emits>()
const router = useRouter()

const registerForm = reactive<RegisterData>({
    username: '',
    email: '',
    password: '',
})

const loading = ref<boolean>(false)
const message = ref<string>('')
const messageType = ref<'success' | 'error'>('error')

const handleRegister = async (): Promise<void> => {
    loading.value = true
    message.value = ''

    const result = await authService.register(registerForm)

    if (result.success) {
        message.value = '✅ Регистрация успешна!'
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

<template>
    <div class="auth-form">
        <h2>Регистрация</h2>

        <form @submit.prevent="handleRegister">
            <div class="form-group">
                <label for="register-username">Имя пользователя:</label>
                <input
                    type="text"
                    id="register-username"
                    v-model="registerForm.username"
                    required
                    placeholder="Ваше имя"
                />
            </div>

            <div class="form-group">
                <label for="register-email">Email:</label>
                <input
                    type="email"
                    id="register-email"
                    v-model="registerForm.email"
                    required
                    placeholder="your@email.com"
                />
            </div>

            <div class="form-group">
                <label for="register-password">Пароль:</label>
                <input
                    type="password"
                    id="register-password"
                    v-model="registerForm.password"
                    required
                    minlength="6"
                    placeholder="Минимум 6 символов"
                />
            </div>

            <button type="submit" class="btn btn-primary" :disabled="loading">
                {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
            </button>
        </form>

        <div v-if="message" class="message" :class="messageType">
            {{ message }}
        </div>

        <p class="auth-switch">
            Уже есть аккаунт?
            <a href="#" @click.prevent="$emit('switchTab', 'login')">
                Войдите
            </a>
        </p>
    </div>
</template>

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
