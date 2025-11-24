<script setup lang="ts">
import Progress from '@/components/Progress.vue'
import Search from '@/components/Search.vue'
import Tags from '@/components/Tags.vue'
import TaskModal from '@/components/TaskModal.vue'
import TasksTable from '@/components/TasksTable.vue'
import { useTaskStore } from '@/store/task'

const taskStore = useTaskStore()
</script>

<template>
    <section class="home">
        <div class="header"></div>

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
