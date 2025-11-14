import { ref } from 'vue'

// потом переписать на pinia

const searchValue = ref<string>('')
const statusValue = ref<string>('')
const tagValue = ref<string>('')

export const useSearch = () => {
    return { searchValue, statusValue, tagValue }
}
