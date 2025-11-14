export const useDate = () => {
    const date = new Date()

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

    const hoursAndMinutes = `${formatTime(date.getHours())}:${formatTime(
        date.getMinutes()
    )}`
    const day = date.getDate()
    const currentMonth = months[date.getMonth()]

    return { hoursAndMinutes, day, currentMonth }
}
