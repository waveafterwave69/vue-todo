import { ref } from 'vue'

// потом переписать на pinia

const searchValue = ref<string>('')
const statusValue = ref<string>('')
const tagValue = ref<string>('')

const deleteSearchValue = () => {
    searchValue.value = ''
}

const deleteStatsValue = () => {
    statusValue.value = ''
}

const deleteTagValue = () => {
    tagValue.value = ''
}

export const useSearch = () => {
    return {
        searchValue,
        statusValue,
        tagValue,
        deleteSearchValue,
        deleteStatsValue,
        deleteTagValue,
    }
}
