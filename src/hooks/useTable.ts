import { computed, ref } from 'vue'
import { useSearch } from './useSearch'
import { TableItem } from '@/types/table'

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

export const useTable = () => {
    const { searchValue, statusValue, tagValue } = useSearch()

    // Единственный массив для отображения - фильтруется автоматически
    const items = computed(() => {
        let result = allItems.value

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

        // Фильтрация по тегу
        if (tagValue?.value) {
            const tagTerm = tagValue.value.trim().toLowerCase()
            result = result.filter((item) =>
                item.tags.toLowerCase().includes(tagTerm)
            )
        }

        return result
    })

    // Статистика рассчитывается от отображаемых элементов
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

    // Функции для управления данными работают с allItems
    const addItem = (item: Omit<TableItem, 'id'>) => {
        const newItem: TableItem = {
            ...item,
            id: Math.max(...allItems.value.map((i) => i.id), 0) + 1,
        }
        allItems.value.push(newItem)
    }

    const updateItem = (id: number, updates: Partial<TableItem>) => {
        const index = allItems.value.findIndex((item) => item.id === id)
        if (index !== -1) {
            allItems.value[index] = { ...allItems.value[index], ...updates }
        }
    }

    const deleteItem = (id: number) => {
        allItems.value = allItems.value.filter((item) => item.id !== id)
    }

    const toggleStatus = (id: number) => {
        const index = allItems.value.findIndex((item) => item.id === id)
        if (index !== -1) {
            const oldStatus = allItems.value[index].status
            const newStatus =
                oldStatus === 'выполненные' ? 'не выполненные' : 'выполненные'

            allItems.value = allItems.value.map((item, i) =>
                i === index
                    ? {
                          ...item,
                          status: newStatus,
                      }
                    : item
            )
        }
    }

    return {
        items,
        allItems,
        stats,
        addItem,
        updateItem,
        deleteItem,
        toggleStatus,
    }
}
