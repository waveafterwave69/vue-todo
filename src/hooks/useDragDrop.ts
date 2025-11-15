import { ref, type Ref } from 'vue'
import type { TableItem } from '@/types/table'

export const useDragDrop = (items: Ref<TableItem[]>) => {
    let draggedItem: TableItem | null = null
    let dragOverItem: TableItem | null = null

    const handleDragStart = (event: DragEvent, item: TableItem) => {
        draggedItem = item
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move'
        }
        setTimeout(() => {
            const target = event.target as HTMLElement
            target.classList.add('dragging')
        }, 0)
    }

    const handleDragOver = (event: DragEvent, item: TableItem) => {
        event.preventDefault()
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move'
        }
        dragOverItem = item
    }

    const handleDragEnter = (event: DragEvent) => {
        const target = event.target as HTMLElement
        target.closest('.table__item')?.classList.add('drag-over')
    }

    const handleDragLeave = (event: DragEvent) => {
        const target = event.target as HTMLElement
        target.closest('.table__item')?.classList.remove('drag-over')
    }

    const handleDrop = (event: DragEvent) => {
        event.preventDefault()
        const target = event.target as HTMLElement
        target.closest('.table__item')?.classList.remove('drag-over')

        if (draggedItem && dragOverItem && draggedItem !== dragOverItem) {
            const draggedIndex = items.value.findIndex(
                (item) => item.id === draggedItem!.id
            )
            const dropIndex = items.value.findIndex(
                (item) => item.id === dragOverItem!.id
            )

            // Перемещаем элемент
            const [movedItem] = items.value.splice(draggedIndex, 1)
            items.value.splice(dropIndex, 0, movedItem)
        }

        draggedItem = null
        dragOverItem = null
    }

    const handleDragEnd = (event: DragEvent) => {
        const target = event.target as HTMLElement
        target.classList.remove('dragging')
        document.querySelectorAll('.table__item').forEach((item) => {
            item.classList.remove('drag-over')
        })
    }

    return {
        handleDragStart,
        handleDragOver,
        handleDragEnter,
        handleDragLeave,
        handleDrop,
        handleDragEnd,
    }
}
