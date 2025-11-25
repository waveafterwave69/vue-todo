<script setup lang="ts">
import { useTaskStore } from '@/store/task'
import { TableItem } from '@/types'

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
            '.status-checkbox, .table-mobile__delete'
        )
    ) {
        return
    }
    taskStore.openModal(item)
}
</script>

<template>
    <div class="table-mobile">
        <div
            v-for="(item, index) in items"
            :key="item.id"
            class="table-mobile__item"
            :class="{ 'item--completed': item.status === 'выполненные' }"
            draggable="true"
            @dragstart="onDragStart($event, item)"
            @dragover="onDragOver($event)"
            @dragenter="onDragEnter($event, index)"
            @dragleave="onDragLeave($event)"
            @drop="onDrop($event, index)"
            @dragend="onDragEnd($event)"
            @click="handleRowClick(item, $event)"
        >
            <div class="table-mobile__main">
                <label class="status-checkbox status-checkbox--mobile">
                    <input
                        type="checkbox"
                        :checked="item.status === 'выполненные'"
                        @change="onToggleStatus(item.id)"
                        class="status-checkbox__input"
                    />
                    <span class="status-checkbox__checkmark"></span>
                </label>

                <div class="table-mobile__content">
                    <div class="table-mobile__header">
                        <div
                            class="table-mobile__title"
                            :class="{
                                'title--completed':
                                    item.status === 'выполненные',
                            }"
                        >
                            {{ item.title }}
                        </div>
                    </div>

                    <div class="table-mobile__tags">
                        <div class="tags-container">
                            <span
                                v-for="tag in item.tags
                                    .split(',')
                                    .map((t) => t.trim())"
                                :key="tag"
                                class="tag tag--mobile"
                                :class="{
                                    'tag--completed':
                                        item.status === 'выполненные',
                                }"
                            >
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    class="table-mobile__delete"
                    @click="onDelete(item.id)"
                    title="Удалить задачу"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.table-mobile {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow: hidden;
}

.table-mobile__item {
    background-color: var(--color-white);
    border: 1px solid var(--color-purple);
    border-radius: 16px;
    padding: 20px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: grab;
}

.table-mobile__item:active {
    cursor: grabbing;
    transform: translateY(0);
}

:deep(.table-mobile__item.dragging) {
    opacity: 0.7;
    transform: rotate(2deg);
    box-shadow: 0 8px 24px rgba(135, 100, 255, 0.2);
}

:deep(.table-mobile__item.drag-over) {
    border: 1px dashed #8764ff;
    background-color: rgba(135, 100, 255, 0.05);
}

.table-mobile__main {
    display: flex;
    align-items: flex-start;
    gap: 16px;
}

.table-mobile__content {
    flex: 1;
}

.table-mobile__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 11px;
    gap: 11px;
}

.table-mobile__title {
    flex: 1;
    font-weight: 600;
    font-size: 16px;
    line-height: 1.4;
}

.table-mobile__title.title--completed {
    text-decoration: line-through;
    color: #a0aec0;
    opacity: 0.7;
}

.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag--mobile {
    background: linear-gradient(135deg, #ffeaa7, #fab1a0);
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 11px;
    color: #2d3748;
    font-weight: 500;
    transition: all 0.2s ease;
}

.tag--mobile.tag--completed {
    opacity: 0.6;
    background: linear-gradient(135deg, #dfe6e9, #b2bec3);
}

.table-mobile__delete {
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

.table-mobile__delete:hover {
    background-color: #fed7d7;
    border-color: #fc8181;
    color: #e53e3e;
    transform: scale(1.05);
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

.status-checkbox--mobile .status-checkbox__text {
    display: none;
}

@media (max-width: 425px) {
    .table-mobile__item {
        padding: 16px;
    }

    .table-mobile__main {
        gap: 11px;
    }

    .table-mobile__title {
        font-size: 15px;
    }

    .table-mobile__header {
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;
    }

    .tag--mobile {
        font-size: 10px;
        padding: 4px 8px;
    }
}
</style>
