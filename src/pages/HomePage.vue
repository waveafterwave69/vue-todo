<script setup lang="ts">
import Progress from '@/components/Progress.vue'
import Search from '@/components/Search.vue'
import Tags from '@/components/Tags.vue'
import TaskModal from '@/components/TaskModal.vue'
import TasksTable from '@/components/TasksTable.vue'
import { useDate } from '@/hooks/useDate'
import { useTaskStore } from '@/store/task'
import { useThemeStore } from '@/store/theme'

const { currentMonth, day, hoursAndMinutes } = useDate()
const taskStore = useTaskStore()
const themeStore = useThemeStore()
</script>

<template>
    <section class="home">
        <div class="header">
            <header class="header__time">
                {{ hoursAndMinutes }}, <span>{{ day }} {{ currentMonth }}</span>
            </header>

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
                    {{ themeStore.theme === 'light' ? 'Темная' : 'Светлая' }}
                </span>
            </button>
        </div>

        <!-- Поиск задач -->
        <Search />
        <!-- Теги -->
        <Tags />
        <!-- Прогресс задач -->
        <Progress />
        <!-- Таблица с задачами -->
        <TasksTable />
        <!-- Модалка с инфой о задаче -->
        <TaskModal v-if="taskStore.showModal" />
    </section>
</template>

<style scoped>
.home {
    padding: 0 20px;
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

/* Адаптивность */
@media (max-width: 768px) {
    .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .theme-toggle {
        align-self: flex-start;
    }
}

@media (max-width: 425px) {
    .home {
        padding: 0 15px;
    }

    .header {
        margin-top: 15px;
    }

    .header__time {
        font-size: 28px;
    }

    .header__time span {
        font-size: 18px;
    }

    .theme-toggle {
        padding: 10px 14px;
        font-size: 13px;
    }
}

@media (max-width: 475px) {
    .header__time {
        font-size: 24px;
    }

    .theme-toggle {
        width: 100%;
        justify-content: center;
    }
}
</style>
