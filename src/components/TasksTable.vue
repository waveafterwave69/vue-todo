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
    <div class="create">
        <input
            v-model="itemsStore.newTaskTitle"
            type="text"
            class="create__input"
            placeholder="Заголовок задачи"
        />
        <input
            v-model="itemsStore.newTaskTags"
            type="text"
            class="create__input"
            placeholder="Теги задачи(через запятую)"
        />
        <button class="create__button" @click="itemsStore.addItem">
            Создать
        </button>
    </div>
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
.create {
    display: flex;
    justify-content: space-between;
    column-gap: 10px;
    margin-top: 20px;
}

.create__input {
    border: 1px solid var(--color-purple);
    background-color: var(--color-white);
    width: 100%;
    font-size: 18px;
    border-radius: 5px;
    padding: 0px 15px;
}

.create__button {
    background-color: var(--color-purple);
    padding: 15px 35px;
    font-size: 18px;
    color: var(--color-white);
    border-radius: 5px;
}

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

@media (max-width: 768px) {
    .create {
        margin-top: 15px;
        flex-wrap: wrap;
        row-gap: 8px;
    }

    .create__input {
        font-size: 16px;
        border-radius: 5px;
        padding: 10px 10px;
    }

    .create__button {
        padding: 10px 25px;
        font-size: 16px;
        width: 100%;
    }
}

@media (max-width: 425px) {
    .create {
        margin-top: 15px;
        flex-wrap: wrap;
        row-gap: 8px;
    }

    .create__input {
        font-size: 14px;
        border-radius: 5px;
        padding: 10px 10px;
    }

    .create__button {
        padding: 10px 25px;
        font-size: 16px;
        width: 100%;
    }
}
</style>
