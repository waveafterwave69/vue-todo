<script setup lang="ts">
import { useItemsStore } from '@/store/items'
import { useSearchStore } from '@/store/search'
import SelectUI from '@/UI/SelectUI.vue'
import { computed } from 'vue'

const searchStore = useSearchStore()
const itemsStore = useItemsStore()

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
    const allTags = itemsStore.items.flatMap((item) => parseTags(item.tags))

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
                v-model="searchStore.searchValue"
                type="text"
                class="search__input"
                placeholder="Поиск задач..."
            />
            <button
                v-if="searchStore.searchValue"
                class="clear-button"
                @click="searchStore.clearSearch"
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

            <img src="../assets/search.svg" alt="Поиск" class="search-icon" />
        </div>
        <div class="option__content">
            <SelectUI
                v-model="searchStore.statusValue"
                :options="statusOptions"
                placeholder="Статус"
            />
            <SelectUI
                v-model="searchStore.tagValue"
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
    position: relative;
}

.search-icon {
    width: 17px;
    height: 17px;
    /* Фильтр для светлой темы - темные иконки */
    filter: invert(0);
    transition: filter var(--transition-duration) ease;
}

/* Темная тема - светлые иконки */
[data-theme='dark'] .search-icon {
    filter: invert(1);
}

.search__input {
    padding-right: 20px;
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: var(--color-text-primary);
}

.search__input::placeholder {
    color: var(--color-text-secondary);
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
    color: var(--color-text-secondary);
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s ease;
    padding: 0;
    z-index: 2;
}

.clear-button:hover {
    color: var(--color-danger);
    opacity: 1;
    background-color: var(--color-danger-hover);
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

    .search-icon {
        width: 15px;
        height: 15px;
    }
}
</style>
