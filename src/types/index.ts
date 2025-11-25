export interface TableItem {
    id: any
    status: 'выполненные' | 'не выполненные'
    title: string
    tags: string
}

export type TodoFilter = 'all' | 'active' | 'completed'

export interface AuthUser {
    uid: string
    email: string | null
    displayName: string | null
}

export interface RegisterData {
    username: string
    email: string
    password: string
}

export interface LoginData {
    email: string
    password: string
}

export interface AuthResponse {
    success: boolean
    user?: any
    error?: string
}

export interface UserProfile {
    username: string
    email: string
    createdAt: Date
    todosCount: number
}

export interface TableHandlers {
    onToggleStatus: (itemId: number) => void
    onDelete: (itemId: number) => void
    onDragStart: (event: DragEvent, item: TableItem) => void
    onDragOver: (event: DragEvent) => void
    onDragEnter: (event: DragEvent, index: number) => void
    onDragLeave: (event: DragEvent) => void
    onDrop: (event: DragEvent, index: number) => void
    onDragEnd: (event: DragEvent) => void
}

export interface TableProps {
    items: TableItem[]
    onToggleStatus: (itemId: number) => void
    onDelete: (itemId: number) => void
    onDragStart: (event: DragEvent, item: TableItem) => void
    onDragOver: (event: DragEvent) => void
    onDragEnter: (event: DragEvent, index: number) => void
    onDragLeave: (event: DragEvent) => void
    onDrop: (event: DragEvent, index: number) => void
    onDragEnd: (event: DragEvent) => void
    dragOverIndex: number | null
}
