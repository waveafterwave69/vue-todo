import { ref, computed } from 'vue'
import type { TableItem } from '@/types/table'

const task = ref<TableItem>()
const isOpen = ref<boolean>(false)
const isChanged = ref<boolean>(false)
const newTags = ref<string>('')

export const useTask = () => {
    const pickTask = (newTask: TableItem) => {
        task.value = newTask
        isOpen.value = true
        isChanged.value = false
        newTags.value = ''
    }

    const closeModal = () => {
        isOpen.value = false
        isChanged.value = false
        newTags.value = ''
    }

    const changeTags = () => {
        isChanged.value = true
        newTags.value = task.value?.tags || ''
    }

    const confirmTags = () => {
        isChanged.value = false

        if (task.value && newTags.value.trim()) {
            task.value.tags = newTags.value.trim()
        }

        newTags.value = ''
    }

    const toggleStatus = () => {
        if (task.value) {
            task.value.status =
                task.value.status === 'выполненные'
                    ? 'не выполненные'
                    : 'выполненные'
        }
    }
    const statusText = computed(() => {
        return task.value?.status === 'выполненные'
            ? 'выполнено'
            : 'не выполнено'
    })

    return {
        isOpen,
        task,
        pickTask,
        closeModal,
        changeTags,
        isChanged,
        confirmTags,
        newTags,
        toggleStatus,
        statusText,
    }
}
