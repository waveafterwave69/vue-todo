<script setup lang="ts">
import Progress from '@/components/Progress.vue'
import Search from '@/components/Search.vue'
import Tags from '@/components/Tags.vue'
import TasksTable from '@/components/TasksTable.vue'
import { useDate } from '@/hooks/useDate'

const { currentMonth, day, hoursAndMinutes } = useDate()
</script>

<template>
    <section class="home">
        <header class="header__time">
            {{ hoursAndMinutes }}, <span>{{ day }} {{ currentMonth }}</span>
        </header>

        <!-- Поиск задач -->
        <Search />
        <!-- Теги -->
        <Tags />
        <!-- Прогресс задач -->
        <Progress />
        <!-- Таблица с задачами -->
        <TasksTable />
    </section>
</template>

<style scoped>
.header__time {
    margin-top: 20px;
    font-weight: 400;
    font-size: 32px;
}

.header__time span {
    font-weight: 300;
    font-size: 20px;
}
</style>
