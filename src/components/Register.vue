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
        <div v-if="message" class="message" :class="messageType">
            {{ message }}
        </div>

        <form @submit.prevent="handleRegister" class="form">
            <div class="form-group">
                <input
                    type="text"
                    id="register-username"
                    v-model="registerForm.username"
                    required
                    placeholder="Ваше имя"
                />
            </div>

            <div class="form-group">
                <input
                    type="email"
                    id="register-email"
                    v-model="registerForm.email"
                    required
                    placeholder="your@email.com"
                />
            </div>

            <div class="form-group">
                <input
                    type="password"
                    id="register-password"
                    v-model="registerForm.password"
                    required
                    minlength="6"
                    placeholder="Пароль(минимум 6 символов)"
                />
            </div>

            <button type="submit" class="btn btn-primary" :disabled="loading">
                {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
            </button>
        </form>

        <p class="auth-switch">
            Уже есть аккаунт?
            <router-link
                to="/auth?tab=login"
                @click.prevent="$emit('switchTab', 'login')"
            >
                Войдите
            </router-link>
        </p>
    </div>
</template>

<style scoped>
.auth-form {
    max-width: 400px;
    margin: 0 auto;
}

.btn {
    width: 100%;
}

.auth-form h2 {
    text-align: center;
    margin-bottom: 30px;
    color: var(--color-text-primary);
    font-size: 24px;
    font-weight: 600;
}

.message {
    text-align: center;
    margin-bottom: 15px;
}

.auth-switch {
    text-align: center;
    margin-top: 20px;
}

.auth-switch a {
    color: var(--color-purple);
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

.form {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
}

.form-group input {
    border: 1px solid var(--color-text-primary);
    padding: 10px 20px;
    border-radius: 15px;
    font-size: 18px;
    width: 100%;
}

.btn-primary {
    background-color: var(--color-purple);
    color: var(--color-white);
    font-weight: 500;
    padding: 15px;
    border-radius: 15px;
}

.btn-primary:hover {
    background-color: #5223df;
}

[data-theme='dark'] .btn-primary:hover {
    background-color: #754eeb;
}

@media (max-width: 500px) {
    .auth-form {
        max-width: 400px;
        margin: 0 auto;
    }

    .auth-form h2 {
        margin-bottom: 20px;
        font-size: 22px;
    }

    .auth-switch {
        margin-top: 10px;
    }

    .form {
        row-gap: 10px;
    }

    .form-group input {
        padding: 10px 20px;
        font-size: 16px;
    }

    .btn-primary {
        padding: 12px;
    }
}
</style>
