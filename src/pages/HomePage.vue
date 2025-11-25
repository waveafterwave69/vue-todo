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
