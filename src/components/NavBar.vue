<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth'
import type { User } from 'firebase/auth'
import { useDate } from '@/hooks/useDate'
import { useThemeStore } from '@/store/theme'

const router = useRouter()
const user = ref<User | null>(null)
const isShowProfileMenu = ref<boolean>(false)
const profileMenuRef = ref<HTMLElement | null>(null)
const profileButtonRef = ref<HTMLElement | null>(null)

const handleLogout = async (): Promise<void> => {
    await authService.logout()
    router.push('/')
}

const { currentMonth, day, hoursAndMinutes } = useDate()
const themeStore = useThemeStore()

onMounted(() => {
    authService.onAuthChange((currentUser: User | null) => {
        user.value = currentUser
    })

    // Добавляем обработчик клика по документу
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    // Убираем обработчик при размонтировании компонента
    document.removeEventListener('click', handleClickOutside)
})

const toggleProfileMenu = () => {
    isShowProfileMenu.value = !isShowProfileMenu.value
}

const closeProfileMenu = () => {
    isShowProfileMenu.value = false
}

const handleClickOutside = (event: MouseEvent) => {
    // Проверяем, был ли клик вне меню профиля и кнопки профиля
    if (
        isShowProfileMenu.value &&
        profileMenuRef.value &&
        !profileMenuRef.value.contains(event.target as Node) &&
        profileButtonRef.value &&
        !profileButtonRef.value.contains(event.target as Node)
    ) {
        closeProfileMenu()
    }
}
</script>

<template>
    <nav class="navbar">
        <div class="container">
            <div class="navbar__content">
                <router-link v-if="user" to="/home" class="header__time">
                    {{ hoursAndMinutes }},
                    <span>{{ day }} {{ currentMonth }}</span>
                </router-link>
                <router-link v-else to="/" class="header__time">
                    {{ hoursAndMinutes }},
                    <span>{{ day }} {{ currentMonth }}</span>
                </router-link>

                <div class="nav-menu">
                    <!-- Кнопка переключения темы -->
                    <button
                        class="theme-toggle"
                        @click="themeStore.toggleTheme()"
                        :title="
                            themeStore.theme === 'light'
                                ? 'Переключить на темную тему'
                                : 'Переключить на светлую тему'
                        "
                    >
                        <svg
                            v-if="themeStore.theme === 'light'"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            class="theme-toggle__icon"
                        >
                            <path
                                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <svg
                            v-else
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            class="theme-toggle__icon"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="5"
                                stroke="currentColor"
                                stroke-width="2"
                            />
                            <line
                                x1="12"
                                y1="1"
                                x2="12"
                                y2="3"
                                stroke="currentColor"
                                stroke-width="2"
                            />
                            <line
                                x1="12"
                                y1="21"
                                x2="12"
                                y2="23"
                                stroke="currentColor"
                                stroke-width="2"
                            />
                            <line
                                x1="4.22"
                                y1="4.22"
                                x2="5.64"
                                y2="5.64"
                                stroke="currentColor"
                                stroke-width="2"
                            />
                            <line
                                x1="18.36"
                                y1="18.36"
                                x2="19.78"
                                y2="19.78"
                                stroke="currentColor"
                                stroke-width="2"
                            />
                            <line
                                x1="1"
                                y1="12"
                                x2="3"
                                y2="12"
                                stroke="currentColor"
                                stroke-width="2"
                            />
                            <line
                                x1="21"
                                y1="12"
                                x2="23"
                                y2="12"
                                stroke="currentColor"
                                stroke-width="2"
                            />
                            <line
                                x1="4.22"
                                y1="19.78"
                                x2="5.64"
                                y2="18.36"
                                stroke="currentColor"
                                stroke-width="2"
                            />
                            <line
                                x1="18.36"
                                y1="5.64"
                                x2="19.78"
                                y2="4.22"
                                stroke="currentColor"
                                stroke-width="2"
                            />
                        </svg>

                        <span class="theme-toggle__text">
                            {{
                                themeStore.theme === 'light'
                                    ? 'Темная'
                                    : 'Светлая'
                            }}
                        </span>
                    </button>
                    <template v-if="user">
                        <button
                            @click="toggleProfileMenu"
                            ref="profileButtonRef"
                            class="profile-button"
                        >
                            <img
                                src="../assets/user.png"
                                class="user-img"
                                alt="Профиль"
                            />
                        </button>

                        <!-- Выносим меню профиля на верхний уровень, вне navbar -->
                    </template>
                </div>
            </div>
        </div>
    </nav>

    <!-- Меню профиля вынесено на верхний уровень DOM -->
    <div
        v-if="isShowProfileMenu"
        class="profile-menu-overlay"
        ref="profileMenuRef"
    >
        <div class="user__content">
            <span class="user-email">{{ user?.email }}</span>
            <button @click="handleLogout" class="btn btn-logout">Выйти</button>
        </div>
    </div>
</template>

<style scoped>
/* Ваши существующие стили остаются без изменений */
img {
    filter: invert(0);
    transition: filter var(--transition-duration) ease;
}

[data-theme='dark'] img {
    filter: invert(1);
}

[data-theme='dark'] .navbar {
    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.1);
}

.navbar {
    backdrop-filter: blur(10px);
    padding: 15px 0px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 100;
}

.navbar__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.brand-link {
    text-decoration: none;
    color: inherit;
}

.brand-link h1 {
    color: #333;
    font-size: 1.5rem;
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 15px;
    position: relative;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    gap: 20px;
}

.header__time {
    font-weight: 400;
    font-size: 32px;
    color: var(--color-text-primary);
}

.header__time span {
    font-weight: 300;
    font-size: 20px;
    color: var(--color-text-secondary);
}

.theme-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 14px;
    font-weight: 500;
    flex-shrink: 0;
}

.theme-toggle:hover {
    background-color: var(--color-hover);
    border-color: var(--color-purple);
    transform: translateY(-2px);
}

.theme-toggle:active {
    transform: translateY(0);
}

.theme-toggle__icon {
    transition: transform 0.3s ease;
}

.theme-toggle:hover .theme-toggle__icon {
    transform: rotate(180deg);
}

.theme-toggle__text {
    color: var(--color-text-primary);
    font-weight: 500;
}

.user-email {
    color: var(--color-text-primary);
    font-size: 16px;
}

.nav-link {
    text-decoration: none;
    color: #333;
    padding: 8px 16px;
    border-radius: 6px;
    transition: background-color 0.3s ease;
}

.nav-link:hover {
    background: #f5f5f5;
}

.user-img {
    width: 30px;
    height: 30px;
}

.profile-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
}

.profile-button:hover {
    background-color: var(--color-hover);
}

.btn-logout {
    background-color: rgb(204, 28, 28);
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 5px;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-logout:hover {
    background-color: rgb(180, 20, 20);
}

/* Стили для вынесенного меню профиля */
.profile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    pointer-events: none;
}

.user__content {
    position: absolute;
    background-color: var(--color-white);
    padding: 20px;
    right: 20px;
    top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 20px;
    border-radius: 8px;
    border: 1px solid var(--color-border);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    pointer-events: auto;
    min-width: 200px;
}

.auth__content {
    display: flex;
    column-gap: 20px;
}

.auth__link {
    color: var(--color-text-primary);
}

@media (max-width: 768px) {
    .nav-container {
        flex-direction: column;
        gap: 15px;
    }

    .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .theme-toggle {
        align-self: flex-start;
    }

    .user__content {
        right: 15px;
        top: 70px;
    }
}

@media (max-width: 475px) {
    .theme-toggle {
        justify-content: center;
    }

    .home {
        padding: 0 15px;
    }

    .header {
        margin-top: 15px;
    }

    .header__time {
        font-size: 22px;
    }

    .header__time span {
        font-size: 16px;
    }

    .theme-toggle {
        padding: 10px 14px;
        font-size: 13px;
    }

    .user-img {
        width: 25px;
        height: 25px;
    }

    .user__content {
        right: 10px;
        top: 65px;
        min-width: 180px;
        padding: 15px;
    }
}
</style>
