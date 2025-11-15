<script setup lang="ts">
import { useSearch } from '@/hooks/useSearch'
const {
    searchValue,
    statusValue,
    tagValue,
    deleteSearchValue,
    deleteStatsValue,
    deleteTagValue,
} = useSearch()
</script>

<template>
    <ul
        class="tags__list"
        v-auto-animate
        v-if="searchValue || statusValue || tagValue"
    >
        <li class="list__item search" v-if="searchValue">
            {{ searchValue }}
            <button @click="deleteSearchValue">
                <img src="../assets/close.png" alt="убрать тег" />
            </button>
        </li>
        <li class="list__item status" v-if="statusValue">
            {{ statusValue }}
            <button @click="deleteStatsValue">
                <img src="../assets/close.png" alt="убрать тег" />
            </button>
        </li>
        <li class="list__item tag" v-if="tagValue">
            {{ tagValue }}
            <button @click="deleteTagValue">
                <img src="../assets/close.png" alt="убрать тег" />
            </button>
        </li>
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
    display: flex;
    align-items: center;
    padding: 5px 20px;
    border-radius: 15px;
    column-gap: 10px;
}

.list__item button {
    width: 11px;
    height: 11px;
}

.search {
    background: linear-gradient(135deg, #a7cdff, #8092f8);
}

.status {
    background: linear-gradient(135deg, #b9ffa7, #74c774);
}

.tag {
    background: linear-gradient(135deg, #ffeaa7, #fab1a0);
}

@media (max-width: 425px) {
    .list__item button {
        display: none;
    }
}
</style>
