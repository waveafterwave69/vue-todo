import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
    const theme = ref<Theme>('light')

    // Инициализация темы из localStorage или системных настроек
    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme') as Theme
        if (savedTheme) {
            theme.value = savedTheme
        } else {
            // Определяем системную тему
            const systemPrefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches
            theme.value = systemPrefersDark ? 'dark' : 'light'
        }
        applyTheme(theme.value)
    }

    // Переключение темы
    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    // Установка конкретной темы
    const setTheme = (newTheme: Theme) => {
        theme.value = newTheme
    }

    // Применение темы к документу
    const applyTheme = (theme: Theme) => {
        const root = document.documentElement
        root.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }

    // Следим за изменениями системной темы
    const setupSystemThemeListener = () => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                theme.value = e.matches ? 'dark' : 'light'
            }
        }

        mediaQuery.addEventListener('change', handleSystemThemeChange)
        return () =>
            mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }

    // Автоматически применяем тему при изменении
    watch(theme, (newTheme) => {
        applyTheme(newTheme)
    })

    return {
        theme,
        initializeTheme,
        toggleTheme,
        setTheme,
        setupSystemThemeListener,
    }
})
