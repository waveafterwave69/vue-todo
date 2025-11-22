<script setup lang="ts">
interface Option {
    value: string
    label: string
}

interface SelectProps {
    options: Option[]
    modelValue: string
    placeholder?: string
    clearable?: boolean
}

const props = withDefaults(defineProps<SelectProps>(), {
    placeholder: 'Выберите опцию',
    clearable: true,
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const updateValue = (event: Event) => {
    const target = event.target as HTMLSelectElement
    emit('update:modelValue', target.value)
}

const clearValue = () => {
    emit('update:modelValue', '')
}
</script>

<template>
    <div class="select-wrapper">
        <select
            class="custom-select"
            :value="modelValue"
            @change="updateValue"
            :class="{ placeholder: !modelValue }"
        >
            <!-- Скрытый placeholder option -->
            <option value="" hidden>{{ placeholder }}</option>

            <!-- Основные опции -->
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>

        <!-- Кнопка очистки -->
        <button
            v-if="clearable && modelValue"
            class="clear-button"
            @click="clearValue"
            type="button"
            aria-label="Очистить выбор"
        >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                    d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </button>

        <!-- Стрелка -->
        <div class="select-arrow">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
    </div>
</template>

<style scoped>
.select-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 220px;
}

.custom-select {
    width: 100%;
    padding: 15px 16px;
    padding-right: 40px;
    font-size: 16px;
    border: 1.5px solid var(--color-purple);
    background-color: var(--color-white);
    cursor: pointer;
    appearance: none;
    border-radius: 15px;
}

.custom-select.placeholder {
    color: var(--color-text-secondary);
}

.select-arrow {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    pointer-events: none;
    color: #6b7280;
    transition: transform 0.2s ease;
}

.select-wrapper:hover .select-arrow {
    color: #4b5563;
}

.custom-select:focus + .select-arrow {
    color: #3b82f6;
    transform: translateY(-50%) rotate(180deg);
}

.clear-button {
    position: absolute;
    top: 50%;
    right: 36px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    border-radius: 4px;
    color: #6b7280;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s ease;
    padding: 0;
    z-index: 2;
}

.clear-button:hover {
    color: #ef4444;
    opacity: 1;
    background-color: #fef2f2;
}

@media (max-width: 550px) {
    .select-wrapper {
        min-width: 200px;
    }
}

@media (max-width: 425px) {
    .custom-select {
        font-size: 14px;
    }
}
</style>
