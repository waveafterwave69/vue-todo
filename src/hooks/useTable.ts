import { TableItem } from '@/types/table'
import { ref, watch } from 'vue'
import { useSearch } from './useSearch'

export const useTable = () => {
    const { searchValue, statusValue, tagValue } = useSearch()

    const items = ref<TableItem[]>([
        {
            id: 1,
            status: 'yes',
            title: '1',
            tags: 'ворк, рутина, еда',
            delete: 'удалить',
        },
        {
            id: 2,
            status: 'yes',
            title: '2',
            tags: 'ворк, рутина, еда',
            delete: 'удалить',
        },
        {
            id: 3,
            status: 'yes',
            title: '3',
            tags: 'ворк, рутина, еда',
            delete: 'удалить',
        },
        {
            id: 4,
            status: 'yes',
            title: '4',
            tags: 'ворк, рутина, еда',
            delete: 'удалить',
        },
        {
            id: 5,
            status: 'yes',
            title: 'Сходить в магазин',
            tags: 'ворк, рутина, еда',
            delete: 'удалить',
        },
    ])

    const filteredItems = ref<TableItem[]>(items.value)

    watch(searchValue, () => {
        if (searchValue) {
            filteredItems.value = items.value.filter((item) => {
                return item.title
                    .trim()
                    .toLowerCase()
                    .includes(searchValue.value.trim().toLowerCase())
            })
        } else {
            filteredItems.value = items.value
        }
    })

    return {
        filteredItems,
    }
}
