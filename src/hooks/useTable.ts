import { TableItem } from '@/types/table'
import { ref, computed, watchEffect } from 'vue'
import { useSearch } from './useSearch'

export const useTable = () => {
    const { searchValue, statusValue, tagValue } = useSearch()

    const items = ref<TableItem[]>([
        {
            id: 1,
            status: 'выполненные',
            title: '1',
            tags: 'ворк, рутина, еда',
            delete: 'удалить',
        },
        {
            id: 2,
            status: 'не выполненные',
            title: '2',
            tags: 'ворк, рутина, еда',
            delete: 'удалить',
        },
        {
            id: 3,
            status: 'выполненные',
            title: '3',
            tags: 'ворк, рутина, еда',
            delete: 'удалить',
        },
        {
            id: 4,
            status: 'не выполненные',
            title: '4',
            tags: 'ворк, рутина',
            delete: 'удалить',
        },
        {
            id: 5,
            status: 'выполненные',
            title: 'Сходить в магазин',
            tags: 'ПХПАХАПХАП',
            delete: 'удалить',
        },
    ])

    // Единый computed для фильтрации
    const filteredItems = computed(() => {
        let result = items.value

        // Фильтрация по поиску
        if (searchValue.value) {
            const searchTerm = searchValue.value.trim().toLowerCase()
            result = result.filter((item) =>
                item.title.toLowerCase().includes(searchTerm)
            )
        }

        // Фильтрация по статусу
        if (statusValue.value) {
            result = result.filter((item) => item.status === statusValue.value)
        }

        // Фильтрация по тегу (если используется)
        if (tagValue?.value) {
            const tagTerm = tagValue.value.trim().toLowerCase()
            result = result.filter((item) =>
                item.tags.toLowerCase().includes(tagTerm)
            )
        }

        return result
    })

    // Функции для управления данными
    const addItem = (item: Omit<TableItem, 'id'>) => {
        const newItem: TableItem = {
            ...item,
            id: Math.max(...items.value.map((i) => i.id), 0) + 1,
        }
        items.value.push(newItem)
    }

    const updateItem = (id: number, updates: Partial<TableItem>) => {
        const index = items.value.findIndex((item) => item.id === id)
        if (index !== -1) {
            items.value[index] = { ...items.value[index], ...updates }
        }
    }

    const deleteItem = (id: number) => {
        const index = items.value.findIndex((item) => item.id === id)
        if (index !== -1) {
            items.value.splice(index, 1)
        }
    }

    const toggleStatus = (id: number) => {
        const item = items.value.find((item) => item.id === id)
        if (item) {
            item.status =
                item.status === 'выполненные' ? 'не выполненные' : 'выполненные'
        }
    }

    // Статистика
    const stats = computed(() => {
        const total = items.value.length
        const completed = items.value.filter(
            (item) => item.status === 'выполненные'
        ).length
        const pending = total - completed

        return {
            total,
            completed,
            pending,
            completionRate: total > 0 ? (completed / total) * 100 : 0,
        }
    })

    return {
        items,
        filteredItems,
        stats,
        addItem,
        updateItem,
        deleteItem,
        toggleStatus,
    }
}
