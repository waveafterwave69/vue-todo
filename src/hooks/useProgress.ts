import { computed } from 'vue'
import { useTable } from './useTable'

export const useProgress = () => {
    const { filteredItems } = useTable()

    const completedTasks = computed(
        () =>
            filteredItems.value.filter((item) => item.status === 'выполненные')
                .length
    )

    const totalTasks = computed(() => filteredItems.value.length)

    const progress = computed(() =>
        totalTasks.value > 0
            ? (completedTasks.value / totalTasks.value) * 100
            : 0
    )

    const circumference = 2 * Math.PI * 45
    const strokeDasharray = computed(() => circumference)
    const strokeDashoffset = computed(
        () => circumference - (progress.value / 100) * circumference
    )

    return {
        completedTasks,
        strokeDasharray,
        totalTasks,
        progress,
        circumference,
        strokeDashoffset,
    }
}
