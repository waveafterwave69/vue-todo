import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    updateDoc,
    deleteDoc,
    doc,
    type Unsubscribe,
    serverTimestamp,
    getDoc,
} from 'firebase/firestore'
import { db } from './firebase'
import type { TableItem, TodoFilter } from '@/types'
import { authService } from './auth'

export class TodoService {
    async addTodo(
        title: string,
        tags: string,
        userId: string
    ): Promise<TableItem> {
        try {
            const user = authService.getCurrentUser()
            if (!user) {
                throw new Error('Пользователь не авторизован')
            }

            const todoData = {
                title: title.trim(),
                tags: tags.trim(),
                status: 'не выполненные',
                userId: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            }

            const docRef = await addDoc(collection(db, 'todos'), todoData)

            // Возвращаем созданную задачу с правильным ID
            return {
                id: docRef.id, // Используем настоящий Firebase ID
                title: title.trim(),
                tags: tags.trim(),
                status: 'не выполненные',
            }
        } catch (error) {
            console.error('❌ Error adding todo:', error)
            throw error
        }
    }

    subscribeToTodos(
        userId: string,
        callback: (todos: TableItem[]) => void
    ): Unsubscribe {
        const q = query(collection(db, 'todos'), where('userId', '==', userId))

        return onSnapshot(
            q,
            (snapshot) => {
                const todos = snapshot.docs.map((doc) => {
                    const data = doc.data()
                    const todo: TableItem = {
                        id: doc.id, // ✅ Используем настоящий Firebase ID
                        status:
                            data.status === 'выполненные'
                                ? 'выполненные'
                                : 'не выполненные',
                        title: data.title || 'Без названия',
                        tags: data.tags || '',
                    }
                    return todo
                })

                // Сортируем по дате создания (если есть) или по ID
                const sortedTodos = todos.sort((a, b) => {
                    // Временная сортировка - можно добавить поле createdAt позже
                    return a.title.localeCompare(b.title)
                })

                callback(sortedTodos)
            },
            (error) => {
                console.error('💥 Error in todo subscription:', error)
            }
        )
    }

    async updateTodo(
        todoId: string, // ✅ Используем string ID
        updates: Partial<TableItem>
    ): Promise<void> {
        try {
            const user = authService.getCurrentUser()
            if (!user) {
                throw new Error('Пользователь не авторизован')
            }

            const todoRef = doc(db, 'todos', todoId)

            // Проверяем права доступа
            const docSnap = await getDoc(todoRef)
            if (!docSnap.exists()) {
                throw new Error('Задача не найдена')
            }

            const todoData = docSnap.data()
            if (todoData.userId !== user.uid) {
                throw new Error('Нет прав для редактирования этой задачи')
            }

            await updateDoc(todoRef, {
                ...updates,
                updatedAt: serverTimestamp(),
            })
        } catch (error) {
            console.error('❌ Error updating todo:', error)
            throw new Error(`Не удалось обновить задачу: ${error}`)
        }
    }

    async deleteTodo(todoId: string): Promise<void> {
        try {
            const user = authService.getCurrentUser()
            if (!user) {
                throw new Error('Пользователь не авторизован')
            }

            const todoRef = doc(db, 'todos', todoId)

            // Проверяем существование документа
            const docSnap = await getDoc(todoRef)

            if (!docSnap.exists()) {
                throw new Error('Задача уже удалена')
            }

            const todoData = docSnap.data()

            // Проверяем права доступа
            if (todoData.userId !== user.uid) {
                throw new Error('У вас нет прав для удаления этой задачи')
            }

            // Удаляем документ
            await deleteDoc(todoRef)
        } catch (error: any) {
            console.error('💥 [DELETE] ERROR:', error)

            if (error.code === 'permission-denied') {
                throw new Error('Недостаточно прав для удаления задачи')
            } else if (error.code === 'not-found') {
                throw new Error('Задача не найдена')
            } else {
                throw new Error(`Не удалось удалить задачу: ${error.message}`)
            }
        }
    }

    filterTodos(todos: TableItem[], filter: TodoFilter): TableItem[] {
        switch (filter) {
            case 'active':
                return todos.filter((todo) => todo.status === 'не выполненные')
            case 'completed':
                return todos.filter((todo) => todo.status === 'выполненные')
            default:
                return todos
        }
    }

    getTodosStats(todos: TableItem[]) {
        const total = todos.length
        const completed = todos.filter(
            (todo) => todo.status === 'выполненные'
        ).length
        const active = total - completed

        return { total, completed, active }
    }

    // Убираем generateNumericId - больше не нужен!
}

export const todoService = new TodoService()
