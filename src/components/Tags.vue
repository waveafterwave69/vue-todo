<script setup lang="ts">
import { useSearchStore } from '@/store/search'

const searchStore = useSearchStore()
</script>

<template>
    <ul
        class="tags__list"
        v-auto-animate
        v-if="
            searchStore.searchValue ||
            searchStore.statusValue ||
            searchStore.tagValue
        "
    >
        <li class="list__item search" v-if="searchStore.searchValue">
            {{ searchStore.searchValue }}
            <button @click="searchStore.clearSearch">
                <img src="../assets/close.png" alt="убрать тег" />
            </button>
        </li>
        <li class="list__item status" v-if="searchStore.statusValue">
            {{ searchStore.statusValue }}
            <button @click="searchStore.clearStatus">
                <img src="../assets/close.png" alt="убрать тег" />
            </button>
        </li>
        <li class="list__item tag" v-if="searchStore.tagValue">
            {{ searchStore.tagValue }}
            <button @click="searchStore.clearTags">
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
    color: var(--color-black);
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
