<script setup lang="ts">
import SelectUI from '@/UI/SelectUI.vue'
import { ref } from 'vue'

const statusFilter = ref('')
const categoryFilter = ref('')

// Опции для селектов - убираем disabled у placeholder
const statusOptions = [
    { value: 'done', label: 'Выполненные' },
    { value: 'progress', label: 'Не выполненные' },
]

const categoryOptions = [
    { value: 'work', label: 'Работа' },
    { value: 'personal', label: 'Личные' },
    { value: 'shopping', label: 'Покупки' },
]
</script>

<template>
    <div class="search">
        <div class="search__content">
            <input
                type="text"
                class="search__input"
                placeholder="Поиск задач..."
            />
            <img src="../assets/search.svg" alt="Поиск" />
        </div>
        <div class="option__content">
            <SelectUI
                v-model="statusFilter"
                :options="statusOptions"
                placeholder="Статус"
            />
            <SelectUI
                v-model="categoryFilter"
                :options="categoryOptions"
                placeholder="Категория"
            />
        </div>
    </div>
</template>

<style scoped>
.search {
    margin-top: 20px;
    display: flex;
    align-items: center;
    column-gap: 15px;
}

.search__content {
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    border: 1.5px solid #e1e5e9;
    border-radius: 15px;
    align-items: center;
    font-size: 16px;
    width: 300px;
}

.search__content img {
    width: 17px;
}

.option__content {
    display: flex;
    align-items: center;
    column-gap: 15px;
}

@media (max-width: 768px) {
    .search {
        flex-direction: column;
        align-items: flex-start;
        row-gap: 10px;
    }

    .search__content {
        padding: 12px 16px;
        font-size: 16px;
        width: 100%;
    }

    .option__content {
        display: flex;
        align-items: center;
        column-gap: 10px;
    }
}

@media (max-width: 425px) {
    .search__content {
        padding: 12px 16px;
        font-size: 14px;
        width: 100%;
    }

    .option__content {
        width: 100%;
    }

    .search__content img {
        width: 15px;
    }
}
</style>
