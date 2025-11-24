<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import TasksTableDesktop from './TasksTableDesktop.vue'
import TasksTableMobile from './TasksTableMobile.vue'
import { useItemsStore } from '@/store/items'
import { useDragDropStore } from '@/store/dragDrop'
import type { TodoFilter } from '@/types/index'

const router = useRouter()
const itemsStore = useItemsStore()
const dragDropStore = useDragDropStore()

const isMobile = ref<boolean>(false)
const currentFilter = ref<TodoFilter>('all')
const localError = ref<string | null>(null)
const initializationError = ref<string | null>(null)

// Вычисляемые свойства
const filteredItems = computed(() => {
    const allItems = itemsStore.items
    switch (currentFilter.value) {
        case 'active':
            return allItems.filter((item) => item.status === 'не выполненные')
        case 'completed':
            return allItems.filter((item) => item.status === 'выполненные')
        default:
            return allItems
    }
})

// Методы
const checkMobile = (): void => {
    isMobile.value = window.innerWidth <= 768
}

const handleToggleStatus = async (itemId: number): Promise<void> => {
    try {
        localError.value = null
        await itemsStore.toggleStatus(itemId)
    } catch (error) {
        localError.value =
            error instanceof Error ? error.message : 'Ошибка изменения статуса'
        console.error('Ошибка при изменении статуса:', error)
    }
}

const handleDelete = async (itemId: number): Promise<void> => {
    try {
        localError.value = null
        await itemsStore.deleteItem(itemId)
    } catch (error: any) {
        console.error('❌ Component: Delete error:', error)
        localError.value =
            error instanceof Error ? error.message : 'Ошибка удаления'
    }
}

// В методе handleAddItem добавьте больше логирования:
const handleAddItem = async (): Promise<void> => {
    try {
        localError.value = null
        await itemsStore.addItem()
    } catch (error) {
        console.error('❌ Error adding item in component:', error)
        localError.value =
            error instanceof Error ? error.message : 'Ошибка добавления'
    }
}

// Хуки жизненного цикла
onMounted(async () => {
    try {
        // Проверяем авторизацию перед инициализацией
        if (!itemsStore.checkAuth()) {
            router.push('/auth')
            return
        }

        await itemsStore.initialize()

        // Настройка адаптивности
        if (typeof window !== 'undefined') {
            checkMobile()
            window.addEventListener('resize', checkMobile)
        }
    } catch (error) {
        console.error('Ошибка инициализации:', error)
        initializationError.value =
            error instanceof Error ? error.message : 'Ошибка инициализации'
        // Не перенаправляем сразу, показываем ошибку
    }
})

onUnmounted(() => {
    itemsStore.cleanup()

    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile)
    }
})
</script>

<template>
    <div class="todo-list">
        <!-- Заголовок и ошибки -->

        <!-- Форма создания задачи -->
        <div class="create" v-if="!initializationError">
            <input
                v-model="itemsStore.newTaskTitle"
                type="text"
                class="create__input"
                placeholder="Заголовок задачи"
                @keypress.enter="handleAddItem"
                :disabled="itemsStore.loading"
            />
            <input
                v-model="itemsStore.newTaskTags"
                type="text"
                class="create__input"
                placeholder="Теги задачи (через запятую)"
                @keypress.enter="handleAddItem"
                :disabled="itemsStore.loading"
            />
            <button
                class="create__button"
                @click="handleAddItem"
                :disabled="
                    !itemsStore.newTaskTitle.trim() || itemsStore.loading
                "
            >
                {{ itemsStore.loading ? 'Создание...' : 'Создать' }}
            </button>
        </div>

        <!-- Состояние загрузки -->
        <div v-if="itemsStore.loading && !initializationError" class="loading">
            Загрузка задач...
        </div>

        <!-- Таблица задач -->
        <div
            v-else-if="!initializationError && filteredItems.length > 0"
            class="table"
        >
            <TasksTableDesktop
                v-if="!isMobile"
                :items="filteredItems"
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
                :items="filteredItems"
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

        <!-- Пустое состояние -->
        <div
            v-else-if="!initializationError && !itemsStore.loading"
            class="empty-state"
        >
            <template v-if="currentFilter === 'active'">
                Нет активных задач
            </template>
            <template v-else-if="currentFilter === 'completed'">
                Нет выполненных задач
            </template>
            <template v-else>
                Нет задач для отображения. Создайте первую задачу!
            </template>
        </div>
    </div>
</template>

<style scoped>
.error-message {
    background: #f8d7da;
    color: #721c24;
    padding: 10px 15px;
    border-radius: 5px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.clear-error-btn {
    background: none;
    border: none;
    color: #721c24;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
}

.auth-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
}

.loading-indicator {
    color: #666;
    font-style: italic;
}

.loading {
    text-align: center;
    padding: 40px;
    color: #666;
    font-size: 16px;
}

.empty-state {
    text-align: center;
    padding: 60px 40px;
    color: #666;
    font-size: 18px;
    background: #f8f9fa;
    border-radius: 10px;
    margin-bottom: 20px;
}

.todo-list {
    margin-top: 20px;
}

.todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #eee;
}

.todo-header h2 {
    color: #333;
    margin: 0;
}

.user-info {
    color: #666;
    font-size: 0.9rem;
}

.create {
    display: flex;
    justify-content: space-between;
    column-gap: 10px;
    flex-wrap: wrap;
}

.create__input {
    border: 1px solid var(--color-purple, #667eea);
    background-color: var(--color-white, #ffffff);
    width: 100%;
    font-size: 16px;
    border-radius: 5px;
    padding: 12px 15px;
    flex: 1;
    min-width: 200px;
}

.create__input:focus {
    outline: none;
    border-color: #4caf50;
}

.create__button {
    background-color: var(--color-purple, #667eea);
    padding: 12px 35px;
    font-size: 16px;
    color: #ffffff;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    white-space: nowrap;
}

.create__button:hover:not(:disabled) {
    background-color: #5a6fd8;
}

.create__button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.table {
    margin-bottom: 30px;
    overflow: hidden;
}

.loading {
    text-align: center;
    padding: 40px;
    color: #666;
    font-size: 16px;
}

.empty-state {
    text-align: center;
    padding: 60px 40px;
    color: #666;
    font-size: 18px;
    background: #f8f9fa;
    border-radius: 10px;
    margin-bottom: 20px;
}

.todo-stats {
    text-align: center;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-top: 20px;
}

.stats-text {
    color: #666;
    font-size: 14px;
    font-weight: 500;
}

@media (max-width: 768px) {
    .todo-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }

    .create {
        margin-top: 15px;
        flex-wrap: wrap;
        row-gap: 8px;
    }

    .create__input {
        font-size: 14px;
        padding: 10px 12px;
        min-width: 100%;
    }

    .create__button {
        padding: 10px 25px;
        font-size: 14px;
        width: 100%;
    }

    .filter-btn {
        padding: 6px 12px;
        font-size: 14px;
    }
}

@media (max-width: 425px) {
    .create {
        margin-top: 10px;
        row-gap: 6px;
    }

    .create__input {
        font-size: 14px;
        padding: 8px 10px;
    }

    .create__button {
        padding: 8px 20px;
        font-size: 14px;
    }

    .empty-state {
        padding: 40px 20px;
        font-size: 16px;
    }
}
</style>
