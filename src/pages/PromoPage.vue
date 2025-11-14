<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <section class="promo">
        <div class="promo__content">
            <div class="promo__row">
                <h1 class="promo__title">Управление задачами & To-Do List</h1>
                <p class="promo__text">
                    Этот продуктивный инструмент создан, чтобы помочь ты лучше
                    справишься со своей задачей проектно удобно!
                </p>
                <RouterLink to="/home" class="promo__button">
                    <span>Давайте начнем</span>
                    <img src="../assets/arrow-left.svg" alt="arrow-up" />
                </RouterLink>
            </div>
            <img
                src="../assets/main-img.png"
                alt="todo-img"
                class="promo__img"
            />
        </div>
    </section>
</template>

<style scoped>
.promo__content {
    margin-top: 80px;
    display: flex;
    align-items: center;
    column-gap: 100px;
    justify-content: center;
}

.promo__img {
    width: 600px;
}

.promo__title {
    font-weight: 600;
    font-size: 44px;
    max-width: 550px;
    margin-bottom: 35px;
}

.promo__text {
    font-weight: 400;
    font-size: 20px;
    color: var(--color-grey);
    max-width: 550px;
    margin-bottom: 55px;
}

.promo__button {
    width: 260px;
    display: flex;
    align-items: center;
    column-gap: 20px;
    font-weight: 600;
    font-size: 19px;
    text-align: center;
    color: var(--color-white);
    background-color: var(--color-purple);
    padding: 15px 0px;
    justify-content: center;
    border-radius: 10px;
}

.promo__button:hover {
    background-color: #502bbe;
}

.promo__button:active {
    position: relative;
    top: 1px;
}

@media (max-width: 1024px) {
    .promo__content {
        margin-top: 50px;
        column-gap: 30px;
    }

    .promo__img {
        width: 400px;
    }

    .promo__title {
        font-size: 32px;
        max-width: 350px;
        margin-bottom: 25px;
    }

    .promo__text {
        font-size: 18px;
        color: var(--color-grey);
        max-width: 350px;
        margin-bottom: 25px;
    }

    .promo__button {
        width: 220px;
        column-gap: 10px;
        font-size: 18px;
        padding: 15px 0px;
    }
}

@media (max-width: 768px) {
    .promo__row {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .promo__content {
        margin-top: 50px;
        column-gap: 30px;
        flex-direction: column;
        row-gap: 20px;
    }

    .promo__img {
        width: 300px;
    }

    .promo__title {
        font-size: 30px;
        max-width: 350px;
        margin-bottom: 25px;
        text-align: center;
    }

    .promo__text {
        font-size: 16px;
        color: var(--color-grey);
        max-width: 350px;
        margin-bottom: 25px;
        text-align: center;
    }

    .promo__button {
        width: 220px;
        column-gap: 10px;
        font-size: 16px;
        padding: 11px 0px;
    }
}

@media (max-width: 425px) {
    .promo__content {
        margin-top: 70px;
        row-gap: 20px;
    }

    .promo__img {
        width: 250px;
    }

    .promo__title {
        font-size: 26px;
        max-width: 300px;
        margin-bottom: 25px;
        text-align: center;
    }

    .promo__text {
        font-size: 16px;
        color: var(--color-grey);
        max-width: 300px;
        margin-bottom: 25px;
        text-align: center;
    }

    .promo__button {
        width: 220px;
        column-gap: 10px;
        font-size: 16px;
        padding: 11px 0px;
    }
}
</style>
