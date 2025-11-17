<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import TasksTableDesktop from './TasksTableDesktop.vue'
import TasksTableMobile from './TasksTableMobile.vue'
import { useItemsStore } from '@/store/items'
import { useDragDropStore } from '@/store/dragDrop'

const itemsStore = useItemsStore()
const dragDropStore = useDragDropStore()

const isMobile = ref(false)

const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768
}

const handleToggleStatus = (itemId: number) => {
    itemsStore.toggleStatus(itemId)
}

const handleDelete = (itemId: number) => {
    itemsStore.deleteItem(itemId)
}

// Инициализация и очистка
if (typeof window !== 'undefined') {
    checkMobile()
    window.addEventListener('resize', checkMobile)
}

onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile)
    }
})
</script>

<template>
    <div class="table" v-if="itemsStore.items.length > 0">
        <TasksTableDesktop
            v-if="!isMobile"
            :items="itemsStore.items"
            :on-toggle-status="handleToggleStatus"
            :on-delete="handleDelete"
            :on-drag-start="dragDropStore.handleDragStart"
            :on-drag-over="dragDropStore.handleDragOver"
            :on-drag-enter="dragDropStore.handleDragEnter"
            :on-drag-leave="dragDropStore.handleDragLeave"
            :on-drop="dragDropStore.handleDrop"
            :on-drag-end="dragDropStore.handleDragEnd"
            :drag-over-index="dragDropStore.dragOverIndex"
        />
        <TasksTableMobile
            v-else
            :items="itemsStore.items"
            :on-toggle-status="handleToggleStatus"
            :on-delete="handleDelete"
            :on-drag-start="dragDropStore.handleDragStart"
            :on-drag-over="dragDropStore.handleDragOver"
            :on-drag-enter="dragDropStore.handleDragEnter"
            :on-drag-leave="dragDropStore.handleDragLeave"
            :on-drop="dragDropStore.handleDrop"
            :on-drag-end="dragDropStore.handleDragEnd"
            :drag-over-index="dragDropStore.dragOverIndex"
        />
    </div>
    <div v-else class="empty-state">Нет задач для отображения</div>
</template>

<style scoped>
.table {
    margin-bottom: 30px;
    overflow: hidden;
}

.empty-state {
    text-align: center;
    padding: 40px;
    color: #666;
    font-size: 18px;
}
</style>
