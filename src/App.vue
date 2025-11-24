<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useThemeStore } from '@/store/theme'
import NavBar from './components/NavBar.vue'

const themeStore = useThemeStore()

onMounted(() => {
    themeStore.initializeTheme()
    themeStore.setupSystemThemeListener()
})
</script>

<template>
    <NavBar />
    <div class="container">
        <RouterView />
    </div>
</template>

<style>
/* Базовые стили приложения */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: background-color var(--transition-duration) ease,
        color var(--transition-duration) ease,
        border-color var(--transition-duration) ease;
}

body {
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-family: var(--font-family);
    line-height: 1.6;
}
</style>
