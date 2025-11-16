import { computed } from 'vue'
import { useTable } from './useTable'

export const useProgress = () => {
    const { stats } = useTable()

    const completedTasks = computed(() => {
        const value = stats.value.completed
        return value
    })

    const totalTasks = computed(() => {
        const value = stats.value.total
        return value
    })

    const progress = computed(() => {
        const value = stats.value.completionRate
        return value
    })

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
