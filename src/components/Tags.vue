<script setup lang="ts">
import { useSearch } from '@/hooks/useSearch'

const { searchValue, statusValue, tagValue } = useSearch()
</script>

<template>
    <ul class="tags__list">
        <li class="list__item search" v-if="searchValue">{{ searchValue }}</li>
        <li class="list__item status" v-if="statusValue">{{ statusValue }}</li>
        <li class="list__item tag" v-if="tagValue">{{ tagValue }}</li>
    </ul>
</template>

<style scoped>
.tags__list {
    margin-top: 15px;
    display: flex;
    column-gap: 8px;
    flex-wrap: wrap;
    font-size: 14px;
    row-gap: 8px;
}

.list__item {
    padding: 5px 20px;
    border-radius: 15px;
}

.search {
    background-color: rgba(18, 146, 210, 0.432);
}

.status {
    background-color: rgba(85, 210, 18, 0.445);
}

.tag {
    background-color: hsla(48, 100%, 50%, 0.445);
}
</style>
