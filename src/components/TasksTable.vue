<script setup lang="ts">
import { ref } from 'vue'
import { useDragDrop } from '@/hooks/useDragDrop'
import { useTable } from '@/hooks/useTable'
import TasksTableDesktop from './TasksTableDesktop.vue'
import TasksTableMobile from './TasksTableMobile.vue'
import { useTask } from '@/hooks/useTask'

const { items, toggleStatus, deleteItem } = useTable()

const {
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
} = useDragDrop(items)

const isMobile = ref(false)

const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768
}

if (typeof window !== 'undefined') {
    checkMobile()
    window.addEventListener('resize', checkMobile)
}

const handleToggleStatus = (itemId: number) => {
    toggleStatus(itemId)
}

const handleDelete = (itemId: number) => {
    if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
        // deleteItem(itemId)
    }
}
</script>

<template>
    <div class="table">
        <TasksTableDesktop
            v-if="!isMobile"
            :items="items"
            :on-toggle-status="handleToggleStatus"
            :on-delete="handleDelete"
            :on-drag-start="handleDragStart"
            :on-drag-over="handleDragOver"
            :on-drag-enter="handleDragEnter"
            :on-drag-leave="handleDragLeave"
            :on-drop="handleDrop"
            :on-drag-end="handleDragEnd"
        />
        <TasksTableMobile
            v-else
            :items="items"
            :on-toggle-status="handleToggleStatus"
            :on-delete="handleDelete"
            :on-drag-start="handleDragStart"
            :on-drag-over="handleDragOver"
            :on-drag-enter="handleDragEnter"
            :on-drag-leave="handleDragLeave"
            :on-drop="handleDrop"
            :on-drag-end="handleDragEnd"
        />
    </div>
</template>

<style scoped>
.table {
    margin-bottom: 30px;
}
</style>
