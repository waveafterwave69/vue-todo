import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TableItem } from '@/types/table'

export const useItemsStore = defineStore('items', () => {
    const allItems = ref<TableItem[]>([
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

    // Getters
    const items = computed({
        get: () => allItems.value,
        set: (value: TableItem[]) => {
            allItems.value = value
        },
    })

    const stats = computed(() => {
        const total = allItems.value.length
        const completed = allItems.value.filter(
            (item) => item.status === 'выполненные'
        ).length
        const pending = total - completed
        const completionRate = total > 0 ? (completed / total) * 100 : 0

        return {
            total,
            completed,
            pending,
            completionRate,
        }
    })

    // Actions
    const deleteItem = (id: number) => {
        allItems.value = allItems.value.filter((item) => item.id !== id)
    }

    const updateItem = (id: number, updates: Partial<TableItem>) => {
        const index = allItems.value.findIndex((item) => item.id === id)
        if (index !== -1) {
            allItems.value[index] = { ...allItems.value[index], ...updates }
        }
    }

    const toggleStatus = (id: number) => {
        const item = allItems.value.find((item) => item.id === id)
        if (item) {
            item.status =
                item.status === 'выполненные' ? 'не выполненные' : 'выполненные'
        }
    }

    const addItem = (item: Omit<TableItem, 'id'>) => {
        const newItem: TableItem = {
            ...item,
            id: Math.max(0, ...allItems.value.map((i) => i.id)) + 1,
        }
        allItems.value.push(newItem)
    }

    return {
        // State (readonly через computed)
        items,
        allItems: computed(() => allItems.value),

        // Getters
        stats,

        // Actions
        deleteItem,
        updateItem,
        toggleStatus,
        addItem,
    }
})
