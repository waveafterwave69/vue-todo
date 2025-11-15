<script setup lang="ts">
import { ref } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { useDragDrop } from '@/hooks/useDragDrop'
import { useTable } from '@/hooks/useTable'

const { filteredItems } = useTable()

const {
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
} = useDragDrop(filteredItems)

const [tbody] = useAutoAnimate()

// Функция для определения мобильного устройства
const isMobile = ref(false)

const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768
}

// Проверяем при загрузке и при изменении размера окна
if (typeof window !== 'undefined') {
    checkMobile()
    window.addEventListener('resize', checkMobile)
}
</script>

<template>
    <!-- Десктопная версия -->
    <table v-if="!isMobile" class="table table--desktop">
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
                v-for="item in filteredItems"
                :key="item.id"
                class="table__item"
                draggable="true"
                @dragstart="handleDragStart($event, item)"
                @dragover="handleDragOver($event, item)"
                @dragenter="handleDragEnter($event)"
                @dragleave="handleDragLeave($event)"
                @drop="handleDrop($event)"
                @dragend="handleDragEnd($event)"
            >
                <td class="status">{{ item.status }}</td>
                <td class="title">{{ item.title }}</td>
                <td class="tags">{{ item.tags }}</td>
                <td class="delete">{{ item.delete }}</td>
            </tr>
        </tbody>
    </table>

    <!-- Мобильная версия -->
    <div v-else class="table-mobile">
        <div
            v-for="item in filteredItems"
            :key="item.id"
            class="table-mobile__item"
            draggable="true"
            @dragstart="handleDragStart($event, item)"
            @dragover="handleDragOver($event, item)"
            @dragenter="handleDragEnter($event)"
            @dragleave="handleDragLeave($event)"
            @drop="handleDrop($event)"
            @dragend="handleDragEnd($event)"
        >
            <div class="table-mobile__header">
                <div class="table-mobile__title">{{ item.title }}</div>
                <div
                    class="table-mobile__status"
                    :class="{ 'status--completed': item.status === 'yes' }"
                >
                    {{ item.status === 'yes' ? '✓' : '○' }}
                </div>
            </div>
            <div class="table-mobile__tags">{{ item.tags }}</div>
            <div class="table-mobile__actions">
                <button class="table-mobile__delete">{{ item.delete }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Общие стили для обеих версий */
.table,
.table-mobile {
    margin-top: 20px;
    width: 100%;
}

/* Десктопная версия */
.table--desktop {
    border-collapse: collapse;
}

.table__header {
    display: flex;
}

.table__header th {
    padding: 15px;
    font-weight: 600;
    text-align: left;
}

.status-column {
    flex: 1;
}
.title-column {
    flex: 2;
}
.tags-column {
    flex: 1.5;
}
.actions-column {
    flex: 0.5;
    display: flex;
    justify-content: flex-end;
}

.table__item {
    background-color: var(--color-white);
    display: flex;
    align-items: center;
    margin: 5px 0;
    border: 1px solid var(--color-purple);
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: grab;
}

.table__item:hover {
    background-color: #f8f9fa;
}

.table__item:active {
    cursor: grabbing;
}

:deep(.table__item.dragging) {
    opacity: 0.5;
    background-color: #e9ecef;
    transform: scale(0.98);
}

:deep(.table__item.drag-over) {
    border: 2px dashed #6f42c1;
    background-color: #f0e6ff;
}

.table__item td {
    padding: 25px;
    display: flex;
    align-items: center;
    min-height: 48px;
    border-bottom: none;
}

.table__item .status {
    flex: 1;
}
.table__item .title {
    flex: 2;
}
.table__item .tags {
    flex: 1.5;
}
.table__item .delete {
    flex: 0.5;
    display: flex;
    justify-content: flex-end;
}

.table tbody {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

/* Мобильная версия */
.table-mobile {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 8px;
}

.table-mobile__item {
    background: white;
    border: 1px solid var(--color-purple);
    border-radius: 12px;
    padding: 16px;
    transition: all 0.2s ease;
    cursor: grab;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.table-mobile__item:hover {
    background-color: #f8f9fa;
}

.table-mobile__item:active {
    cursor: grabbing;
}

:deep(.table-mobile__item.dragging) {
    opacity: 0.5;
    background-color: #e9ecef;
    transform: scale(0.98);
}

:deep(.table-mobile__item.drag-over) {
    border: 2px dashed #6f42c1;
    background-color: #f0e6ff;
}

.table-mobile__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
}

.table-mobile__title {
    flex: 1;
    font-weight: 600;
    font-size: 16px;
    line-height: 1.3;
    margin-right: 12px;
}

.table-mobile__status {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ddd;
    border-radius: 50%;
    font-size: 12px;
    flex-shrink: 0;
}

.table-mobile__status.status--completed {
    background-color: #28a745;
    color: white;
    border-color: #28a745;
}

.table-mobile__tags {
    color: #666;
    font-size: 14px;
    margin-bottom: 3px;
    line-height: 1.4;
}

.table-mobile__actions {
    display: flex;
    justify-content: flex-end;
}

.table-mobile__delete {
    background: none;
    border: 1px solid #dc3545;
    color: #dc3545;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.table-mobile__delete:hover {
    background-color: #dc3545;
    color: white;
}

@media (max-width: 768px) {
    .table--desktop {
        display: none;
    }

    .table-mobile {
        display: flex;
    }
}

@media (max-width: 425px) {
    .table-mobile__item {
        padding: 12px;
    }

    .table-mobile__title {
        font-size: 15px;
    }

    .table-mobile__tags {
        font-size: 13px;
    }

    .table-mobile__delete {
        padding: 5px 10px;
        font-size: 13px;
    }
}
</style>
