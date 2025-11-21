<script setup lang="ts">
import { useItemsStore } from '@/store/items'
import { useTaskStore } from '@/store/task'
import type { TableItem } from '@/types/table'

const taskStore = useTaskStore()
const itemsStore = useItemsStore()

const handleDelete = (task: TableItem) => {
    taskStore.closeModal()
    itemsStore.deleteItem(task.id)
}
</script>

<template>
    <div
        v-if="taskStore.showModal"
        class="back"
        @click="taskStore.closeModal"
    ></div>

    <div class="modal" v-if="taskStore.showModal && taskStore.task">
        <div class="modal__content">
            <div class="top">
                <button class="close" @click="taskStore.closeModal">
                    <img
                        src="../assets/close.png"
                        alt="закрыть"
                        class="close__img"
                    />
                </button>
                <h2 class="modal__title">{{ taskStore.task.title }}</h2>
                <div class="modal__text">
                    <div class="text__item">
                        <span>Статус: </span>
                        <label class="status-checkbox">
                            <input
                                type="checkbox"
                                :checked="
                                    taskStore.task.status === 'выполненные'
                                "
                                @change="taskStore.toggleStatus"
                                class="status-checkbox__input"
                            />
                            <span class="status-checkbox__checkmark"></span>
                            <span class="status-checkbox__text">
                                {{
                                    taskStore.task.status === 'выполненные'
                                        ? 'Выполнено'
                                        : 'Не выполнено'
                                }}
                            </span>
                        </label>
                    </div>
                    <div class="text__item">
                        <span>Теги:</span>
                        <div class="content-1" v-if="taskStore.isChanged">
                            <input
                                type="text"
                                v-model="taskStore.newTags"
                                @keyup.enter="taskStore.confirmTags"
                                placeholder="Введите теги"
                            />
                            <button
                                @click="taskStore.confirmTags"
                                class="confirm-button"
                            >
                                <img
                                    src="../assets/check.png"
                                    alt="подтвердить"
                                />
                            </button>
                        </div>
                        <div class="content-2" v-else>
                            <span class="tags-text">
                                {{ taskStore.task.tags || 'Нет тегов' }}
                            </span>
                            <button
                                @click="taskStore.changeTags"
                                class="edit-button"
                            >
                                <img src="../assets/pen.png" alt="изменить" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button class="delete" @click="handleDelete(taskStore.task)">
                Удалить
            </button>
        </div>
    </div>
</template>

<style scoped>
.back {
    background-color: black;
    top: 0;
    left: 0;
    opacity: 0.4;
    z-index: 3;
    position: fixed;
    width: 100%;
    height: 110vh;
}

.modal {
    backdrop-filter: blur(20px);
    background-color: var(--color-text-primary-modal);
    border: 1px solid var(--color-purple);
    position: fixed;
    z-index: 5;
    width: 500px;
    height: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal__content {
    padding: 30px 50px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.close {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 10px;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.close:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.close__img,
img {
    width: 20px;
    height: 20px;
    /* Фильтр для светлой темы - темные иконки */
    filter: invert(0);
    transition: filter var(--transition-duration) ease;
}

/* Темная тема - светлые иконки */
[data-theme='dark'] .close__img,
[data-theme='dark'] img {
    filter: invert(1);
}

.modal__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--color-text-primary);
}

.modal__text {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
}

.delete {
    width: 100%;
    background-color: rgb(218, 46, 46);
    color: #fafafa;
    padding: 12px;
    font-size: 18px;
    border: none;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color 0.2s;
}

.delete:hover {
    background-color: rgb(200, 30, 30);
}

.text__item {
    display: flex;
    column-gap: 8px;
    align-items: center;
    color: var(--color-text-primary);
}

.content-1,
.content-2 {
    display: flex;
    align-items: center;
    gap: 8px;
}

.content-1 input {
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    min-width: 150px;
}

.content-1 input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.content-1 button,
.content-2 button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.content-1 button:hover,
.content-2 button:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.tags-text {
    font-style: italic;
}

.confirm-button,
.edit-button {
    display: flex;
    align-items: center;
    justify-content: center;
}

.status-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.status-checkbox:hover {
    background-color: rgba(0, 0, 0, 0.02);
}

.status-checkbox__input {
    display: none;
}

.status-checkbox__checkmark {
    position: relative;
    width: 18px;
    height: 18px;
    border: 2px solid #ddd;
    border-radius: 4px;
    background-color: white;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.status-checkbox:hover .status-checkbox__checkmark {
    border-color: #8764ff;
}

.status-checkbox__input:checked + .status-checkbox__checkmark {
    background: linear-gradient(135deg, #28a745, #20c997);
    border-color: #28a745;
}

.status-checkbox__input:checked + .status-checkbox__checkmark::after {
    content: '';
    position: absolute;
    left: 4px;
    top: 1px;
    width: 5px;
    height: 9px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.status-checkbox__text {
    font-size: 16px;
    color: var(--color-text-primary);
    user-select: none;
}

@media (max-width: 768px) {
    .modal {
        width: 350px;
        height: 400px;
    }

    .modal__content {
        padding: 20px 30px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    .close {
        position: absolute;
        right: 10px;
        top: 10px;
        padding: 10px;
        background: none;
        border: none;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s;
    }

    .close:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    img {
        width: 20px;
        height: 20px;
    }

    .modal__title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .modal__text {
        row-gap: 10px;
    }

    .delete {
        padding: 10px;
        font-size: 16px;
    }

    .text__item {
        column-gap: 5px;
    }

    .content-1,
    .content-2 {
        gap: 5px;
    }

    .content-1 input {
        padding: 6px 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        min-width: 150px;
    }
}

@media (max-width: 425px) {
    .modal {
        width: 320px;
        height: 350px;
    }

    .modal__content {
        padding: 15px 20px;
    }

    .modal__title {
        font-size: 22px;
        margin-bottom: 20px;
    }

    .modal__text {
        row-gap: 10px;
    }

    .delete {
        padding: 10px;
        font-size: 16px;
    }

    .text__item {
        column-gap: 5px;
    }

    .content-1,
    .content-2 {
        gap: 5px;
    }

    .content-1 input {
        padding: 6px 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        min-width: 150px;
    }
}
</style>
