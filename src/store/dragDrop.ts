import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TableItem } from '@/types/table'
import { useItemsStore } from './items'

export const useDragDropStore = defineStore('dragDrop', () => {
    const draggedItem = ref<TableItem | null>(null)
    const dragOverIndex = ref<number | null>(null)

    const handleDragStart = (event: DragEvent, item: TableItem) => {
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('text/plain', item.id.toString())
            draggedItem.value = item
        }
    }

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault()
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move'
        }
    }

    const handleDragEnter = (event: DragEvent, index: number) => {
        event.preventDefault()
        dragOverIndex.value = index
    }

    const handleDragLeave = (event: DragEvent) => {
        event.preventDefault()
        const relatedTarget = event.relatedTarget as HTMLElement
        if (
            !relatedTarget ||
            !relatedTarget.closest('.draggable-item, .mobile-item')
        ) {
            dragOverIndex.value = null
        }
    }

    const handleDrop = (event: DragEvent, index: number) => {
        event.preventDefault()
        const itemId = parseInt(
            event.dataTransfer?.getData('text/plain') || '-1'
        )

        if (itemId !== -1) {
            const itemsStore = useItemsStore()
            const fromIndex = itemsStore.items.findIndex(
                (item) => item.id === itemId
            )

            if (fromIndex !== -1 && fromIndex !== index) {
                // Создаем копию массива и меняем порядок
                const itemsCopy = [...itemsStore.items]
                const [movedItem] = itemsCopy.splice(fromIndex, 1)
                itemsCopy.splice(index, 0, movedItem)

                // Обновляем исходный массив через itemsStore
                itemsStore.items = itemsCopy
            }
        }

        dragOverIndex.value = null
        draggedItem.value = null
    }

    const handleDragEnd = () => {
        dragOverIndex.value = null
        draggedItem.value = null
    }

    return {
        // State
        draggedItem,
        dragOverIndex,

        // Actions
        handleDragStart,
        handleDragOver,
        handleDragEnter,
        handleDragLeave,
        handleDrop,
        handleDragEnd,
    }
})
