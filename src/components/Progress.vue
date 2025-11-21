<script setup lang="ts">
import { useProgress } from '@/hooks/useProgress'

const {
    completedTasks,
    strokeDasharray,
    totalTasks,
    progress,
    circumference,
    strokeDashoffset,
} = useProgress()
</script>

<template>
    <div class="progress">
        <div class="progress__text">
            <h2 class="progress__title">Прогресс выполнения задач</h2>
            <p class="progress__subtitle">
                Выполнено {{ completedTasks }} из {{ totalTasks }}
            </p>
        </div>
        <div class="progress__diagram">
            <svg
                class="progress-ring"
                width="120"
                height="120"
                viewBox="0 0 120 120"
            >
                <!-- Фоновый круг -->
                <circle
                    class="progress-ring__background"
                    stroke="#c3b1fc"
                    stroke-width="12"
                    fill="transparent"
                    r="45"
                    cx="60"
                    cy="60"
                />
                <!-- Прогресс -->
                <circle
                    class="progress-ring__circle"
                    stroke="#5f33e1"
                    stroke-width="12"
                    stroke-linecap="round"
                    fill="transparent"
                    r="45"
                    cx="60"
                    cy="60"
                    :stroke-dasharray="strokeDasharray"
                    :stroke-dashoffset="strokeDashoffset"
                    transform="rotate(-90 60 60)"
                />
                <!-- Текст в центре -->
                <text
                    x="60"
                    y="60"
                    text-anchor="middle"
                    dy="7"
                    font-size="16"
                    font-weight="bold"
                    fill="#5f33e1"
                >
                    {{ Math.round(progress) }}%
                </text>
            </svg>
        </div>
    </div>
</template>

<style scoped>
.progress {
    margin-top: 15px;
    background-color: var(--color-white);
    border: 1px solid var(--color-purple);
    border-radius: 15px;
    padding: 25px 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-white);
    color: var(--color-purple);

    flex-wrap: wrap;
    row-gap: 20px;
}

.progress__text {
    flex: 1;
    min-width: 300px;
}

.progress__title {
    font-weight: 600;
    font-size: 26px;
    margin-bottom: 12px;
    color: var(--color-purple);
    line-height: 1.2;
}

.progress__subtitle {
    font-weight: 300;
    font-size: 18px;
    opacity: 0.9;
    line-height: 1.4;
    color: var(--color-text-primary);
}

.progress__diagram {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
}

.progress-ring__circle {
    animation: progressAnimation 1.5s ease-in-out;
    transition: stroke-dashoffset 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.progress-ring__background {
    transition: opacity 0.3s ease;
}

@keyframes progressAnimation {
    0% {
        stroke-dashoffset: v-bind('circumference');
        opacity: 0;
    }
    100% {
        stroke-dashoffset: v-bind('strokeDashoffset');
        opacity: 1;
    }
}

/* Адаптивность */
@media (max-width: 1024px) {
    .progress {
        padding: 25px 60px;
    }

    .progress__title {
        font-size: 24px;
    }

    .progress__subtitle {
        font-size: 17px;
    }
}

@media (max-width: 768px) {
    .progress {
        padding: 20px 40px;
        flex-direction: column;
        text-align: center;
        gap: 25px;
    }

    .progress__text {
        min-width: auto;
    }

    .progress__title {
        font-size: 22px;
        margin-bottom: 8px;
    }

    .progress__subtitle {
        font-size: 16px;
    }

    .progress-ring {
        width: 100px;
        height: 100px;
    }
}

@media (max-width: 425px) {
    .progress {
        padding: 15px 20px;
        row-gap: 15px;
    }

    .progress__title {
        font-size: 18px;
    }

    .progress__subtitle {
        font-size: 14px;
    }

    .progress-ring {
        width: 90px;
        height: 90px;
    }
}
</style>
