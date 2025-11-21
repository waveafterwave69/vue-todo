<script setup lang="ts">
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import type { TableItem } from '@/types/table'
import { useTaskStore } from '@/store/task'

interface Props {
    items: TableItem[]
    onToggleStatus: (id: number) => void
    onDelete: (id: number) => void
    onDragStart: (event: DragEvent, item: TableItem) => void
    onDragOver: (event: DragEvent) => void
    onDragEnter: (event: DragEvent, index: number) => void
    onDragLeave: (event: DragEvent) => void
    onDrop: (event: DragEvent, index: number) => void
    onDragEnd: (event: DragEvent) => void
}

defineProps<Props>()

const taskStore = useTaskStore()

const handleRowClick = (item: TableItem, event: MouseEvent) => {
    if (
        (event.target as HTMLElement).closest(
            '.status-checkbox, .delete-button'
        )
    ) {
        return
    }
    taskStore.task = item
    taskStore.showModal = true
}

const [tbody] = useAutoAnimate()
</script>

<template>
    <div class="table-container">
        <table class="table table--desktop">
            <thead>
                <tr class="table__header">
                    <th class="status-column">Статус</th>
                    <th class="title-column">Заголовок</th>
                    <th class="tags-column">Теги</th>
                    <th class="actions-column">Действия</th>
                </tr>
            </thead>
            <tbody ref="tbody">
                <tr
                    v-for="(item, index) in items"
                    :key="item.id"
                    class="table__item"
                    :class="{
                        'item--completed': item.status === 'выполненные',
                    }"
                    draggable="true"
                    @dragstart="onDragStart($event, item)"
                    @dragover="onDragOver($event)"
                    @dragenter="onDragEnter($event, index)"
                    @dragleave="onDragLeave($event)"
                    @drop="onDrop($event, index)"
                    @dragend="onDragEnd($event)"
                    @click="handleRowClick(item, $event)"
                >
                    <td class="status">
                        <label class="status-checkbox">
                            <input
                                type="checkbox"
                                :checked="item.status === 'выполненные'"
                                @change="onToggleStatus(item.id)"
                                class="status-checkbox__input"
                            />
                            <span class="status-checkbox__checkmark"></span>
                            <span class="status-checkbox__text">
                                {{
                                    item.status === 'выполненные'
                                        ? 'Выполнено'
                                        : 'Не выполнено'
                                }}
                            </span>
                        </label>
                    </td>
                    <td class="title">
                        <span
                            class="title-text"
                            :class="{
                                'title--completed':
                                    item.status === 'выполненные',
                            }"
                        >
                            {{ item.title }}
                        </span>
                    </td>
                    <td class="tags">
                        <div class="tags-container">
                            <span
                                v-for="tag in item.tags
                                    .split(',')
                                    .map((t) => t.trim())"
                                :key="tag"
                                class="tag"
                                :class="{
                                    'tag--completed':
                                        item.status === 'выполненные',
                                }"
                            >
                                {{ tag }}
                            </span>
                        </div>
                    </td>
                    <td class="actions">
                        <button
                            class="delete-button"
                            @click="onDelete(item.id)"
                            type="button"
                            title="Удалить задачу"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table-container {
    margin-top: 20px;
    width: 100%;
    overflow: hidden;
}

.table--desktop {
    border-collapse: collapse;
    background-color: var(--color-white);
    min-width: 800px;
    width: 100%;
    margin-bottom: 20px;
}

.table__header {
    background-color: var(--color-purple);
    border-radius: 11px 11px 0 0;
    border: 1px solid var(--color-purple);
}

.table__header th {
    padding: 20px 24px;
    font-weight: 600;
    font-size: 16px;
    color: white;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.status-column {
    width: 200px;
}
.title-column {
    width: 40%;
}
.tags-column {
    width: 30%;
}
.actions-column {
    width: 100px;
}

.table__item {
    background-color: var(--color-white);
    border-bottom: 1px solid #f1f3f4;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: grab;
    position: relative;
    border: 1px solid var(--color-purple);
}

.table__item:active {
    cursor: grabbing;
    transform: translateY(0);
}

:deep(.table__item.dragging) {
    opacity: 0.7;
    box-shadow: 0 8px 24px rgba(135, 100, 255, 0.2);
}

:deep(.table__item.drag-over) {
    background-color: rgba(135, 100, 255, 0.05);
}

.table__item td {
    padding: 20px 24px;
    vertical-align: middle;
}

.status-checkbox {
    display: flex;
    align-items: center;
    gap: 11px;
    cursor: pointer;
    padding: 4px 0;
    transition: all 0.2s ease;
}

.status-checkbox:hover .status-checkbox__checkmark {
    border-color: #8764ff;
}

.status-checkbox__input {
    display: none;
}

.status-checkbox__checkmark {
    position: relative;
    width: 20px;
    height: 20px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: white;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
}

.status-checkbox__input:checked + .status-checkbox__checkmark {
    background: linear-gradient(135deg, #28a745, #20c997);
    border-color: #28a745;
}

.status-checkbox__input:checked + .status-checkbox__checkmark:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 1px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 1px 1px 0;
    transform: rotate(45deg);
}

.status-checkbox__text {
    font-size: 16px;
    color: var(--color-text-primary);
    font-weight: 500;
}

.title-text {
    font-size: 18px;
    color: var(--color-text-primary);
    font-weight: 500;
    line-height: 1.4;
}

.title-text.title--completed {
    text-decoration: line-through;
    color: #a0aec0;
    opacity: 0.7;
}

.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    background: linear-gradient(135deg, #ffeaa7, #fab1a0);
    padding: 6px 11px;
    border-radius: 20px;
    font-size: 12px;
    color: #2d3748;
    font-weight: 500;
    transition: all 0.2s ease;
}

.tag:hover {
    transform: translateY(-1px);
}

.tag.tag--completed {
    opacity: 0.6;
    background: linear-gradient(135deg, #dfe6e9, #b2bec3);
}

.delete-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: none;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    color: #718096;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0;
}

.delete-button:hover {
    background-color: #fed7d7;
    border-color: #fc8181;
    color: #e53e3e;
    transform: scale(1.05);
}
</style>
