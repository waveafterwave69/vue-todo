import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { TableItem } from '@/types/table'
import { useSearchStore } from './search'

// Ключ для localStorage
const STORAGE_KEY = 'vue-tasks-app'

// Функции для работы с localStorage выносим наружу или объявляем до использования
const loadFromStorage = (): TableItem[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            return JSON.parse(stored)
        }
    } catch (error) {
        console.error('Ошибка при загрузке из localStorage:', error)
    }

    // Если в localStorage ничего нет, возвращаем пустой массив
    return []
}

const saveToStorage = (items: TableItem[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
        console.error('Ошибка при сохранении в localStorage:', error)
    }
}

const isValidTableItem = (item: any): item is TableItem => {
    return (
        typeof item === 'object' &&
        typeof item.id === 'number' &&
        typeof item.title === 'string' &&
        typeof item.tags === 'string' &&
        (item.status === 'выполненные' || item.status === 'не выполненные')
    )
}

export const useItemsStore = defineStore('items', () => {
    const newTaskTitle = ref('')
    const newTaskTags = ref('')

    // Загружаем данные из localStorage при инициализации
    const allItems = ref<TableItem[]>(loadFromStorage())

    // Getters
    const items = computed({
        get: () => {
            const searchStore = useSearchStore()
            let result = allItems.value

            // Фильтрация по поиску (название)
            if (searchStore.searchValue) {
                const searchTerm = searchStore.searchValue.toLowerCase().trim()
                result = result.filter((item) =>
                    item.title.toLowerCase().includes(searchTerm)
                )
            }

            // Фильтрация по статусу
            if (searchStore.statusValue) {
                result = result.filter(
                    (item) => item.status === searchStore.statusValue
                )
            }

            // Фильтрация по тегу
            if (searchStore.tagValue) {
                const tagTerm = searchStore.tagValue.toLowerCase().trim()
                result = result.filter((item) =>
                    item.tags.toLowerCase().includes(tagTerm)
                )
            }

            return result
        },
        set: (value: TableItem[]) => {
            // При изменении items (например, при drag & drop) обновляем allItems
            // Но нужно быть осторожным, так как value - это отфильтрованный массив
            // Вместо этого лучше использовать отдельный action для изменения порядка
            console.warn(
                'Прямое присваивание items не рекомендуется. Используйте reorderItems.'
            )
        },
    })

    const stats = computed(() => {
        const displayedItems = items.value
        const total = displayedItems.length
        const completed = displayedItems.filter(
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

    // Общие статистики по всем задачам (без фильтров)
    const totalStats = computed(() => {
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

    // Автоматически сохраняем в localStorage при изменении данных
    watch(
        allItems,
        (newItems) => {
            saveToStorage(newItems)
        },
        { deep: true }
    )

    // Actions для задач
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

    const addItem = () => {
        if (!newTaskTitle.value.trim()) return
        if (!newTaskTags.value.trim()) return

        const newItem: TableItem = {
            status: 'не выполненные',
            tags: newTaskTags.value.trim(),
            title: newTaskTitle.value.trim(),
            id: generateId(),
        }
        allItems.value.push(newItem)

        // Очищаем поля после добавления
        newTaskTitle.value = ''
        newTaskTags.value = ''
    }

    const clearNewTaskFields = () => {
        newTaskTitle.value = ''
        newTaskTags.value = ''
    }

    // Action для изменения порядка (для drag & drop)
    const reorderItems = (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return

        const itemsCopy = [...allItems.value]
        const [movedItem] = itemsCopy.splice(fromIndex, 1)
        itemsCopy.splice(toIndex, 0, movedItem)
        allItems.value = itemsCopy
    }

    const reorderItemsById = (itemId: number, toIndex: number) => {
        const fromIndex = allItems.value.findIndex((item) => item.id === itemId)
        if (fromIndex !== -1 && fromIndex !== toIndex) {
            reorderItems(fromIndex, toIndex)
        }
    }

    const clearStorage = () => {
        try {
            localStorage.removeItem(STORAGE_KEY)
            allItems.value = []
        } catch (error) {
            console.error('Ошибка при очистке localStorage:', error)
        }
    }

    const exportData = (): string => {
        return JSON.stringify(allItems.value, null, 2)
    }

    const importData = (jsonData: string) => {
        try {
            const data = JSON.parse(jsonData)
            if (Array.isArray(data) && data.every(isValidTableItem)) {
                allItems.value = data
                return true
            }
            return false
        } catch (error) {
            console.error('Ошибка при импорте данных:', error)
            return false
        }
    }

    const generateId = (): number => {
        return Math.max(0, ...allItems.value.map((i) => i.id), 0) + 1
    }

    return {
        // State
        newTaskTitle,
        newTaskTags,

        // State (readonly через computed)
        items,
        allItems: computed(() => allItems.value),

        // Getters
        stats,
        totalStats,

        // Actions для задач
        deleteItem,
        updateItem,
        toggleStatus,
        addItem,
        clearNewTaskFields,
        reorderItems,
        reorderItemsById,

        // LocalStorage actions
        clearStorage,
        exportData,
        importData,
    }
})
