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
    <ul class="tags__list" v-auto-animate>
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
    margin-bottom: 20px;
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
    background-color: rgba(18, 146, 210, 0.432);
}

.status {
    background-color: rgba(85, 210, 18, 0.445);
}

.tag {
    background-color: hsla(48, 100%, 50%, 0.445);
}

@media (max-width: 425px) {
    .list__item button {
        display: none;
    }
}
</style>
