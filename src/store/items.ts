import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSearchStore } from './search'
import { authService } from '@/services/auth'
import { todoService } from '@/services/todos'
import type { User } from 'firebase/auth'
import type { Unsubscribe } from 'firebase/firestore'
import { TableItem } from '@/types'

export const useItemsStore = defineStore('items', () => {
    const newTaskTitle = ref('')
    const newTaskTags = ref('')
    const allItems = ref<TableItem[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const unsubscribe = ref<Unsubscribe | null>(null)
    const initialized = ref(false)

    // Получаем текущего пользователя
    const getCurrentUser = (): User => {
        const user = authService.getCurrentUser()
        if (!user) {
            throw new Error(
                'Пользователь не авторизован. Пожалуйста, войдите снова.'
            )
        }
        return user
    }

    // Инициализация хранилища
    const initialize = async (): Promise<void> => {
        try {
            const user = getCurrentUser()

            loading.value = true
            error.value = null
            initialized.value = false

            // Подписываемся на изменения задач пользователя
            unsubscribe.value = todoService.subscribeToTodos(
                user.uid,
                (items: TableItem[]) => {
                    allItems.value = items
                    loading.value = false
                    initialized.value = true
                    error.value = null
                }
            )
        } catch (err) {
            console.error('❌ Error initializing items store:', err)
            error.value =
                err instanceof Error
                    ? err.message
                    : 'Ошибка инициализации хранилища'
            loading.value = false
            initialized.value = false
            throw err
        }
    }

    // Очистка подписки
    const cleanup = (): void => {
        if (unsubscribe.value) {
            unsubscribe.value()
            unsubscribe.value = null
        }
        allItems.value = []
        initialized.value = false
        loading.value = false
    }

    // Getters
    const items = computed(() => {
        const searchStore = useSearchStore()
        let result = allItems.value

        // Фильтрация по поиску (название)
        if (searchStore.searchValue) {
            const searchTerm = searchStore.searchValue.toLowerCase().trim()
            result = result.filter((item) =>
                item.title.toLowerCase().includes(searchTerm)
            )
        }

        // Фильтрация по статусу
        if (searchStore.statusValue) {
            result = result.filter(
                (item) => item.status === searchStore.statusValue
            )
        }

        // Фильтрация по тегу
        if (searchStore.tagValue) {
            const tagTerm = searchStore.tagValue.toLowerCase().trim()
            result = result.filter((item) =>
                item.tags.toLowerCase().includes(tagTerm)
            )
        }

        return result
    })

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

    // Actions для задач
    const deleteItem = async (id: number): Promise<void> => {
        try {
            const user = getCurrentUser()

            const firebaseId = id.toString()

            await todoService.deleteTodo(firebaseId)
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Ошибка удаления задачи'
            console.error('❌ Store: Delete error:', err)
            error.value = message
            throw new Error(message)
        }
    }

    const updateItem = async (
        id: number,
        updates: Partial<TableItem>
    ): Promise<void> => {
        try {
            const user = getCurrentUser()

            const firebaseId = id.toString()
            await todoService.updateTodo(firebaseId, updates)
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Ошибка обновления задачи'
            console.error('❌ Error updating item:', err)
            error.value = message
            throw new Error(message)
        }
    }

    const toggleStatus = async (id: number): Promise<void> => {
        try {
            const item = allItems.value.find((item) => item.id === id)
            if (item) {
                const newStatus =
                    item.status === 'выполненные'
                        ? 'не выполненные'
                        : 'выполненные'
                await updateItem(id, { status: newStatus })
            }
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Ошибка изменения статуса'
            console.error('❌ Error toggling status:', err)
            error.value = message
            throw new Error(message)
        }
    }

    const addItem = async (): Promise<void> => {
        try {
            if (!newTaskTitle.value.trim()) {
                throw new Error('Заголовок задачи не может быть пустым')
            }

            const user = getCurrentUser()

            loading.value = true

            await todoService.addTodo(
                newTaskTitle.value.trim(),
                newTaskTags.value.trim(),
                user.uid
            )

            // Очищаем поля после успешного добавления
            newTaskTitle.value = ''
            newTaskTags.value = ''

            loading.value = false
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Ошибка добавления задачи'
            console.error('❌ Error adding item:', err)
            error.value = message
            throw new Error(message)
        }
    }

    const clearNewTaskFields = (): void => {
        newTaskTitle.value = ''
        newTaskTags.value = ''
    }

    // Проверка авторизации
    const checkAuth = (): boolean => {
        try {
            getCurrentUser()
            return true
        } catch {
            return false
        }
    }

    // Сброс ошибки
    const clearError = (): void => {
        error.value = null
    }

    return {
        // State
        newTaskTitle,
        newTaskTags,
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        initialized: computed(() => initialized.value),

        // State (readonly через computed)
        items,
        allItems: computed(() => allItems.value),

        // Getters
        stats,

        // Инициализация и очистка
        initialize,
        cleanup,
        checkAuth,

        // Actions для задач
        deleteItem,
        updateItem,
        toggleStatus,
        addItem,
        clearNewTaskFields,

        // Дополнительные actions
        clearError,
    }
})
