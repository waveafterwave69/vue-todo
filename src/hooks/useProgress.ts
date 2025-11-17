import { useItemsStore } from '@/store/items'
import { computed } from 'vue'

export const useProgress = () => {
    const itemsStore = useItemsStore()

    const completedTasks = computed(() => {
        return itemsStore.stats.completed
    })

    const totalTasks = computed(() => {
        return itemsStore.stats.total
    })

    const progress = computed(() => {
        return itemsStore.stats.completionRate
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
