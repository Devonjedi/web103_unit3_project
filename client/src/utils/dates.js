export const formatTime = (timeString) => {
    if (!timeString) return ''
    const [hours, minutes] = timeString.split(':')
    const h = parseInt(hours)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const displayHour = h % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
}

export const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString.split('T')[0] + 'T00:00:00')
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export const getTimeRemaining = (dateString, timeString) => {
    if (!dateString || !timeString) return { text: '', isPast: false }
    const datePart = dateString.split('T')[0]
    const eventDateTime = new Date(`${datePart}T${timeString}`)
    const now = new Date()
    const diff = eventDateTime - now

    if (diff < 0) {
        const absDiff = Math.abs(diff)
        const days = Math.floor(absDiff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        if (days > 0) return { text: `${days}d ${hours}h ago`, isPast: true }
        return { text: `${hours}h ago`, isPast: true }
    } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        if (days > 0) return { text: `${days}d ${hours}h remaining`, isPast: false }
        return { text: `${hours}h remaining`, isPast: false }
    }
}
