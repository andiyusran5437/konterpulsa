export const toDate = (epoch: number): string => {
    const date = new Date(epoch * 1000)
    const formatted = date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    })

    return formatted
}
