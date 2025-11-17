import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
    // State
    const searchValue = ref('')
    const statusValue = ref('')
    const tagValue = ref('')

    // Actions
    const setSearchValue = (value: string) => {
        searchValue.value = value
    }

    const setStatusValue = (value: string) => {
        statusValue.value = value
    }

    const setTagValue = (value: string) => {
        tagValue.value = value
    }

    const clearFilters = () => {
        searchValue.value = ''
        statusValue.value = ''
        tagValue.value = ''
    }

    const clearSearch = () => {
        searchValue.value = ''
    }

    const clearStatus = () => {
        statusValue.value = ''
    }

    const clearTags = () => {
        tagValue.value = ''
    }

    return {
        // State
        searchValue,
        statusValue,
        tagValue,

        // Actions
        setSearchValue,
        setStatusValue,
        setTagValue,
        clearFilters,
        clearSearch,
        clearStatus,
        clearTags,
    }
})
