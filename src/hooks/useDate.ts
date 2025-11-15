import { ref, onMounted, onUnmounted } from 'vue'

export const useDate = () => {
    const hoursAndMinutes = ref('')
    const day = ref(0)
    const currentMonth = ref('')

    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ]

    // Форматирование времени с ведущими нулями
    const formatTime = (value: number): string => {
        return value.toString().padStart(2, '0')
    }

    const updateTime = () => {
        const date = new Date()
        hoursAndMinutes.value = `${formatTime(date.getHours())}:${formatTime(
            date.getMinutes()
        )}`
        day.value = date.getDate()
        currentMonth.value = months[date.getMonth()]
    }

    const startTimer = () => {
        updateTime() // Обновляем сразу

        // Вычисляем сколько миллисекунд осталось до следующей минуты
        const now = new Date()
        const secondsUntilNextMinute = 60 - now.getSeconds()
        const millisecondsUntilNextMinute =
            secondsUntilNextMinute * 1000 - now.getMilliseconds()

        // Устанавливаем таймер на начало следующей минуты
        setTimeout(() => {
            updateTime() // Обновляем в начале минуты
            // Затем устанавливаем интервал на каждую минуту
            intervalId = window.setInterval(updateTime, 60000)
        }, millisecondsUntilNextMinute)
    }

    let intervalId: number | null = null
    let timeoutId: number | null = null

    onMounted(() => {
        startTimer()
    })

    onUnmounted(() => {
        if (intervalId) {
            clearInterval(intervalId)
        }
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
    })

    return {
        hoursAndMinutes,
        day,
        currentMonth,
    }
}
