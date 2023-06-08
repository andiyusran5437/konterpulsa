export const toDigit = (from?: string): number => {
    if (from !== undefined) {
        from = from.replace(/\D/g, '')
        return parseInt(from)
    }
    return 0
}
