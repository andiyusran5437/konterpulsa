export const getServerTime = async (): Promise<number> => {
    const baseURL = import.meta.env.VITE_API_URL
    const serverTimeURL = `${baseURL}/server-time`

    try {
        const response = await fetch(serverTimeURL)
        const time = await response.json()
        return time
    } catch (err) {
        return await Promise.reject(err)
    }
}
