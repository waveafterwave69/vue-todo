<script setup lang="ts">
import { useSearch } from '@/hooks/useSearch'
import { useTable } from '@/hooks/useTable'
import SelectUI from '@/UI/SelectUI.vue'
import { computed } from 'vue'

const { searchValue, statusValue, tagValue, deleteSearchValue } = useSearch()
const { items } = useTable()

const statusOptions = [
    { value: 'выполненные', label: 'Выполненные' },
    { value: 'не выполненные', label: 'Не выполненные' },
]

// Функция для разбивки и очистки тегов
const parseTags = (tagsString: string): string[] => {
    return tagsString
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
}

// Получение уникальных тегов
const categoryOptions = computed(() => {
    const allTags = items.value.flatMap((item) => parseTags(item.tags))

    const uniqueTags = [...new Set(allTags)]

    return uniqueTags.map((tag) => ({
        label: tag,
        value: tag,
    }))
})
</script>

<template>
    <div class="search">
        <div class="search__content">
            <input
                v-model="searchValue"
                type="text"
                class="search__input"
                placeholder="Поиск задач..."
            />
            <button
                v-if="searchValue"
                class="clear-button"
                @click="deleteSearchValue"
                type="button"
                aria-label="Очистить выбор"
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                        d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>

            <img src="../assets/search.svg" alt="Поиск" />
        </div>
        <div class="option__content">
            <SelectUI
                v-model="statusValue"
                :options="statusOptions"
                placeholder="Статус"
            />
            <SelectUI
                v-model="tagValue"
                :options="categoryOptions"
                placeholder="Теги"
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
    padding: 15px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1.5px solid var(--color-purple);
    border-radius: 15px;
    background-color: var(--color-white);
    font-size: 16px;
    width: 300px;
}

.search__content img {
    width: 17px;
}

.search__input {
    padding-right: 20px;
    width: 100%;
}

.clear-button {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    color: #6b7280;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s ease;
    padding: 0;
    z-index: 2;
}

.clear-button:hover {
    color: #ef4444;
    opacity: 1;
    background-color: #fef2f2;
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
        flex-wrap: wrap;
        row-gap: 8px;
    }

    .search__content img {
        width: 15px;
    }
}
</style>
