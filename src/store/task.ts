import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TableItem } from '@/types/table'
import { useItemsStore } from './items'

export const useTaskStore = defineStore('task', () => {
    // State
    const task = ref<TableItem | null>(null)
    const isChanged = ref(false)
    const newTags = ref('')
    const showModal = ref(false)

    // Actions
    const openModal = (selectedTask: TableItem) => {
        task.value = selectedTask
        newTags.value = selectedTask.tags
        isChanged.value = false
        showModal.value = true
    }

    const closeModal = () => {
        task.value = null
        isChanged.value = false
        newTags.value = ''
        showModal.value = false
    }

    const changeTags = () => {
        isChanged.value = true
    }

    const confirmTags = () => {
        if (task.value && newTags.value.trim()) {
            task.value.tags = newTags.value.trim()
            isChanged.value = false

            // Обновляем задачу в основном store
            const itemsStore = useItemsStore()
            itemsStore.updateItem(task.value.id, { tags: task.value.tags })
        }
    }

    const toggleStatus = () => {
        if (task.value) {
            const newStatus =
                task.value.status === 'выполненные'
                    ? 'не выполненные'
                    : 'выполненные'
            task.value.status = newStatus

            // Обновляем статус в основном store
            const itemsStore = useItemsStore()
            itemsStore.updateItem(task.value.id, { status: newStatus })
        }
    }

    return {
        // State
        task,
        isChanged,
        newTags,
        showModal,

        // Actions
        openModal,
        closeModal,
        changeTags,
        confirmTags,
        toggleStatus,
    }
})
